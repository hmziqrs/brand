/** A 404 page's words: the status and host, the title, the way home and to the docs, the hint under the dots and four pages that answer most of what brings people. */
export type NotFoundPageData = {
  status: string
  host: string
  title: string
  lede: string
  home: { label: string; href: string }
  docs: { label: string; href: string }
  hint: string
  next: {
    title: string
    command: string
    line: string
    pages: { title: string; dek: string; meta: string; href: string }[]
  }
}
