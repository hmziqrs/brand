// kits.md, "Boilerplates": `bun run new-project <svelte|astro> <folder>`
//
// 1. Copies the boilerplate (boilerplates/svelte-app or boilerplates/astro-app).
// 2. Replaces `workspace:*` with the published @hmziq/brand-core version
//    (--core overrides, e.g. a local `bun pm pack` tarball before a release).
// 3. Installs the kit from its registry into the kit folder — src/lib/brand for
//    SvelteKit, src/components/brand for Astro — and points $brand there.
// 4. Runs bun install.
//
// No import in the boilerplate changes: only the $brand alias wiring, the
// core version, and each stylesheet's in-repo @source line for the kit. The
// svelte one is rewritten to the folder the kit installs into (src/lib/brand);
// the Astro one is dropped (the kit sits inside src/ in a copy, which
// Tailwind scans anyway).
//
// The registry defaults to the Pages site; --registry overrides it, which is
// how `bun run check:fresh-copy` installs from a locally served build.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";
import { readJson } from "./registry-lib.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const DEFAULT_REGISTRY = "https://hmziqrs.github.io/brand";

type PkgJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  trustedDependencies?: string[];
  version: string;
};

const args: string[] = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = args.indexOf(`--${name}`);
  return i > -1 ? args[i + 1] : undefined;
};
const kind = args.find((a) => !a.startsWith("--"));
const folder = args.filter((a) => !a.startsWith("--"))[1];

if (!["svelte", "astro"].includes(kind) || !folder) {
  console.error("Usage: bun run new-project <svelte|astro> <folder> [--registry <base-url>] [--core <version-or-tarball>] [--no-install]");
  process.exit(1);
}

const registry = (flag("registry") ?? DEFAULT_REGISTRY).replace(/\/+$/, "");
const coreSpec = flag("core") ?? `^${readJson<PkgJson>(`${root}/packages/brand-core/package.json`).version}`;
const install = !args.includes("--no-install");
const dest = resolve(process.cwd(), folder);

if (existsSync(dest) && readdirSync(dest).length > 0) {
  console.error(`${dest} exists and is not empty.`);
  process.exit(1);
}

const boilerplate = `${root}/boilerplates/${kind}-app`;
const log = (step: string): void => console.log(`\n== ${step}`);

// --- 1. copy the boilerplate ------------------------------------------------
log(`Copying boilerplates/${kind}-app -> ${dest}`);
mkdirSync(dest, { recursive: true });
cpSync(boilerplate, dest, {
  recursive: true,
  filter: (src: string): boolean => !/[\\/](node_modules|dist|\.svelte-kit|\.astro|storybook-static)([\\/]|$)/.test(src),
});

// --- 2. the published core --------------------------------------------------
log("Pointing @hmziq/brand-core at the published package");
const pkgPath = join(dest, "package.json");
const pkg = readJson<PkgJson>(pkgPath);
for (const section of ["dependencies", "devDependencies"] as const) {
  if (pkg[section]?.["@hmziq/brand-core"]) pkg[section]["@hmziq/brand-core"] = coreSpec;
}
// The repo's own build-script approvals: esbuild for Vite's dev server, sharp
// for Astro's image service.
pkg.trustedDependencies = ["esbuild", "sharp"];
writeFileSync(pkgPath, JSON.stringify(pkg, null, "\t") + "\n");
console.log(`   @hmziq/brand-core: ${coreSpec}`);

