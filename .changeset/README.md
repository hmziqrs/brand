# Changesets

How releases run here (docs/kits.md, "Distribution"; the master plan's
"Decisions"): by hand.

```sh
pnpm changeset                # describe changes as you work
pnpm changeset version        # bump versions, write changelogs
pnpm registry:generate        # registries pick up the new core version
pnpm check:fresh-copy svelte  # both fresh copies must pass before a release
pnpm check:fresh-copy astro
pnpm changeset publish        # publishes @hmziq/brand-core (the only public package)
git push --follow-tags        # then the Pages workflow deploys the registries
```

Only `@hmziq/brand-core` is published to npm. The two kits stay private:
Changesets still versions them and writes their changelogs (each kit's
changelog says which components changed), but `changeset publish` skips them,
and each kit ships as a registry instead. The lab, the boilerplates and the
video project ride along on core's bumps as private, untagged entries
(`updateInternalDependencies: patch`, `privatePackages.tag: false`) — they
are never published and never tagged.
