// Lets a project start from this checkout before anything is published: core
// packed into a tarball and the registries served over localhost. Both
// `new-project --local` and `check:fresh-copy` install through it.

import { execSync, spawn } from "node:child_process";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

export type RegistryServer = { kill(): void; url: string };

export function isCoreOnNpm(version: string): boolean {
  if (version === "0.0.0") return false;
  try {
    execSync(`bun pm view @hmziq/brand-core@${version} version`, { cwd: root, stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

/** Packs core and returns a `file:` spec for the tarball, in a temp folder. */
export function packCore(): string {
  const outDir = mkdtempSync(join(tmpdir(), "brand-core-pack-"));
  const pkgDir = join(root, "packages/brand-core");
  // bun pm pack runs `prepare` without the package's bin folder on PATH, so tsup
  // is missing there; the build runs first and the pack skips lifecycle scripts.
  execSync("bun run build", { cwd: pkgDir, stdio: "pipe" });
  execSync("bun pm pack --ignore-scripts", { cwd: pkgDir, stdio: "pipe" });
  const tgz = execSync("ls *.tgz", { cwd: pkgDir, shell: "/bin/sh" }).toString().trim().split("\n").pop();
  cpSync(join(pkgDir, tgz), join(outDir, tgz));
  rmSync(join(pkgDir, tgz), { force: true });
  return `file:${join(outDir, tgz)}`;
}

export function buildRegistries(): void {
  execSync(`bun ${join(root, "scripts/build-registries.ts")}`, { cwd: root, stdio: "pipe" });
}

/** Serves dist/registries from its own process: the installs run under spawnSync, which would freeze one here. */
export async function serveRegistries(extraArgs: string[] = []): Promise<RegistryServer> {
  const child = spawn("bun", [join(root, "scripts/serve-registries.ts"), "--quiet", ...extraArgs], {
    cwd: root,
    stdio: ["ignore", "pipe", "inherit"],
  });
  const port = await new Promise<number>((resolvePort, reject) => {
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
  return { kill: () => child.kill(), url: `http://127.0.0.1:${port}` };
}
