// kits.md, "Boilerplates": `pnpm check:fresh-copy <svelte|astro>`
//
// Runs `new-project` into a temp folder outside the repo with the registries
// served from a local `pnpm registry:build`, then builds the copy. A
// boilerplate, kit or core release happens only when this passes.
//
// @hmziq/brand-core comes from npm once it is published. Before that (or with
// --core), the check packs core locally (`pnpm pack`) and installs the exact
// tarball publish would upload — the code path is the same, only the source
// of the bytes differs, and it says so below.

import { execSync, spawn, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, cpSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { readJson } from "./registry-lib.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const DEFAULT_PAGES = "https://hmziqrs.github.io/brand";

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i > -1 ? args[i + 1] : undefined;
};
const kind = args.find((a) => !a.startsWith("--"));
if (!["svelte", "astro"].includes(kind)) {
  console.error("Usage: pnpm check:fresh-copy <svelte|astro> [--keep] [--core <spec>]");
  process.exit(1);
}
const keep = args.includes("--keep");

// 1. Build the registries the copy installs from.
console.log("== Building the registries");
run("node", [join(root, "scripts/build-registries.mjs")], root);

// 2. Work out where core comes from.
const coreVersion = readJson(join(root, "packages/brand-core/package.json")).version;
let coreSpec = flag("core");
let coreNote;
let serverArgs = [];
if (coreSpec) {
  coreNote = `forced to ${coreSpec}`;
} else if (coreVersion !== "0.0.0" && isOnNpm(coreVersion)) {
  coreSpec = `^${coreVersion}`;
  coreNote = `npm (@hmziq/brand-core@${coreVersion})`;
} else {
  coreSpec = packCore();
  coreNote =
    coreVersion === "0.0.0"
      ? "0.0.0 is not on npm (never released); installing the local pnpm-pack tarball — the same bytes publish would upload"
      : `${coreVersion} is not on npm yet; installing the local pnpm-pack tarball — the same bytes publish would upload`;
  // The tarball is already in the copy's package.json by the time items
  // install; the items' npm spec would send the CLIs to npm for a version
  // that isn't there.
  serverArgs = ["--without-core"];
}
console.log(`== @hmziq/brand-core: ${coreNote}`);

// 3. Serve the registries from a separate process — new-project's installs
//    run with spawnSync, which would freeze a server in this process.
const { child: serverChild, port } = await spawnServer(serverArgs);
const registry = `http://127.0.0.1:${port}`;
console.log(`== Serving dist/registries at ${registry}`);

// 4. new-project into a temp folder outside the repo, then build it.
const workDir = mkdtempSync(join(tmpdir(), `brand-fresh-${kind}-`));
const dest = join(workDir, "app");
console.log(`== Fresh ${kind} copy at ${dest}`);
try {
  run("node", [join(root, "scripts/new-project.mjs"), kind, dest, "--registry", registry, "--core", coreSpec], root);
  console.log("== Building the copy (pnpm build)");
  run("pnpm", ["build"], dest);
  console.log(`\ncheck:fresh-copy ${kind}: PASS`);
  console.log(`(registry served from the local dist/registries build; core: ${coreNote}; the live registry is ${DEFAULT_PAGES}/r/${kind}/)`);
  if (keep) console.log(`Kept ${dest} (--keep).`);
  else rmSync(workDir, { recursive: true, force: true });
} catch {
  console.error(`\ncheck:fresh-copy ${kind}: FAIL`);
  console.error(`The copy is kept at ${dest} for inspection.`);
  process.exitCode = 1;
} finally {
  serverChild.kill();
}

function run(command, argv, cwd) {
  const result = spawnSync(command, argv, { cwd, stdio: "inherit" });
  if (result.status !== 0) throw new Error(`\`${command} ${argv.join(" ")}\` failed in ${cwd}`);
}

function isOnNpm(version) {
  try {
    execSync(`npm view @hmziq/brand-core@${version} version --json`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function packCore() {
  const outDir = mkdtempSync(join(tmpdir(), "brand-core-pack-"));
  const pkgDir = join(root, "packages/brand-core");
  execSync("pnpm pack", { cwd: pkgDir, stdio: "pipe" });
  const tgz = execSync("ls *.tgz", { cwd: pkgDir, shell: "/bin/sh" }).toString().trim().split("\n").pop();
  cpSync(join(pkgDir, tgz), join(outDir, tgz));
  rmSync(join(pkgDir, tgz), { force: true });
  return `file:${join(outDir, tgz)}`;
}

async function spawnServer(extraArgs) {
  const child = spawn("node", [join(root, "scripts/serve-registries.mjs"), ...extraArgs], {
    cwd: root,
    stdio: ["ignore", "pipe", "inherit"],
  });
  const port = await new Promise((resolvePort, reject) => {
    let buffer = "";
    const timer = setTimeout(() => reject(new Error("the registry server did not start")), 15000);
    child.stdout.on("data", (chunk) => {
      buffer += chunk;
      const match = buffer.match(/LISTENING (\d+)/);
      if (match) {
        clearTimeout(timer);
        resolvePort(Number(match[1]));
      }
    });
    child.on("exit", () => reject(new Error("the registry server exited early")));
  });
  return { child, port };
}
