// kits.md step 3.2/3.3: writes the two authoring registries from the kits'
// source trees and the pieces roster (scripts/pieces.json).
//
//   bun run registry:generate
//
// - packages/brand-svelte/registry.json — shadcn-svelte's format, built into
//   the Pages deploy at /r/svelte/ by `bun run registry:build` (which runs the
//   shadcn-svelte CLI's `registry build`).
// - packages/brand-astro/registry.json — the shadcn CLI's plain file-item
//   format, the install method step 2's scratch test picked (see the kit's
//   README). `bun run registry:build` inlines it into /r/astro/.
//
// Re-run this whenever pieces.json or a kit's files change, then commit both
// files: `bun run check:parity` checks the roster against them.
//
// Item shapes follow the CLIs' own conventions: every file carries an
// explicit relative target, so nothing depends on the builder's folder
// guessing. In a copied project the kit lands whole under one folder —
// `src/lib/brand/…` for SvelteKit, `src/components/brand/…` for Astro — and
// `$brand` points there (kits.md, porting rule 3).

import { existsSync } from "node:fs";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import { buildItems, kebab, readJson, walkFiles, writeJson, abs, rel, type Seed } from "./registry-lib.ts";

const root = fileURLToPath(new URL("..", import.meta.url));

type Piece = { name: string; group: string; svelteFile?: string; astroFile?: string | null };
type PieceSeed = Seed & { piece: Piece };
type StockSeed = Seed & { dir: string; kind: "stock-svelte" | "stock-astro" };
type Label = { kind?: string; group?: string; dir?: string; folder?: string };
type PkgJson = { version?: string; dependencies?: Record<string, string>; devDependencies?: Record<string, string>; peerDependencies?: Record<string, string> };

const roster: Piece[] = readJson<{ pieces: Piece[] }>(`${root}/scripts/pieces.json`).pieces;
const coreVersion: string = readJson<PkgJson>(`${root}/packages/brand-core/package.json`).version ?? "";
const HOMEPAGE = "https://hmziqrs.github.io/brand/";

const GROUP_LABEL: Record<string, string> = { brand: "Brand piece", site: "Site block", content: "Content piece", app: "App block" };

function versionsFor(pkgPath: string): Record<string, string | undefined> {
  const pkg = readJson<PkgJson>(pkgPath);
  const core = readJson<PkgJson>(`${root}/packages/brand-core/package.json`);
  return { ...pkg.devDependencies, ...pkg.dependencies, core: coreVersion, three: core.peerDependencies?.three };
}

function pieceSeedsFor(kitSrc: string, fileOf: (piece: Piece) => string | undefined, stockDir: string): PieceSeed[] {
  return roster
    .filter((piece) => piece.svelteFile && piece.svelteFile !== "not yet")
    .flatMap((piece): PieceSeed[] => {
      const file = fileOf(piece);
      if (file.startsWith(`${stockDir}/`)) {
        // A roster piece pointing into the stock folder: the stock item owns
        // it, so the piece needs no item of its own.
        return [];
      }
      if (file.endsWith(".stories.svelte") || file.endsWith(".stories.astro")) {
        // A roster piece whose file is a story (the table recipe, a pattern
        // to copy rather than a component): stories are kit-internal
        // previews and never ship in a registry item.
        return [];
      }
      if (!existsSync(abs(kitSrc, file))) {
        console.warn(`! ${piece.name}: ${file} missing in this kit; item skipped`);
        return [];
      }
      return [{ name: kebab(piece.name), files: [abs(kitSrc, file)], piece }];
    });
}

function stockSeedsFor(kitSrc: string, stockDir: string, prefix: string): (Seed & { dir: string })[] {
  const stockRoot = `${kitSrc}/${stockDir}`;
  // Stories are kit-internal previews; they never ship in a registry item.
  const shipped = (files: string[]): string[] => files.filter((file) => !file.endsWith(".stories.svelte"));
  return walkFiles(stockRoot)
    .map((file) => rel(stockRoot, file).split("/")[0])
    .filter((dir, index, all) => all.indexOf(dir) === index)
    .sort()
    .map((dir) => ({ name: `${prefix}${dir}`, dir, files: shipped(walkFiles(`${stockRoot}/${dir}`)) }));
}

