---
title: Installation
lede: Add the dependency, set it up once, and verify it is reachable.
section: Getting Started
order: 2
---

## Add the dependency

Example copy: run one command in your project.

```bash title="Terminal"
pnpm add example-tool
```

> [!NOTE] One dependency
> Example copy: what the tool brings in, and what it expects you to have.

## Set it up

Example copy: the one bit of setup the tool needs.

```ts title="example.config.ts"
export default {
  name: "example",
  quiet: true,
};
```

## Verify it is reachable

Example copy: the command that proves the setup worked.

```bash
example --version
```

> [!WARNING] Read this before the first run
> Example copy: the one thing that bites on a fresh setup.

## Next steps

- [Quick Start](/docs/quick-start): the first end-to-end run
- The table below is the Markdown table style, for reference

| Flag | Kind | What it does |
| --- | :---: | --- |
| `--json` | output | Prints machine-readable output |
| `--verbose` | logging | Brings the quiet logs back |
