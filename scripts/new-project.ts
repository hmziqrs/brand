// kits.md, "Boilerplates":
//
//   bun run new-project <svelte|astro> <folder> [--name "My site"] [--symbol Ms] [--static] [--local]
//
// --name     The project's name, for its package, icons and pages. The folder's name by default.
// --symbol   The two letters on its icons. The name's first two by default.
// --static   Plain files and no server: drops the demo app, the live pages and the /kit gallery.
// --local    Installs from this checkout: core packed into vendor/, the registries served locally.
//            The only way in until core is released.
// --registry Where the kit installs from. The Pages site by default.
// --core     A version or `file:` tarball for @hmziq/brand-core. A tarball is copied into vendor/.
// --no-install    Stops before installing.
// --keep-failed   Keeps the folder when a step fails.
//
// Nothing is written until the kit's sources are known to be there, and a
// failed run removes what it wrote.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { basename, isAbsolute, join, relative, resolve } from "node:path";
import { parseArgs } from "node:util";
import { buildRegistries, isCoreOnNpm, packCore, serveRegistries, type RegistryServer } from "./local-kit.ts";
import { readJson } from "./registry-lib.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const DEFAULT_REGISTRY = "https://hmziqrs.github.io/brand";
const USAGE = 'Usage: bun run new-project <svelte|astro> <folder> [--name "My site"] [--symbol Ms] [--static] [--local] [--registry <base-url>] [--core <version-or-tarball>] [--no-install] [--keep-failed]';

type PkgJson = {
  name: string;
  description?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  trustedDependencies?: string[];
  version: string;
};

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

const { values: flags, positionals } = (() => {
  try {
    return parseArgs({
      allowPositionals: true,
      options: {
        name: { type: "string" },
        symbol: { type: "string" },
        static: { type: "boolean", default: false },
        local: { type: "boolean", default: false },
        registry: { type: "string" },
        core: { type: "string" },
        "no-install": { type: "boolean", default: false },
        "keep-failed": { type: "boolean", default: false },
      },
    });
  } catch (error) {
    return fail(`${(error as Error).message}\n${USAGE}`);
  }
})();

const [kind, folder] = positionals;
if ((kind !== "svelte" && kind !== "astro") || !folder) fail(USAGE);
if (flags.local && flags.registry) fail("--local serves its own registry, so it can't take --registry.");

const dest = resolve(process.cwd(), folder);
const fromRoot = relative(root, dest);
if (!fromRoot.startsWith("..") && !isAbsolute(fromRoot)) {
  fail(`${dest} is inside the brand repo, whose workspaces would claim it. Pick a folder outside it, like ../my-site.`);
}
if (existsSync(dest) && readdirSync(dest).length > 0) fail(`${dest} exists and is not empty.`);

const name = flags.name ?? basename(dest);
const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
if (!slug) fail(`Can't make a package name from "${name}". Pass --name.`);
const letters = name.replace(/[^\p{L}\p{N}]/gu, "");
const symbol = flags.symbol ?? `${letters.charAt(0).toUpperCase()}${letters.charAt(1).toLowerCase()}`;
if ([...symbol].length !== 2) fail(`--symbol takes two letters; "${name}" gives "${symbol}".`);

const install = !flags["no-install"];
const coreVersion = readJson<PkgJson>(join(root, "packages/brand-core/package.json")).version;
const boilerplate = join(root, "boilerplates", `${kind}-app`);
const assetsFolder = join(dest, kind === "astro" ? "public" : "static");
const log = (step: string): void => console.log(`\n== ${step}`);

if (install && !flags.local) await checkSources();

