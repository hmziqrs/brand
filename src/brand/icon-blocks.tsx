import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleCheck,
  Copy,
  Database,
  Download,
  Info,
  Mail,
  Menu,
  OctagonAlert,
  PenLine,
  Search,
  Settings,
  SquareTerminal,
  Star,
  Sun,
  Tag as TagIcon,
  TriangleAlert,
} from "lucide-react"
import { siBluesky, siGithub, siX } from "simple-icons"
import { BrandIcon } from "@/components/brand/brand-icon"
import { IconTile } from "@/components/brand/icon-tile"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Panel } from "./color-blocks"

export function Strokes() {
  const icons = [Search, Settings, Download, Database, Mail]
  return (
    <Panel className="flex flex-col divide-y p-0">
      {[1.5, 1.75, 2].map((stroke) => (
        <div key={stroke} className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
          <span className="w-28 text-sm text-muted-foreground">
            {stroke === 1.75 ? <span className="font-medium text-foreground">1.75 (brand)</span> : stroke}
          </span>
          {icons.map((Icon, i) => (
            <span key={i} className="flex items-center gap-1.5 text-sm">
              <Icon className="size-4" style={{ strokeWidth: stroke }} />
              Label
            </span>
          ))}
          <span className="flex gap-3">
            {icons.slice(0, 3).map((Icon, i) => (
              <Icon key={i} className="size-6" style={{ strokeWidth: stroke }} />
            ))}
          </span>
        </div>
      ))}
    </Panel>
  )
}

export function Sizes() {
  const rows: [string, string, string][] = [
    ["size-3", "12px", "Inside badges and tags"],
    ["size-4", "16px", "Default: buttons, menus, inputs, next to body text"],
    ["size-4.5", "18px", "Inside an icon tile"],
    ["size-5", "20px", "On its own in a header or toolbar"],
    ["size-6", "24px", "Empty states. The largest an icon gets."],
  ]
  return (
    <Panel className="flex flex-col divide-y p-0">
      {rows.map(([cls, px, use]) => (
        <div key={cls} className="grid grid-cols-[3rem_8rem_1fr] items-center gap-4 px-5 py-3">
          <span className="flex justify-center">
            <Star className={cls} />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {cls} · {px}
          </span>
          <span className="text-sm">{use}</span>
        </div>
      ))}
    </Panel>
  )
}

const glossary: [string, LucideIcon, string][] = [
  ["Goes to another site", ArrowUpRight, "ArrowUpRight"],
  ["Continue, next step", ArrowRight, "ArrowRight"],
  ["Open a menu or section", ChevronDown, "ChevronDown"],
  ["Documentation", BookOpen, "BookOpen"],
  ["Writing, blog posts", PenLine, "PenLine"],
  ["Download", Download, "Download"],
  ["Copy / copied", Copy, "Copy → Check"],
  ["A command to run", SquareTerminal, "SquareTerminal"],
  ["Release or version", TagIcon, "Tag"],
  ["Search", Search, "Search"],
  ["Settings", Settings, "Settings"],
  ["Email", Mail, "Mail"],
  ["Stars on GitHub", Star, "Star"],
  ["Light / dark mode", Sun, "Sun / Moon"],
  ["Open / close the menu", Menu, "Menu / X"],
  ["Success", CircleCheck, "CircleCheck"],
  ["Tip or information", Info, "Info"],
  ["Warning", TriangleAlert, "TriangleAlert"],
  ["Error", OctagonAlert, "OctagonAlert"],
]

export function Glossary() {
  return (
    <Panel className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-5">When it means</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead className="pr-5">Lucide name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {glossary.map(([meaning, Icon, name]) => (
            <TableRow key={meaning}>
              <TableCell className="pl-5">{meaning}</TableCell>
              <TableCell>
                <Icon className="size-4" />
              </TableCell>
              <TableCell className="pr-5 font-mono text-xs text-muted-foreground">{name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Panel>
  )
}

const socials = [
  { icon: siGithub, name: "GitHub" },
  { icon: siX, name: "X" },
  { icon: siBluesky, name: "Bluesky" },
]

export function InUse() {
  return (
    <Panel className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button>
          <Download data-icon="inline-start" />
          Download
        </Button>
        <Button variant="outline">
          <BrandIcon icon={siGithub} data-icon="inline-start" />
          View on GitHub
        </Button>
        <Button variant="ghost">
          Read the docs
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Search" />}>
            <Search />
          </TooltipTrigger>
          <TooltipContent>Search</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Switch to light mode" />}>
            <Sun />
          </TooltipTrigger>
          <TooltipContent>Switch to light mode</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
        {socials.map((s) => (
          <a key={s.name} href="#" className="flex items-center gap-1.5 hover:text-foreground">
            <BrandIcon icon={s.icon} />
            {s.name}
          </a>
        ))}
        <a href="#" className="flex items-center gap-1.5 hover:text-foreground">
          <Mail className="size-4" />
          Email
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <IconTile>
          <Database />
        </IconTile>
        <IconTile tone="success">
          <Check />
        </IconTile>
        <IconTile tone="warning">
          <TriangleAlert />
        </IconTile>
        <IconTile tone="info">
          <Info />
        </IconTile>
        <IconTile tone="purple">
          <PenLine />
        </IconTile>
        <span className="text-sm text-muted-foreground">
          Icon tiles: orange on neutral by default, or one soft color when the color means something.
        </span>
      </div>
    </Panel>
  )
}
