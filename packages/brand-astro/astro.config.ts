import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";

// The kit is a library, not a site: this config exists so `astro check` (and
// the editor) can resolve the kit's own imports the way a project using the
// kit does, through the `$brand` alias (docs/kits.md, porting rule 3).
const srcDir = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        $brand: srcDir,
      },
    },
  },
});
