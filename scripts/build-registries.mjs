// kits.md step 3.2/3.3/3.6: builds everything the Pages deploy serves from
// the two authoring registries.
//
//   pnpm registry:build [--out dist/registries]
//
//   dist/registries/r/svelte/…     the Svelte registry (the shadcn-svelte
//                                  CLI's `registry build` output, plus its
//                                  style index at styles/vega/index.json)
//   dist/registries/r/astro/…      the Astro registry: one JSON per item,
//                                  content inlined, plain file items — the
//                                  install method step 2's test picked
//   dist/registries/theme.css      core's theme, for projects that don't use
//                                  npm (kits.md, "Distribution")
//
// `new-project` and `check:fresh-copy` serve this folder over localhost; the
// Pages workflow copies it into the site artifact. The GitHub workflow only
// ships the registries once @hmziq/brand-core has a real version (0.0.0
// means "never released", and item dependencies would point nowhere).

import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { readJson, writeJson } from "./registry-lib.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const outArg = process.argv.indexOf("--out");
const out = outArg > -1 ? resolveArg(outArg) : join(root, "dist/registries");

function resolveArg(index) {
  const value = process.argv[index + 1];
  return value?.startsWith("/") ? value : join(root, value);
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// --- /r/svelte -------------------------------------------------------------
const svelteOut = join(out, "r/svelte");
const cli = spawnSync(
  "pnpm",
  ["--filter", "@hmziq/brand-svelte", "exec", "shadcn-svelte", "registry", "build", "-o", svelteOut],
  { cwd: root, stdio: "inherit" },
);
if (cli.status !== 0) {
  console.error("shadcn-svelte registry build failed");
  process.exit(cli.status ?? 1);
}
// The CLI fetches `<registry>/styles/<style>/index.json` before every add, so
// the registry serves its own index under the style path too (the kit's
// components.json says style "vega").
mkdirSync(join(svelteOut, "styles/vega"), { recursive: true });
cpSync(join(svelteOut, "index.json"), join(svelteOut, "styles/vega/index.json"));

// The builder also injects `devDependencies` for stock components it
// recognizes (storybook, @internationalized/date, …) after the kit's own
// list. Sites installing from this registry need what the kit's files
// import — `dependencies`, which already carry those — and never the
// authoring tools, so the injected block is dropped.
for (const name of readdirSync(svelteOut).filter((f) => f.endsWith(".json") && f !== "index.json")) {
  const item = readJson(join(svelteOut, name));
  if (item.devDependencies) {
    delete item.devDependencies;
    writeJson(join(svelteOut, name), item);
  }
}

// --- /r/astro --------------------------------------------------------------
const astroOut = join(out, "r/astro");
mkdirSync(astroOut, { recursive: true });
const astroKit = join(root, "packages/brand-astro");
const astroRegistry = readJson(join(astroKit, "registry.json"));
for (const item of astroRegistry.items) {
  // `path` stays on every file: the shadcn CLI's served-item schema requires
  // it, even though only `target` and `content` matter over HTTP.
  const files = item.files.map((file) => ({ ...file, content: readFileSync(join(astroKit, file.path), "utf8") }));
  writeJson(join(astroOut, `${item.name}.json`), { ...item, files });
}
writeJson(
  join(astroOut, "index.json"),
  astroRegistry.items.map((item) => ({
    name: item.name,
    title: item.title,
    type: item.type,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    relativeUrl: `${item.name}.json`,
  })),
);

// --- /theme.css ------------------------------------------------------------
cpSync(join(root, "packages/brand-core/theme.css"), join(out, "theme.css"));

const coreVersion = readJson(join(root, "packages/brand-core/package.json")).version;
console.log(`Registries built into ${out} (${astroRegistry.items.length} Astro items).`);
if (coreVersion === "0.0.0") {
  console.log(
    "Note: @hmziq/brand-core is still 0.0.0 (unreleased), so the registries' core dependency points nowhere yet. Bump and publish core, re-run `pnpm registry:generate && pnpm registry:build`, then deploy.",
  );
}