// --- 3a. $brand points at the installed kit --------------------------------
log("Wiring $brand at the kit folder");
if (kind === "svelte") {
  const viteConfig = join(dest, "vite.config.ts");
  rewrite(viteConfig, [
    [
      /const brand = fileURLToPath\(new URL\('[^']+', import\.meta\.url\)\);/,
      "const brand = fileURLToPath(new URL('./src/lib/brand', import.meta.url));",
    ],
  ]);
  // The stylesheet's kit @source points at the repo's kit folder, which
  // doesn't exist in a copy; the kit installs into src/lib/brand, so the line
  // follows it there (the boilerplate stylesheet's comment says so).
  rewrite(join(dest, "src/app.css"), [
    [/^@source "\.\.\/\.\.\/\.\.\/packages\/brand-svelte\/src";$/m, '@source "./lib/brand";'],
  ]);
  // Core's Markdown plugins are imported from core's source inside this repo
  // (the config runs in Node, before anything is compiled). In a copy core is
  // real JavaScript from npm, so the imports become the package specifiers —
  // the config file's own comment asks for exactly this.
  rewriteAll(dest, [
    [/['"](?:\.\.\/)+packages\/brand-core\/src\/([^'"]+)\.js['"]/g, "'@hmziq/brand-core/$1'"],
  ]);
} else {
  rewrite(join(dest, "astro.config.ts"), [
    [
      /const brand = fileURLToPath\(new URL\("[^"]+", import\.meta\.url\)\);/,
      'const brand = fileURLToPath(new URL("./src/components/brand", import.meta.url));',
    ],
  ]);
  rewrite(join(dest, "tsconfig.json"), [
    [/("\$brand\/\*": \[")[^"]+("\])/, "$1./src/components/brand/*$2"],
  ]);
  // The kit's in-repo @source line is dangling in a copy; the kit sits inside
  // src/ now, which Tailwind scans anyway.
  rewrite(join(dest, "src/styles/app.css"), [[/^@source "\.\.\/\.\.\/\.\.\/\.\.\/packages\/brand-astro\/src";\n/m, ""]]);
}

// --- 3b. components.json, so the CLIs resolve our registry and aliases ------
log("Writing components.json");
if (kind === "svelte") {
  writeJsonFile(join(dest, "components.json"), {
    $schema: "https://shadcn-svelte.com/schema.json",
    tailwind: { css: "src/app.css", baseColor: "neutral" },
    aliases: {
      components: "$brand/components",
      utils: "$brand/utils",
      ui: "$brand/ui",
      hooks: "$brand/hooks",
      lib: "$brand",
    },
    typescript: true,
    registry: `${registry}/r/svelte`,
    style: "vega",
    iconLibrary: "lucide",
  });
} else {
  writeJsonFile(join(dest, "components.json"), {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    rsc: false,
    tailwind: { config: "", css: "src/styles/app.css", baseColor: "neutral", cssVariables: true },
    aliases: {
      components: "src/components",
      utils: "src/lib/utils",
      ui: "src/components/ui",
      lib: "src/lib",
      hooks: "src/hooks",
    },
    iconLibrary: "lucide",
    registries: { "@hmziq": `${registry}/r/astro/{name}.json` },
  });
}

// --- 3c. install + 4. bun install ------------------------------------------
if (install) {
  log("bun install");
  run("bun", ["install"], dest);

  log(`Installing the kit from ${registry}/r/${kind}`);
  if (kind === "svelte") {
    run("bunx", ["shadcn-svelte", "add", `${registry}/r/svelte/kit.json`, "--yes", "--overwrite"], dest);
  } else {
    run("bunx", ["shadcn@latest", "add", `${registry}/r/astro/kit.json`, "--yes", "--overwrite"], dest);
  }
}

log("Done");
console.log(`  ${dest}`);
console.log("  cd into it, then `bun run dev`.");

// ---------------------------------------------------------------------------

function rewrite(path: string, replacements: [RegExp, string][]): void {
  let source = readFileSync(path, "utf8");
  for (const [pattern, replacement] of replacements) {
    if (!pattern.test(source)) {
      console.warn(`! ${path}: expected pattern ${pattern} not found; step skipped`);
      continue;
    }
    source = source.replace(pattern, replacement);
  }
  writeFileSync(path, source);
}

/** rewrite() over every text file of the copy (configs and src/, never deps). */
function rewriteAll(dir: string, replacements: [RegExp, string][]): void {
  const textExtensions: RegExp = /\.(ts|mjs|js|json|svelte|css|astro|html)$/;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) rewriteAll(path, replacements);
    else if (textExtensions.test(name)) rewrite(path, replacements);
  }
}

function writeJsonFile(path: string, value: unknown): void {
  writeFileSync(path, JSON.stringify(value, null, "\t") + "\n");
}

function run(command: string, argv: string[], cwd: string): void {
  const result = spawnSync(command, argv, { cwd, stdio: "inherit" });
  if (result.status !== 0) {
    console.error(`\`${command} ${argv.join(" ")}\` failed in ${cwd}`);
    process.exit(result.status ?? 1);
  }
}
