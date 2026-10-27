// kits.md step 3: the shared engine behind both kit registries.
//
// `generate-registries.ts` uses it to write the two authoring files
// (`packages/brand-svelte/registry.json`, shadcn-svelte's format, and
// `packages/brand-astro/registry.json`, the shadcn CLI's file-item format —
// the install method step 2's test picked). `build-registries.ts` uses the
// same model to lay out the Pages deploy.
//
// The roster (scripts/pieces.json) is the source of truth for pieces: one
// registry item per piece, plus one per stock component folder the kit
// vendors, plus `utils`, the `kit` barrel/stylesheet item, and one catch-all
// item per folder the roster doesn't cover yet (content-blocks.md and
// app-blocks.md add their pieces to the roster as they finish; re-run
// `bun run registry:generate` after they do).
//
// Every source file ends up in exactly one item, so installing two items
// never writes the same file twice. An item's `registryDependencies` are the
// items its files import, so installing one piece pulls what it needs.

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, dirname, relative, resolve } from "node:path";

export const NOT_YET = "not yet";

export type Seed = { name: string; files: string[] };
export type Versions = Record<string, string | undefined>;
export type GraphEntry = { kitImports: Set<string>; externals: Set<string> };
export type Graph = Map<string, GraphEntry>;
export type Item = { name: string; files: string[]; registryDependencies: string[]; dependencies: string[] };
export type BuildConfig = {
  srcRoot: string;
  codeExtensions: string[];
  exclude: (file: string) => unknown;
  versions: Versions;
  catchAllName: (file: string) => string;
  baseSeeds: Seed[];
  pieceSeeds: Seed[];
  stockSeeds: Seed[];
  finalSeeds?: Seed[];
};

/** kebab-case, the registry item name for a piece. */
export const kebab = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

export function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function writeJson(path: string, value: unknown): void {
  writeFileSync(path, JSON.stringify(value, null, "\t") + "\n");
}

export const rel = (root: string, file: string): string => relative(root, file).split("\\").join("/");
export const abs = (root: string, relPath: string): string => join(root, ...relPath.split("/"));

/** Every file under `dir`, recursively, sorted for deterministic output. */
export function walkFiles(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir).sort()) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkFiles(path, out);
    else out.push(path);
  }
  return out;
}

/** Strips block comments so doc-comment `@import` lines are not read as imports. */
export function stripBlockComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "");
}

/**
 * Blanks template-literal text (comments and quoted strings are kept verbatim)
 * so import-looking code samples held in literals are not read as imports.
 */
export function blankTemplateLiterals(source: string): string {
  let out = "";
  let i = 0;
  const keepVerbatim = (close: string): void => {
    const at = source.indexOf(close, i);
    const stop = at === -1 ? source.length : at + close.length;
    out += source.slice(i, stop);
    i = stop;
  };
  const keepString = (quote: string): void => {
    let j = i + 1;
    while (j < source.length && source[j] !== quote) j += source[j] === "\\" ? 2 : 1;
    const stop = Math.min(j + 1, source.length);
    out += source.slice(i, stop);
    i = stop;
  };
  const interpolationEnd = (): number => {
    let depth = 0;
    let j = i;
    while (j < source.length) {
      const c = source[j];
      if (c === '"' || c === "'" || c === "`") {
        j += 1;
        while (j < source.length && source[j] !== c) j += source[j] === "\\" ? 2 : 1;
      } else if (c === "{") depth += 1;
      else if (c === "}" && --depth === 0) return j;
      j += 1;
    }
    return source.length;
  };
  while (i < source.length) {
    const c = source[i];
    if (c === "/" && source[i + 1] === "/") {
      const at = source.indexOf("\n", i);
      const stop = at === -1 ? source.length : at;
      out += source.slice(i, stop);
      i = stop;
    } else if (c === "<" && source[i + 1] === "!") keepVerbatim("-->");
    else if (c === '"' || c === "'") keepString(c);
    else if (c === "`") {
      out += " ";
      i += 1;
      while (i < source.length && source[i] !== "`") {
        if (source[i] === "\\") i += 2;
        else if (source[i] === "$" && source[i + 1] === "{") {
          const end = interpolationEnd();
          out += blankTemplateLiterals(source.slice(i, end + 1));
          i = end + 1;
        } else i += 1;
      }
      out += " ";
      i += 1;
    } else {
      out += c;
      i += 1;
    }
  }
  return out;
}