// blocks/content/x -> "content-blocks", blocks/app/x -> "app-blocks",
// anything else -> its folder path, kebab'd.
const catchAllName = (kitSrc: string) => (file: string): string => {
  const segments = rel(kitSrc, file).split("/").slice(0, -1);
  return segments.reverse().map(kebab).join("-");
};

// Shared code files that sit *beside* a folder's pieces (types.ts, small
// helpers): one item per blocks/<group>/<folder>, seeded before the pieces
// so no piece's closure swallows them. A shared types.ts owned by one piece
// makes every sibling that imports it depend on that piece — and where that
// piece imports the sibling back, the two items form a cycle the shadcn CLIs
// never climb out of (they fetch registry dependencies recursively, so an
// item cycle is an endless walk that ends in an out-of-memory). Folder-shared
// files in their own item keep the graph one-way: pieces depend on the
// shared item, never on each other through it.
//
// The folder's barrel (index.ts) is deliberately NOT one of them: it
// re-exports the pieces, so an item holding both the barrel and the shared
// files would depend on the pieces while they depend on it — the same cycle
// one step wider. The barrel stays with the folder's catch-all item.
function folderHelperSeedsFor(kitSrc: string, pieceFiles: Set<string>, exclude: (file: string) => unknown): Seed[] {
  const byName = new Map<string, string[]>();
  const folderOf = catchAllName(kitSrc);
  const blocksRoot = `${kitSrc}/blocks`;
  for (const file of walkFiles(blocksRoot)) {
    if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;
    if (basename(file) === "index.ts" || basename(file) === "index.js") continue;
    if (exclude(file)) continue;
    if (pieceFiles.has(rel(kitSrc, file))) continue;
    const name = `${folderOf(file)}-shared`;
    if (!byName.has(name)) byName.set(name, []);
    byName.get(name).push(file);
  }
  return [...byName].map(([name, files]) => ({ name, files }));
}

function describe(kind: string | undefined, info: Label): string {
  switch (kind) {
    case "stock-svelte":
      return `shadcn-svelte's ${info.dir}, vendored with the brand's changes (packages/brand-svelte/README.md).`;
    case "stock-astro":
      return `Starwind UI's ${info.dir}, vendored with the brand's changes (packages/brand-astro/README.md).`;
    case "utils":
      return "The kit's shared utilities: cn() and styleText().";
    case "kit":
      return "The kit barrel and stylesheet. Depends on every other item, so installing it installs the whole kit.";
    case "piece":
      if (info.group === "app") return `${GROUP_LABEL.app} from the hmziq brand kit (BRAND.md section 9).`;
      return `${GROUP_LABEL[info.group] ?? "Piece"} from the hmziq brand kit (BRAND.md section 9).`;
    default:
      return `Files from "${info.folder}" the pieces roster does not list yet; they become their own items when their plan finishes and this script is re-run.`;
  }
}

function labelItems(_items: { name: string }[], pieceSeeds: PieceSeed[], stockSeeds: StockSeed[]): Map<string, Label> {
  const labels = new Map<string, Label>();
  for (const seed of pieceSeeds) labels.set(seed.name, { kind: "piece", group: seed.piece.group });
  for (const seed of stockSeeds) labels.set(seed.name, { kind: seed.kind, dir: seed.dir });
  labels.set("utils", { kind: "utils" });
  labels.set("kit", { kind: "kit" });
  return labels;
}

