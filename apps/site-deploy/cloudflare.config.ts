import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "hmziqbrand",
    compatibilityDate: "2026-11-01",
    domains: ["brand.hmziq.rs"],
    workersDev: false,
    assets: {
      htmlHandling: "auto-trailing-slash",
      notFoundHandling: "404-page",
    },
  },
});
