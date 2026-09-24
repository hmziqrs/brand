import {
  AppWindow,
  Bell,
  Command,
  Database,
  Languages,
  Palette,
  RefreshCw,
  ShieldCheck,
} from "lucide-react"
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { Badge } from "@/components/ui/badge"
import { Kbd } from "@/components/ui/kbd"
import { CodeBlock, InlineCode } from "@/components/brand/code-block"
import { ButtonLink, CtaBand, FeatureGrid, Hero, HeroNote, Section, SiteShell, Steps } from "./shared/site"

const features = [
  {
    icon: <AppWindow />,
    title: "The app window",
    body: "Custom title bar, a sidebar that collapses, a status bar and pages you can move between.",
  },
  {
    icon: <Database />,
    title: "Saving data",
    body: "A local database, settings that upgrade themselves between versions, and secrets kept in the system keychain.",
  },
  {
    icon: <Bell />,
    title: "Works with the system",
    body: "Menu bar icon, native notifications, a global shortcut, and links that open straight into your app.",
  },
  {
    icon: <Palette />,
    title: "24 themes",
    body: "Themes are plain files. Drop a new one in and it shows up while the app is still running.",
  },
  {
    icon: <Languages />,
    title: "Translations",
    body: "English and Chinese are included. Form errors are translated too, and adding a language doesn't touch code.",
  },
  {
    icon: <ShieldCheck />,
    title: "Safe updates",
    body: "Every release is signed, so people only ever install updates that really came from you.",
  },
  {
    icon: <RefreshCw />,
    title: "Data loading",
    body: "Fetching, caching and retries are handled by gpui-query, so screens show fresh data without extra code.",
  },
  {
    icon: <Command />,
    title: "Quick launcher",
    body: (
      <>
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to jump to any page or action in the app.
      </>
    ),
  },
]

const pages = [
  { name: "Home", body: "Shows data loaded through gpui-query on the very first screen." },
  { name: "Form", body: "Inputs checked as you type, with errors in the user's language." },
  { name: "Settings", body: "Theme, language and privacy choices, saved between launches." },
  { name: "About", body: "Version details and a check for updates." },
  { name: "Diagnostics", body: "What's running, which theme is active, and tools for support." },
  { name: "Notifications", body: "System notifications, with an inbox people can reopen." },
]

const routeExample = `// Register a page once. The sidebar, the ⌘K launcher and links all follow.
pub fn routes(cx: &mut App) -> Vec<Route> {
    vec![
        Route::new(Page::Home).icon("house"),
        Route::new(Page::Form).icon("file-text"),
        Route::new(Page::Settings).icon("settings"),
        Route::new(Page::Diagnostics).dev_only(),
    ]
}`

function AppPreview() {
  const nav = ["Home", "Form", "Settings", "About"]
  const themes = ["Catppuccin", "Tokyo Night", "Dracula", "One Dark"]
  return (
    <div className="overflow-hidden rounded-xl border" role="img" aria-label="Preview of the starter app: a sidebar, a welcome page and a theme picker">
      <div className="flex h-9 items-center gap-2 border-b px-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-muted-foreground/40" />
          <span className="size-2.5 rounded-full bg-muted-foreground/40" />
          <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        </span>
        <span className="mx-auto text-xs text-muted-foreground">gpui-starter</span>
      </div>
      <div className="grid grid-cols-[8.5rem_1fr]">
        <ul className="flex flex-col gap-0.5 border-r p-2 text-sm">
          {nav.map((item, i) => (
            <li
              key={item}
              className={
                i === 0
                  ? "rounded-md bg-primary/10 px-2.5 py-1.5 text-primary dark:bg-primary/20"
                  : "px-2.5 py-1.5 text-muted-foreground"
              }
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Welcome to GPUI Starter</p>
            <p className="text-sm text-muted-foreground">A starting point for desktop apps.</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline">24 themes</Badge>
            <Badge variant="outline">2 languages</Badge>
            <Badge variant="outline">100% Rust</Badge>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Theme</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {themes.map((t, i) => (
                <span
                  key={t}
                  className={
                    i === 1
                      ? "rounded-md border border-primary/60 bg-primary/10 px-2 py-1.5"
                      : "rounded-md border px-2 py-1.5 text-muted-foreground"
                  }
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GpuiStarterPage() {
  return (
    <SiteShell
      site="gpui-starter"
      maker="by freeoxide"
      nav={["Docs", "Blog", "FAQ", "Changelog"]}
      cta={{ label: "Get started" }}
      footerLinks={[
        { title: "Docs", links: ["Quickstart", "Themes", "Translations", "Updates"] },
        { title: "Project", links: ["Changelog", "Blog", "FAQ"] },
        { title: "Code", links: ["GitHub", "Releases"] },
        { title: "freeoxide", links: ["All projects", "About"] },
      ]}
    >
      <Hero
        title="Start your desktop app with the boring parts done."
        lede="A ready-made starting point for Mac, Windows and Linux apps built with GPUI, the framework behind the Zed editor. Windows, themes, translations, settings and updates already work. Delete what you don't need."
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Get started
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              View on GitHub
            </ButtonLink>
          </>
        }
        note={<HeroNote>Free and open source. Works on macOS, Windows and Linux.</HeroNote>}
        aside={<AppPreview />}
      />

      <Section
        title="Everything a real app needs, already connected"
        intro="Each part lives in its own folder. Take out the ones you don't want and nothing else breaks."
      >
        <FeatureGrid items={features} />
      </Section>

      <Section
        title="Six working pages on the first run"
        intro="Not a hello-world. Every page is live the first time you open the app, so you can see how the parts fit together."
      >
        <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <div key={p.name} className="flex flex-col gap-2 bg-background p-6">
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="From first run to release" intro="Every step is a real command in the project.">
        <Steps
          items={[
            { title: "Run it", body: <>Type <InlineCode>cargo run</InlineCode>. The app builds and opens with every page working.</> },
            { title: "Make it yours", body: "Copy a theme file and edit it. The app picks up the change without restarting." },
            { title: "Test it", body: <><InlineCode>cargo test</InlineCode> runs every check, including one that rejects fake updates.</> },
            { title: "Package it", body: "One script builds a signed Mac app you can open straight away." },
            { title: "Release it", body: <><InlineCode>just release</InlineCode> signs the update and publishes it on GitHub.</> },
          ]}
        />
      </Section>

      <Section title="Adding a page takes one line" intro="Register it once, and the sidebar, the launcher and links to it all update.">
        <CodeBlock label="src/shell/route.rs" code={routeExample} lang="rust" />
      </Section>

      <CtaBand
        title="Clone it and run it"
        body={
          <>
            Clone the repository from GitHub, run <InlineCode>cargo run</InlineCode>, and follow the quickstart from
            there.
          </>
        }
        actions={
          <>
            <ButtonLink href="#" size="lg" className="px-5">
              Read the quickstart
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="outline" className="px-5">
              <BrandIcon icon={siGithub} data-icon="inline-start" />
              View on GitHub
            </ButtonLink>
          </>
        }
      />
    </SiteShell>
  )
}
