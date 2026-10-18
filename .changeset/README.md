# Changesets

How releases run here (docs/kits.md, "Distribution"; the master plan's
"Decisions"): by hand.

```sh
bunx changeset                # describe changes as you work
bunx changeset version        # bump versions, write changelogs
bun run registry:generate        # registries pick up the new core version
bun run check:fresh-copy svelte  # both fresh copies must pass before a release
bun run check:fresh-copy astro
bunx changeset publish        # publishes @hmziq/brand-core (the only public package)
git push --follow-tags        # then the Pages workflow deploys the registries
```

Only `@hmziq/brand-core` is published to npm. The two kits stay private:
Changesets still versions them and writes their changelogs (each kit's
changelog says which components changed), but `changeset publish` skips them,
and each kit ships as a registry instead. The lab, the boilerplates and the
video project ride along on core's bumps as private, untagged entries
(`updateInternalDependencies: patch`, `privatePackages.tag: false`) — they
are never published and never tagged.
