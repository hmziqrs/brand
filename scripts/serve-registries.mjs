// Serves a built registry (dist/registries from `pnpm registry:build`) over
// localhost, so the CLIs can install from a local build — which is what
// `pnpm check:fresh-copy` does, and handy when testing registry changes by
// hand:
//
//   node scripts/serve-registries.mjs [--without-core]
//
// --without-core drops the `@hmziq/brand-core@…` dependency from every served
// item. check:fresh-copy sets it while core is only a local pnpm-pack
// tarball: new-project has already written the tarball into the copy's
// package.json, and the CLIs would otherwise try to install the (unreleased)
// version from npm.
//
// The server logs every request to stdout and prints `LISTENING <port>`
// first, so a wrapper can read the port it picked.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dir = join(root, "dist/registries");
const withoutCore = process.argv.includes("--without-core");

const types = { ".json": "application/json", ".css": "text/css" };

function stripCore(json) {
  const strip = (deps) => deps?.filter((d) => !d.startsWith("@hmziq/brand-core@"));
  if (Array.isArray(json)) for (const item of json) item.dependencies = strip(item.dependencies);
  else json.dependencies = strip(json.dependencies);
  return json;
}

async function handle(req, res) {
  const path = join(dir, decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, ""));
  try {
    const info = await stat(path).catch(() => null);
    if (!info?.isFile()) throw new Error("not found");
    let body = await readFile(path);
    if (withoutCore && path.endsWith(".json")) {
      body = Buffer.from(JSON.stringify(stripCore(JSON.parse(body.toString()))));
    }
    res.writeHead(200, { "content-type": types[path.slice(path.lastIndexOf("."))] ?? "application/octet-stream" });
    res.end(body);
    console.log(`${req.method} ${req.url} -> 200`);
  } catch {
    res.writeHead(404);
    res.end("not found");
    console.log(`${req.method} ${req.url} -> 404`);
  }
}

const server = createServer((req, res) => {
  handle(req, res).catch(() => {
    try {
      res.writeHead(500);
      res.end();
    } catch {
      /* the socket is gone */
    }
  });
});
server.listen(0, "127.0.0.1", () => {
  console.log(`LISTENING ${server.address().port}`);
});