let server: RegistryServer | undefined;
let finished = false;
const created = !existsSync(dest);
try {
  let coreSpec = flags.core ?? `^${coreVersion}`;
  let registry = (flags.registry ?? DEFAULT_REGISTRY).replace(/\/+$/, "");
  const serverArgs: string[] = [];

  if (flags.local) {
    log("Packing core and building the registries from this checkout");
    coreSpec = flags.core ?? packCore();
    buildRegistries();
    serverArgs.push("--without-core");
    server = await serveRegistries(serverArgs);
    registry = server.url;
  }

  log(`Copying boilerplates/${kind}-app -> ${dest}`);
  mkdirSync(dest, { recursive: true });
  cpSync(boilerplate, dest, {
    recursive: true,
    filter: (src) => !/^(node_modules|dist|build|\.svelte-kit|\.astro|storybook-static|tsconfig\.tsbuildinfo)([\\/]|$)/.test(relative(boilerplate, src)),
  });

  log(`Naming it ${name}`);
  const pkgPath = join(dest, "package.json");
  const pkg = readJson<PkgJson>(pkgPath);
  pkg.name = slug;
  delete pkg.description;
  const core = vendorCore(coreSpec);
  for (const section of [pkg.dependencies, pkg.devDependencies]) {
    if (section?.["@hmziq/brand-core"]) section["@hmziq/brand-core"] = core;
  }
  console.log(`   @hmziq/brand-core: ${core}`);
  pkg.trustedDependencies = ["esbuild", "sharp"];
  writeJson(pkgPath, pkg);
  writeReadme();
  rewriteAll(join(dest, "src"), [
    [new RegExp(`\\b${kind}-app\\b`, "g"), name],
    [/\bsite: (["'])(?:freeoxide|blog|hmziq)\1/g, `site: $1${name}$1`],
    [/\bsite=(["'])(?:freeoxide|blog|hmziq)\1/g, `site=$1${name}$1`],
  ]);
  renderIcons();

  log("Wiring $brand at the kit folder");
  wireKit();
  if (flags.static) makeStatic(pkgPath);
  writeComponents(registry);

  if (install) {
    log("bun install");
    run("bun", ["install"], dest);
    if (flags.static && kind === "svelte") run("bun", ["add", "-d", "@sveltejs/adapter-static"], dest);

    log(`Installing the kit from ${registry}/r/${kind}`);
    const kit = `${registry}/r/${kind}/kit.json`;
    if (kind === "svelte") run("bunx", ["shadcn-svelte", "add", kit, "--yes", "--overwrite"], dest);
    else {
      run("bunx", ["shadcn@latest", "add", kit, "--yes", "--overwrite"], dest);
      rewriteAll(join(dest, "src/components/brand"), [[/(["'])src\/components\/brand\//g, "$1$$brand/"]]);
    }
  }

  if (server || /^https?:\/\/(127\.0\.0\.1|localhost)\b/.test(registry)) writeComponents(DEFAULT_REGISTRY);

  finished = true;
  log("Done");
  console.log(`  ${dest}`);
  console.log("  cd into it, then `bun run dev`.");
  const placeholder = kind === "astro" ? "public/og.png" : "static/og.png";
  console.log(`  Still placeholders: the words in src/lib/example.ts and the social card ${placeholder}.`);
} catch (error) {
  console.error(`\nnew-project failed: ${(error as Error).message}`);
  process.exitCode = 1;
} finally {
  server?.kill();
  if (!finished && created && existsSync(dest)) {
    if (flags["keep-failed"]) console.error(`Kept ${dest} for inspection.`);
    else {
      rmSync(dest, { recursive: true, force: true });
      console.error(`Removed ${dest}.`);
    }
  }
}

async function checkSources(): Promise<void> {
  const problems: string[] = [];
  if (!flags.core && !isCoreOnNpm(coreVersion)) problems.push(`@hmziq/brand-core ${coreVersion} is not on npm.`);
  const kit = `${(flags.registry ?? DEFAULT_REGISTRY).replace(/\/+$/, "")}/r/${kind}/kit.json`;
  const status = await fetch(kit, { method: "HEAD" }).then((r) => String(r.status), (e: Error) => e.message);
  if (status !== "200") problems.push(`${kit} answered ${status}.`);
  if (problems.length === 0) return;
  fail(
    [
      "The kit isn't published yet, so there is nothing to install from:",
      ...problems.map((p) => `  ${p}`),
      "Nothing was written. To start a project from this checkout instead:",
      `  bun run new-project ${kind} ${folder} --local`,
    ].join("\n"),
  );
}

/** A tarball moves into the project, so the project keeps working after the temp folder is gone. */
function vendorCore(spec: string): string {
  if (!spec.startsWith("file:")) return spec;
  const tarball = spec.slice("file:".length);
  mkdirSync(join(dest, "vendor"), { recursive: true });
  cpSync(tarball, join(dest, "vendor", basename(tarball)));
  return `file:./vendor/${basename(tarball)}`;
}

function renderIcons(): void {
  const result = spawnSync("bun", [join(root, "scripts/render-assets.ts"), "--name", name, "--symbol", symbol, "--out", assetsFolder], { cwd: root, stdio: "pipe" });
  if (result.status === 0) console.log(`   icons: ${name} (${symbol})`);
  else console.warn(`   ! icons stay on the placeholder: ${result.stderr.toString().trim()}`);
}

function wireKit(): void {
  if (kind === "svelte") {
    rewrite(join(dest, "vite.config.ts"), [
      [/const brand = fileURLToPath\(new URL\('[^']+', import\.meta\.url\)\);/, "const brand = fileURLToPath(new URL('./src/lib/brand', import.meta.url));"],
      [/['"](?:\.\.\/)+packages\/brand-core\/src\/([^'"]+)\.js['"]/g, "'@hmziq/brand-core/$1'"],
    ]);
    rewrite(join(dest, "src/app.css"), [[/^@source "\.\.\/\.\.\/\.\.\/packages\/brand-svelte\/src";$/m, '@source "./lib/brand";']]);
    return;
  }
  rewrite(join(dest, "astro.config.ts"), [[/const brand = fileURLToPath\(new URL\("[^"]+", import\.meta\.url\)\);/, 'const brand = fileURLToPath(new URL("./src/components/brand", import.meta.url));']]);
  rewrite(join(dest, "tsconfig.json"), [[/("\$brand\/\*": \[")[^"]+("\])/, "$1./src/components/brand/*$2"]]);
  rewrite(join(dest, "src/styles/app.css"), [[/^@source "\.\.\/\.\.\/\.\.\/\.\.\/packages\/brand-astro\/src";\n/m, ""]]);
}

function makeStatic(pkgPath: string): void {
  log("Making it static");
  const pkg = readJson<PkgJson>(pkgPath);
  const remove = (...paths: string[]): void => {
    for (const path of paths) rmSync(join(dest, path), { recursive: true, force: true });
  };
  if (kind === "astro") {
    delete pkg.dependencies?.["@astrojs/node"];
    rewrite(join(dest, "astro.config.ts"), [
      [/^import node from "@astrojs\/node";\n/m, ""],
      [/(?:^\s*\/\/.*\n)*^\s*adapter: node\(.*\),\n\s*output: "server",\n/m, '  output: "static",\n'],
    ]);
    remove("src/pages/app", "src/pages/kit", "src/pages/live", "src/actions", "src/components/app", "src/components/kit", "src/lib/app");
  } else {
    delete pkg.dependencies?.["@sveltejs/adapter-bun"];
    delete pkg.devDependencies?.["@sveltejs/adapter-bun"];
    rewrite(join(dest, "vite.config.ts"), [
      [/from '@sveltejs\/adapter-bun';/, "from '@sveltejs/adapter-static';"],
      [/adapter: adapter\(\)/, "adapter: adapter(),\n\t\t\tprerender: { handleMissingId: 'ignore' }"],
    ]);
    remove("src/routes/app", "src/routes/live", "src/hooks.server.ts");
    writeFileSync(join(dest, "src/routes/+layout.ts"), "export const prerender = true;\n");
  }
  writeJson(pkgPath, pkg);
}

function writeComponents(registry: string): void {
  if (kind === "svelte") {
    writeJson(join(dest, "components.json"), {
      $schema: "https://shadcn-svelte.com/schema.json",
      tailwind: { css: "src/app.css", baseColor: "neutral" },
      aliases: { components: "$brand/components", utils: "$brand/utils", ui: "$brand/ui", hooks: "$brand/hooks", lib: "$brand" },
      typescript: true,
      registry: `${registry}/r/svelte`,
      style: "vega",
      iconLibrary: "lucide",
    });
    return;
  }
  writeJson(join(dest, "components.json"), {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    rsc: false,
    tailwind: { config: "", css: "src/styles/app.css", baseColor: "neutral", cssVariables: true },
    aliases: { components: "src/components", utils: "src/lib/utils", ui: "src/components/ui", lib: "src/lib", hooks: "src/hooks" },
    iconLibrary: "lucide",
    registries: { "@hmziq": `${registry}/r/astro/{name}.json` },
  });
}

function writeReadme(): void {
  const built = flags.static ? (kind === "astro" ? "dist/" : "build/") : "";
  writeFileSync(
    join(dest, "README.md"),
    [
      `# ${name}`,
      "",
      `Started from the hmziq ${kind === "astro" ? "Astro" : "SvelteKit"} boilerplate. The kit lives in \`${kind === "astro" ? "src/components/brand" : "src/lib/brand"}\`.`,
      "",
      "```sh",
      "bun install",
      "bun run dev",
      "bun run build",
      "```",
      "",
      ...(built ? [`The build is plain files in \`${built}\`. Any static host can serve them.`, ""] : []),
      "Replace the example words in `src/lib/example.ts` and the social card `og.png`.",
      "",
    ].join("\n"),
  );
}

function rewrite(path: string, replacements: [RegExp, string][]): void {
  let source = readFileSync(path, "utf8");
  for (const [pattern, replacement] of replacements) {
    pattern.lastIndex = 0;
    if (!pattern.test(source)) throw new Error(`${path}: expected ${pattern} and didn't find it`);
    pattern.lastIndex = 0;
    source = source.replace(pattern, replacement);
  }
  writeFileSync(path, source);
}

/** Like rewrite, across every text file of a folder, where a file may have none of the patterns. */
function rewriteAll(dir: string, replacements: [RegExp, string][]): void {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      rewriteAll(path, replacements);
    } else if (/\.(ts|js|svelte|astro|md)$/.test(entry)) {
      const source = readFileSync(path, "utf8");
      const next = replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), source);
      if (next !== source) writeFileSync(path, next);
    }
  }
}

function writeJson(path: string, value: unknown): void {
  writeFileSync(path, JSON.stringify(value, null, "\t") + "\n");
}

function run(command: string, argv: string[], cwd: string): void {
  const result = spawnSync(command, argv, { cwd, stdio: "inherit" });
  if (result.status !== 0) throw new Error(`\`${command} ${argv.join(" ")}\` exited with ${result.status}`);
}
