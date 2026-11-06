import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://brand.hmziq.rs",
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: (page) => !page.includes("/media/raw/") })],
  vite: {
    resolve: {
      alias: {
        $brand: fileURLToPath(new URL("../../packages/brand-astro/src", import.meta.url)),
      },
    },
    plugins: [tailwindcss()],
  },
});
