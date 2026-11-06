// kits.md, "Boilerplates": `bun run check:fresh-copy <svelte|astro>`
//
// Runs `new-project` into a temp folder outside the repo with the registries
// served from a local `bun run registry:build`, then builds the copy. A
// boilerplate, kit or core release happens only when this passes.
//
// @hmziq/brand-core comes from npm once it is published. Before that (or with
// --core), the check packs core locally (`bun pm pack`) and installs the exact
// tarball publish would upload — the code path is the same, only the source
// of the bytes differs, and it says so below.

import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { isCoreOnNpm, packCore, serveRegistries } from "./local-kit.ts";
import { readJson } from "./registry-lib.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const DEFAULT_PAGES = "https://hmziqrs.github.io/brand";

const args = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = args.indexOf(`--${name}`);
  return i > -1 ? args[i + 1] : undefined;
};
const kind = args.find((a) => !a.startsWith("--"));
if (!["svelte", "astro"].includes(kind)) {
  console.error("Usage: bun run check:fresh-copy <svelte|astro> [--keep] [--static] [--core <spec>]");
  process.exit(1);
}
const keep = args.includes("--keep");
const isStatic = args.includes("--static");

// 1. Build the registries the copy installs from.
console.log("== Building the registries");
run("bun", [join(root, "scripts/build-registries.ts")], root);

// 2. Work out where core comes from.
const coreVersion: string = readJson<{ version: string }>(join(root, "packages/brand-core/package.json")).version;
let coreSpec: string | undefined = flag("core");
let coreNote: string;
let serverArgs: string[] = [];
if (coreSpec) {
  coreNote = `forced to ${coreSpec}`;
} else if (isCoreOnNpm(coreVersion)) {
  coreSpec = `^${coreVersion}`;
  coreNote = `npm (@hmziq/brand-core@${coreVersion})`;
} else {
  coreSpec = packCore();
  coreNote =
    coreVersion === "0.0.0"
      ? "0.0.0 is not on npm (never released); installing the local bun pm pack tarball — the same bytes publish would upload"
      : `${coreVersion} is not on npm yet; installing the local bun pm pack tarball — the same bytes publish would upload`;
  // The tarball is already in the copy's package.json by the time items
  // install; the items' npm spec would send the CLIs to npm for a version
  // that isn't there.
  serverArgs = ["--without-core"];
}
console.log(`== @hmziq/brand-core: ${coreNote}`);

// 3. Serve the registries from a separate process — new-project's installs
//    run with spawnSync, which would freeze a server in this process.
const server = await serveRegistries(serverArgs);
const registry = server.url;
console.log(`== Serving dist/registries at ${registry}`);

// 4. new-project into a temp folder outside the repo, then build it.
const workDir = mkdtempSync(join(tmpdir(), `brand-fresh-${kind}-`));
const dest = join(workDir, "app");
console.log(`== Fresh ${kind} copy at ${dest}`);
try {
  run("bun", [join(root, "scripts/new-project.ts"), kind, dest, "--registry", registry, "--core", coreSpec, "--keep-failed", ...(isStatic ? ["--static"] : [])], root);
  console.log("== Building the copy (bun run build)");
  run("bun", ["run", "build"], dest);
  if (kind === "astro") {
    console.log("== Type-checking the copy (bun run typecheck)");
    run("bun", ["run", "typecheck"], dest);
  } else {
    console.log("== Type-checking the copy (bun run check)");
    run("bun", ["run", "check"], dest);
  }
  if (isStatic && !existsSync(join(dest, kind === "astro" ? "dist/index.html" : "build/index.html"))) throw new Error("the static build wrote no index.html");
  console.log(`\ncheck:fresh-copy ${kind}: PASS`);
  console.log(`(registry served from the local dist/registries build; core: ${coreNote}; the live registry is ${DEFAULT_PAGES}/r/${kind}/)`);
  if (keep) console.log(`Kept ${dest} (--keep).`);
  else rmSync(workDir, { recursive: true, force: true });
} catch {
  console.error(`\ncheck:fresh-copy ${kind}: FAIL`);
  console.error(`The copy is kept at ${dest} for inspection.`);
  process.exitCode = 1;
} finally {
  server.kill();
}

function run(command: string, argv: string[], cwd: string): void {
  const result = spawnSync(command, argv, { cwd, stdio: "inherit" });
  if (result.status !== 0) throw new Error(`\`${command} ${argv.join(" ")}\` failed in ${cwd}`);
}
