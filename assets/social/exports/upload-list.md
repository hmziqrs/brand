# Social images: the upload list

Every file here is generated (`pnpm render-assets --only social`). Uploads are done by hand, from this list.

## The accounts

The lab's oxlabs contact page records the personal accounts: GitHub `hmziqrs`, X `@hmziqrs`, LinkedIn `in/hmziqrs`.

| Account | Photo | Cover |
| --- | --- | --- |
| X `@hmziqrs` | `avatars/hmziq-400x400.png` | `x/header-1500x500.png` |
| LinkedIn `in/hmziqrs` | `avatars/hmziq-400x400.png` | `linkedin/background-1584x396.png` |
| GitHub `hmziqrs` | `avatars/hmziq-400x400.png` | — |

## GitHub repo previews

| Repo | File |
| --- | --- |
| `hmziqrs/claude-multi` | `github/claude-multi-1280x640.png` |

Previews for freeoxide, gpui-starter, gpui-query are rendered and waiting; upload each once its repository name is confirmed. Files are PNG under 1 MB, as GitHub asks.

## Site cards

Each site's cards go live when that site serves its own head (the plan's rule); until then they stay files here.

| Site | og:image | X card |
| --- | --- | --- |
| hmziq | `sites/hmziq/og-1200x630.png` | `sites/hmziq/x-1200x675.png` |
| Blog | `sites/blog/og-1200x630.png` | `sites/blog/x-1200x675.png` |
| Labs | `sites/labs/og-1200x630.png` | `sites/labs/x-1200x675.png` |
| freeoxide | `sites/freeoxide/og-1200x630.png` | `sites/freeoxide/x-1200x675.png` |
| gpui-starter | `sites/gpui-starter/og-1200x630.png` | `sites/gpui-starter/x-1200x675.png` |
| gpui-query | `sites/gpui-query/og-1200x630.png` | `sites/gpui-query/x-1200x675.png` |
| claude-multi | `sites/claude-multi/og-1200x630.png` | `sites/claude-multi/x-1200x675.png` |
| oxlabs | `sites/oxlabs/og-1200x630.png` | `sites/oxlabs/x-1200x675.png` |

## Blog covers

`blog/cover-sample-1200x675.png` and `blog/og-sample-1200x630.png` prove the cover template (`assets/social/source/post-cover.ts`); real covers render per post from its title and date. The existing blog photo stays, as the plan decided.

## Avatars

One per site (`avatars/<site>-400x400.png`), for any account a site opens later. Each keeps the mark's content inside the centered 40% circle, so platform circle crops are safe.