/** Resolves an import specifier to a kit source file, or null when external. */
export function resolveImport(spec: string, fromFile: string, srcRoot: string): string | null {
  let base: string;
  if (spec.startsWith("$brand/")) base = join(srcRoot, spec.slice("$brand/".length));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;

  // The same resolution Vite does: exact, then extensions, then .js -> .ts,
  // then an index file. A spec may already carry an extension that mismatches
  // the file on disk (`./logo-style.js` for `logo-style.ts`).
  const tries = [
    base,
    `${base}.ts`,
    `${base}.js`,
    `${base}.svelte`,
    `${base}.astro`,
    `${base}.css`,
    base.replace(/\.js$/, ".ts"),
    join(base, "index.ts"),
    join(base, "index.js"),
  ];
  for (const t of tries) if (existsSync(t) && statSync(t).isFile()) return t;
  return null;
}

/**
 * The import graph of a kit's source tree.
 * graph: Map<absPath, { kitImports: Set<absPath>, externals: Set<string> }>
 */
export function buildGraph(srcRoot: string, { codeExtensions, exclude = () => false }: { codeExtensions: string[]; exclude?: (file: string) => unknown }): Graph {
  const graph: Graph = new Map();
  for (const file of walkFiles(srcRoot)) {
    if (!codeExtensions.some((e) => file.endsWith(e))) continue;
    if (exclude(file)) continue;
    graph.set(file, { kitImports: new Set(), externals: new Set() });
  }

  const importPattern =
    /(?:import|export)[^'"`]*from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)|@import\s+["']([^"']+)["']|@plugin\s+["']([^"']+)["']|(?<![@\w])import\s+["']([^"']+)["']/g;
  for (const [file, entry] of graph) {
    const source = blankTemplateLiterals(stripBlockComments(readFileSync(file, "utf8")));
    for (const match of source.matchAll(importPattern)) {
      const spec = match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5];
      if (!spec) continue;
      const resolved = resolveImport(spec, file, srcRoot);
      if (resolved && resolved !== file) entry.kitImports.add(resolved);
      else if (!resolved && !spec.startsWith(".") && !spec.startsWith("$brand")) entry.externals.add(spec);
    }
  }
  return graph;
}

// Framework builtins an app already has; never listed as item dependencies.
const SKIP_EXTERNALS: Set<string> = new Set([
  "svelte",
  "svelte/elements",
  "svelte/reactivity",
  "astro",
  "astro/types",
  "astro:content",
  "astro:transitions/client",
  "astro:env/client",
  "tailwindcss",
  "tw-animate-css",
]);

/**
 * Maps external import specifiers to `name@version` npm dependencies.
 * `versions` comes from the kit's package.json (deps + devDeps) plus
 * `core` for @hmziq/brand-core. An unknown version is an error, not a guess.
 */
export function npmDependencies(externals: Set<string>, versions: Versions): string[] {
  const scoped = (spec: string, name: string): { spec: string; name: string; version: string | undefined } => ({ spec, name, version: versions[name] });
  const deps = new Set<string>();
  for (const spec of externals) {
    if (SKIP_EXTERNALS.has(spec) || spec.startsWith("svelte/")) continue;
    let name: string;
    if (spec.startsWith("@hmziq/brand-core")) {
      deps.add(`@hmziq/brand-core@${versions.core}`);
      // The scenes module is core's only three.js user, and it is core's
      // optional peer: an item that imports it carries three itself, so a
      // project building that piece has it (the kit barrel exports Scene,
      // which makes that every project that installs the whole kit).
      if (spec.startsWith("@hmziq/brand-core/motion/scenes") && versions.three) {
        deps.add(`three@${versions.three}`);
      }
      continue;
    }
    if (spec.startsWith("@lucide/svelte")) name = "@lucide/svelte";
    else if (spec.startsWith("@lucide/astro")) name = "@lucide/astro";
    else if (spec.startsWith("shiki")) name = "shiki";
    else if (spec.startsWith("simple-icons")) name = "simple-icons";
    else if (spec.startsWith("@starwind-ui/")) name = "@starwind-ui/astro";
    else if (spec.startsWith("shadcn-svelte/")) name = "shadcn-svelte";
    else name = spec;
    const { version } = scoped(spec, name);
    if (!version) {
      throw new Error(
        `No version known for "${name}" (imported as "${spec}"). Add it to the kit's package.json dependencies and re-run.`,
      );
    }
    deps.add(`${name}@${version}`);
  }
  return [...deps].sort();
}

/**
 * Claims every kit file for exactly one item.
 *
 * `seeds` is an ordered list of `{ name, files }` (base, pieces, stock, the
 * kit barrel last). Two phases, so an item always exists for every seed and
 * always owns its own files:
 *
 * 1. Primary claims: each seed claims exactly the files it lists. A roster
 *    piece keeps its own file even when an earlier piece's closure imports
 *    it; a stock folder keeps its whole folder even when another stock
 *    component imports into it.
 * 2. Closures: each seed walks kit-internal imports breadth-first and claims
 *    what is still unowned (shared helpers go to the first seed in order).
 *    A file another item owns becomes a registryDependency instead.
 *
 * Files no seed reaches are claimed by a catch-all item per folder
 * (`catchAllName(file)` names those).
 */
export function claimFiles(graph: Graph, seeds: Seed[], catchAllName: (file: string) => string): { owner: Map<string, string>; items: Map<string, Set<string>> } {
  const owner = new Map<string, string>(); // absPath -> item name
  const items = new Map<string, Set<string>>(); // item name -> Set<absPath>

  const claim = (name: string, file: string): boolean => {
    if (owner.has(file)) return false;
    owner.set(file, name);
    if (!items.has(name)) items.set(name, new Set());
    items.get(name).add(file);
    return true;
  };

  for (const seed of seeds) for (const file of seed.files) claim(seed.name, file);

  for (const seed of seeds) {
    const queue = [...seed.files];
    while (queue.length) {
      const file = queue.shift();
      if (!graph.has(file)) continue;
      for (const next of graph.get(file).kitImports) if (claim(seed.name, next)) queue.push(next);
    }
  }

  const catchAlls = new Map<string, string[]>();
  for (const file of graph.keys()) {
    if (owner.has(file)) continue;
    const name = catchAllName(file);
    if (!catchAlls.has(name)) catchAlls.set(name, []);
    catchAlls.get(name).push(file);
  }
  for (const [name, files] of catchAlls) for (const file of files) claim(name, file);

  return { owner, items };
}

/**
 * Builds the item model for one kit. `config`:
 *   srcRoot, codeExtensions, exclude, versions, catchAllName,
 *   baseSeeds, pieceSeeds, stockSeeds, finalSeeds — claiming order; the
 *   roster's pieces come before stock so a piece always wins its own file.
 */
export function buildItems(config: BuildConfig): Item[] {
  const graph = buildGraph(config.srcRoot, config);
  const seeds = [...config.baseSeeds, ...config.pieceSeeds, ...config.stockSeeds, ...(config.finalSeeds ?? [])];
  const { owner, items } = claimFiles(graph, seeds, config.catchAllName);

  const built: Item[] = [];
  for (const [name, files] of items) {
    const sorted = [...files].sort();
    const registryDependencies = new Set<string>();
    for (const file of sorted) {
      for (const imported of graph.get(file)?.kitImports ?? []) {
        const target = owner.get(imported);
        if (target && target !== name) registryDependencies.add(target);
      }
    }
    const externals = new Set<string>();
    for (const file of sorted) for (const e of graph.get(file)?.externals ?? []) externals.add(e);
    built.push({
      name,
      files: sorted.map((f) => rel(config.srcRoot, f)),
      registryDependencies: [...registryDependencies].sort(),
      dependencies: npmDependencies(externals, config.versions),
    });
  }
  built.sort((a, b) => a.name.localeCompare(b.name));
  return built;
}