// ---------------------------------------------------------------------------
// brand-svelte (shadcn-svelte registry format)
// ---------------------------------------------------------------------------
function generateSvelte(): number {
  const kitRoot = `${root}/packages/brand-svelte`;
  const src = `${kitRoot}/src/lib`;
  const stockSeeds: StockSeed[] = stockSeedsFor(src, "ui", "ui-").map((s) => ({ ...s, kind: "stock-svelte" }));
  const pieceSeeds: PieceSeed[] = pieceSeedsFor(src, (piece) => piece.svelteFile, "ui");
  // Stories are kit-internal previews, and so is the copy they render
  // (blocks/**/stories-data.ts): only *.stories.svelte files import it,
  // so it ships in no registry item either.
  const exclude = (file: string): boolean => file.endsWith(".stories.svelte") || basename(file).startsWith("stories-data");
  const helperSeeds = folderHelperSeedsFor(
    src,
    new Set(pieceSeeds.map((seed) => rel(src, seed.files[0]))),
    exclude,
  );

  const items = buildItems({
    srcRoot: src,
    codeExtensions: [".svelte", ".ts", ".js", ".css"],
    exclude,
    versions: versionsFor(`${kitRoot}/package.json`),
    baseSeeds: [{ name: "utils", files: [abs(src, "utils.ts")] }, ...helperSeeds],
    stockSeeds,
    pieceSeeds,
    finalSeeds: [{ name: "kit", files: [abs(src, "index.ts"), abs(src, "styles/kit.css")] }],
    catchAllName: catchAllName(src),
  });

  const labels = labelItems(items, pieceSeeds, stockSeeds);
  // One item type for everything: the files' targets are exact paths relative
  // to the lib alias, and the alias rewrite in file contents is driven by the
  // `aliases` map below, not by item type.
  const registry = {
    $schema: "https://shadcn-svelte.com/schema/registry.json",
    name: "hmziq-brand",
    homepage: HOMEPAGE,
    aliases: { lib: "$brand", ui: "$brand/ui", components: "$brand/components", utils: "$brand/utils", hooks: "$brand/hooks" },
    items: items.map((item) => ({
      name: item.name,
      type: "registry:lib",
      title: item.name,
      description: describe(labels.get(item.name)?.kind, { ...(labels.get(item.name) ?? { folder: item.name }) }),
      dependencies: item.dependencies,
      registryDependencies:
        item.name === "kit"
          ? items.filter((i) => i.name !== "kit").map((i) => `local:${i.name}`)
          : item.registryDependencies.map((d) => `local:${d}`),
      files: item.files.map((file) => ({ path: `src/lib/${file}`, type: "registry:file", target: file })),
    })),
  };
  writeJson(`${kitRoot}/registry.json`, registry);
  return registry.items.length;
}

// ---------------------------------------------------------------------------
// brand-astro (shadcn CLI file-item format)
// ---------------------------------------------------------------------------
function generateAstro(): number {
  const kitRoot = `${root}/packages/brand-astro`;
  const src = `${kitRoot}/src`;
  const stockSeeds: StockSeed[] = stockSeedsFor(src, "starwind", "starwind-").map((s) => ({ ...s, kind: "stock-astro" }));
  const pieceSeeds: PieceSeed[] = pieceSeedsFor(src, (piece) => piece.astroFile ?? piece.svelteFile.replace(/\.svelte$/, ".astro"), "starwind");
  const helperSeeds = folderHelperSeedsFor(
    src,
    new Set(pieceSeeds.map((seed) => rel(src, seed.files[0]))),
    () => false,
  );

  const items = buildItems({
    srcRoot: src,
    codeExtensions: [".astro", ".ts", ".js", ".css", ".mjs"],
    exclude: () => false,
    versions: versionsFor(`${kitRoot}/package.json`),
    baseSeeds: [{ name: "utils", files: [abs(src, "utils.ts")] }, ...helperSeeds],
    stockSeeds,
    pieceSeeds,
    finalSeeds: [{ name: "kit", files: [abs(src, "index.ts"), abs(src, "styles/kit.css")] }],
    catchAllName: catchAllName(src),
  });

  const labels = labelItems(items, pieceSeeds, stockSeeds);
  const registry = {
    $schema: "https://ui.shadcn.com/schema.json",
    name: "hmziq-brand-astro",
    homepage: HOMEPAGE,
    items: items.map((item) => ({
      name: item.name,
      type: "registry:file",
      title: item.name,
      description: describe(labels.get(item.name)?.kind, { ...(labels.get(item.name) ?? { folder: item.name }) }),
      dependencies: item.dependencies,
      registryDependencies:
        item.name === "kit"
          ? items.filter((i) => i.name !== "kit").map((i) => `@hmziq/${i.name}`)
          : item.registryDependencies.map((d) => `@hmziq/${d}`),
      files: item.files.map((file) => ({
        path: `src/${file}`,
        target: `src/components/brand/${file}`,
        type: "registry:file",
      })),
    })),
  };
  writeJson(`${kitRoot}/registry.json`, registry);
  return registry.items.length;
}

const svelteCount = generateSvelte();
const astroCount = generateAstro();
console.log(`Svelte registry: ${svelteCount} items -> packages/brand-svelte/registry.json`);
console.log(`Astro registry:  ${astroCount} items -> packages/brand-astro/registry.json`);
