// The Svelte kit's barrel. Kit files import each other through `$brand/…`;
// this file is what a project gets from `@hmziq/brand-svelte` if it imports
// the package rather than copying it in.

// Brand pieces (BRAND.md section 9).
export { default as BandArcs } from "./components/band-arcs.svelte";
export { default as BrandIcon } from "./components/brand-icon.svelte";
export { default as CodeBlock } from "./components/code-block.svelte";
export { default as CodeLines } from "./components/code-lines.svelte";
export { default as Command } from "./components/command.svelte";
export { default as CommandBar } from "./components/command-bar.svelte";
export { default as CommandBox } from "./components/command-box.svelte";
export { default as CopyButton } from "./components/copy-button.svelte";
export { default as CornerRings } from "./components/corner-rings.svelte";
export { default as DataTable } from "./components/data-table.svelte";
export { default as Glass } from "./components/glass.svelte";
export { default as HorizonRings } from "./components/horizon-rings.svelte";
export { default as IconTile } from "./components/icon-tile.svelte";
export { default as InlineCode } from "./components/inline-code.svelte";
export { default as Marker } from "./components/marker.svelte";
export { default as Mark } from "./components/mark.svelte";
export { default as Notice } from "./components/notice.svelte";
export { default as Question } from "./components/question.svelte";
export { default as Questions } from "./components/questions.svelte";
export { default as RingGauge } from "./components/ring-gauge.svelte";
export { default as Rings } from "./components/rings.svelte";
export { default as Scene } from "./components/scene.svelte";
export { default as Segmented } from "./components/segmented.svelte";
export { default as StatusRing } from "./components/status-ring.svelte";
export { default as Step } from "./components/step.svelte";
export { default as StepNumber } from "./components/step-number.svelte";
export { default as Stepper } from "./components/stepper.svelte";
export { default as Tag } from "./components/tag.svelte";
export { default as TerminalBody } from "./components/terminal-body.svelte";
export { default as TerminalLine } from "./components/terminal-line.svelte";
export { default as TerminalWindow } from "./components/terminal-window.svelte";
export { default as Toc } from "./components/toc.svelte";
export { default as Wordmark } from "./components/wordmark.svelte";
export type { TerminalLineData } from "./components/terminal-line.js";
export type { CodeFile, CodeLanguage } from "./components/code-tokenize.js";

// Site blocks and content pieces.
export { default as BeforeAfter } from "./blocks/site/before-after.svelte";
export { default as BigNumbers } from "./blocks/site/big-numbers.svelte";
export { default as Bullets } from "./blocks/site/bullets.svelte";
export { default as ButtonLink } from "./blocks/site/button-link.svelte";
export { default as CheckList } from "./blocks/site/check-list.svelte";
export { default as Container } from "./blocks/site/container.svelte";
export { default as CtaBand } from "./blocks/site/cta-band.svelte";
export { default as ElementCard } from "./blocks/site/element-card.svelte";
export { default as EmptyNote } from "./blocks/site/empty-note.svelte";
export { default as FeatureCards } from "./blocks/site/feature-cards.svelte";
export { default as FeatureGrid } from "./blocks/site/feature-grid.svelte";
export { default as Hero } from "./blocks/site/hero.svelte";
export { default as HeroActions } from "./blocks/site/hero-actions.svelte";
export { default as HeroLede } from "./blocks/site/hero-lede.svelte";
export { default as HeroNote } from "./blocks/site/hero-note.svelte";
export { default as HeroNotes } from "./blocks/site/hero-notes.svelte";
export { default as HeroTitle } from "./blocks/site/hero-title.svelte";
export { default as FaqSection } from "./blocks/site/faq-section.svelte";
export { default as Kicker } from "./blocks/site/kicker.svelte";
export { default as LinkBar } from "./blocks/site/link-bar.svelte";
export { default as PageIntro } from "./blocks/site/page-intro.svelte";
export { default as Price } from "./blocks/site/price.svelte";
export { default as PricingCard } from "./blocks/site/pricing-card.svelte";
export { default as PricingCompare } from "./blocks/site/pricing-compare.svelte";
export { default as PricingPage } from "./blocks/site/pricing-page.svelte";
export { default as PricingPlans } from "./blocks/site/pricing-plans.svelte";
export { default as Prose } from "./blocks/site/prose.svelte";
export { default as RingStats } from "./blocks/site/ring-stats.svelte";
export { default as SearchBox } from "./blocks/site/search-box.svelte";
export { default as Section } from "./blocks/site/section.svelte";
export { default as SiteHead } from "./blocks/site/site-head.svelte";
export { default as SiteShell } from "./blocks/site/site-shell.svelte";
export { default as Steps } from "./blocks/site/steps.svelte";
export { default as SummaryBox } from "./blocks/site/summary-box.svelte";
export { default as TopicChips } from "./blocks/site/topic-chips.svelte";
export type { Plan } from "./blocks/site/plan.js";
export type { PricingBilling, PricingCell, PricingCompareData, PricingFaqData, PricingGroup, PricingHeroData, PricingTier } from "./blocks/site/pricing-types.js";

// Content-page blocks (content-blocks.md).
export { default as BlogIndex } from "./blocks/content/blog-index.svelte";
export { default as BlogLayout } from "./blocks/content/blog-layout.svelte";
export { default as Byline } from "./blocks/content/byline.svelte";
export { default as CodeEditor } from "./blocks/content/code-editor.svelte";
export { default as ContactChannels } from "./blocks/content/contact-channels.svelte";
export { default as DocsLayout } from "./blocks/content/docs-layout.svelte";
export { default as DocsPager } from "./blocks/content/docs-pager.svelte";
export { default as DocsSearch } from "./blocks/content/docs-search.svelte";
export { default as DocsTitle } from "./blocks/content/docs-title.svelte";
export { default as FaqList } from "./blocks/content/faq-list.svelte";
export { default as InstallSteps } from "./blocks/content/install-steps.svelte";
export { default as KindTag } from "./blocks/content/kind-tag.svelte";
export { default as LegalBlock } from "./blocks/content/legal-block.svelte";
export { default as LegalLayout } from "./blocks/content/legal-layout.svelte";
export { default as LegalSection } from "./blocks/content/legal-section.svelte";
export { default as MagazineIndex } from "./blocks/content/magazine-index.svelte";
export { default as NewsletterBand } from "./blocks/content/newsletter-band.svelte";
export { default as NotFound } from "./blocks/content/not-found.svelte";
export { default as PastReleases } from "./blocks/content/past-releases.svelte";
export { default as PostArticle } from "./blocks/content/post-article.svelte";
export { default as PostCard } from "./blocks/content/post-card.svelte";
export { default as PostContents } from "./blocks/content/post-contents.svelte";
export { default as PostHeader } from "./blocks/content/post-header.svelte";
export { default as PostList } from "./blocks/content/post-list.svelte";
export { default as PostMeta } from "./blocks/content/post-meta.svelte";
export { default as PullQuote } from "./blocks/content/pull-quote.svelte";
export { default as ReleaseDesk } from "./blocks/content/release-desk.svelte";
export { default as ReleaseFilters } from "./blocks/content/release-filters.svelte";
export { default as ReleaseHead } from "./blocks/content/release-head.svelte";
export { default as ReleaseNotes } from "./blocks/content/release-notes.svelte";
export { default as ReleasePicture } from "./blocks/content/release-picture.svelte";
export { default as ReleaseTimeline } from "./blocks/content/release-timeline.svelte";
export { default as ReleaseTimelinePage } from "./blocks/content/release-timeline-page.svelte";
export { default as ShareBar } from "./blocks/content/share-bar.svelte";
export { default as TopicCards } from "./blocks/content/topic-cards.svelte";
export { default as TypingTerminal } from "./blocks/content/typing-terminal.svelte";
export type { ChangeItem, ChangeSpots, PostBlock, PostItem, PostSection, Release, ReleaseLink, ReleasePictureInfo, SpotState, TopicShelf, TopicTone } from "./blocks/content/types.js";

// App blocks (app-blocks.md), the same 45 the Astro barrel exports. The
// folder's small sub-parts stay internal, as they do there: `AuthField`,
// `ShellNav` and `ShellToggle` are used by the blocks above, not by a page.
export { default as AppPage } from "./blocks/app/shell/app-page.svelte";
export { default as AppPageHeader } from "./blocks/app/shell/app-page-header.svelte";
export { default as AppShell } from "./blocks/app/shell/app-shell.svelte";
export { default as AppTableFrame } from "./blocks/app/table/app-table-frame.svelte";
export { default as AuthLayout } from "./blocks/app/auth-layout/auth-layout.svelte";
export { default as BulkActionBar } from "./blocks/app/collection/bulk-action-bar.svelte";
export { default as CollectionToolbar } from "./blocks/app/collection/collection-toolbar.svelte";
export { default as ConfirmAction } from "./blocks/app/actions/confirm-action.svelte";
export { default as DataState } from "./blocks/app/states/data-state.svelte";
export { default as DetailList } from "./blocks/app/details/detail-list.svelte";
export { default as DetailSection } from "./blocks/app/details/detail-section.svelte";
export { default as EmptyState } from "./blocks/app/states/empty-state.svelte";
export { default as ErrorState } from "./blocks/app/states/error-state.svelte";
export { default as FilterChip } from "./blocks/app/collection/filter-chip.svelte";
export { default as ForgotPasswordForm } from "./blocks/app/auth/forgot-password-form.svelte";
export { default as FormActions } from "./blocks/app/settings/form-actions.svelte";
export { default as MetricTrend } from "./blocks/app/metrics/metric-trend.svelte";
export { default as NoResults } from "./blocks/app/states/no-results.svelte";
export { default as PasswordInput } from "./blocks/app/auth/password-input.svelte";
export { default as ProviderButtons } from "./blocks/app/auth/provider-buttons.svelte";
export { default as RecordSheet } from "./blocks/app/actions/record-sheet.svelte";
export { default as ResetPasswordForm } from "./blocks/app/auth/reset-password-form.svelte";
export { default as RowActions } from "./blocks/app/table/row-actions.svelte";
export { default as RowCheckbox } from "./blocks/app/table/row-checkbox.svelte";
export { default as SelectAllCheckbox } from "./blocks/app/table/select-all-checkbox.svelte";
export { default as SettingRow } from "./blocks/app/settings/setting-row.svelte";
export { default as SettingsSection } from "./blocks/app/settings/settings-section.svelte";
export { default as SignInForm } from "./blocks/app/auth/sign-in-form.svelte";
export { default as SignUpForm } from "./blocks/app/auth/sign-up-form.svelte";
export { default as SkeletonDetails } from "./blocks/app/states/skeleton-details.svelte";
export { default as SkeletonSettings } from "./blocks/app/states/skeleton-settings.svelte";
export { default as SkeletonStats } from "./blocks/app/states/skeleton-stats.svelte";
export { default as SkeletonTable } from "./blocks/app/states/skeleton-table.svelte";
export { default as SkeletonText } from "./blocks/app/states/skeleton-text.svelte";
export { default as SortMenu } from "./blocks/app/collection/sort-menu.svelte";
export { default as SortableHead } from "./blocks/app/table/sortable-head.svelte";
export { default as StatCard } from "./blocks/app/metrics/stat-card.svelte";
export { default as StatGrid } from "./blocks/app/metrics/stat-grid.svelte";
export { default as TablePagination } from "./blocks/app/table/table-pagination.svelte";
export { default as TableSkeletonRows } from "./blocks/app/table/table-skeleton-rows.svelte";
export { default as TableStateRow } from "./blocks/app/table/table-state-row.svelte";
export { default as UsageMeter } from "./blocks/app/metrics/usage-meter.svelte";
export { default as UserMenu } from "./blocks/app/account/user-menu.svelte";
export { default as VerifyEmail } from "./blocks/app/auth/verify-email.svelte";
export { default as WorkspaceSwitcher } from "./blocks/app/account/workspace-switcher.svelte";

export { default as ShaderMaterial } from "./components/shader-material.svelte";

// Hero stages and parts.
export { default as DiagonalHatch } from "./components/diagonal-hatch.svelte";
export { default as DotName } from "./components/dot-name.svelte";
export { default as MaterialGrid } from "./components/material-grid.svelte";
export { default as MaterialWash } from "./components/material-wash.svelte";
export { default as ProductWindow } from "./components/product-window.svelte";
export { default as DragWindow } from "./components/drag-window.svelte";
export { default as ResolveTitle } from "./components/resolve-title.svelte";
export { default as RingField } from "./components/ring-field.svelte";
export { default as SceneStage } from "./components/scene-stage.svelte";

// Heroes.
export { default as AccentTitle } from "./blocks/sections/accent-title.svelte";
export { default as BrandHero } from "./blocks/sections/brand-hero.svelte";
export { default as PersonalHero } from "./blocks/sections/personal-hero.svelte";
export type { PersonalSocial } from "./blocks/sections/personal-hero.svelte";
export { default as ProductHero } from "./blocks/sections/product-hero.svelte";

// Footer fields and parts.
export { default as DitherName } from "./components/dither-name.svelte";
export { default as FitWordmark } from "./components/fit-wordmark.svelte";
export { default as FooterColumns } from "./components/footer-columns.svelte";
export type { FooterColumn, FooterLink } from "./components/footer-columns.svelte";
export { default as FooterFamily } from "./components/footer-family.svelte";
export { default as FooterSocials } from "./components/footer-socials.svelte";
export { default as DotField } from "./components/dot-field.svelte";
export { default as HeatField } from "./components/heat-field.svelte";
export { default as PixelName } from "./components/pixel-name.svelte";
export { default as VoxelField } from "./components/voxel-field.svelte";
export { default as WashGlow } from "./components/wash-glow.svelte";

// Footers.
export { default as CalmFooter } from "./blocks/sections/calm-footer.svelte";
export { default as DotFooter } from "./blocks/sections/dot-footer.svelte";
export { default as GlyphFooter } from "./blocks/sections/glyph-footer.svelte";
export { default as HatchFooter } from "./blocks/sections/hatch-footer.svelte";
export { default as HeatFooter } from "./blocks/sections/heat-footer.svelte";
export { default as MaterialFooter } from "./blocks/sections/material-footer.svelte";
export { default as SiteFooter } from "./components/site-footer.svelte";
export { default as VoxelFooter } from "./blocks/sections/voxel-footer.svelte";

// Feature section parts.
export { default as AppMock } from "./components/app-mock.svelte";
export { default as CatalogCard } from "./components/catalog-card.svelte";
export type { CatalogItem } from "./components/catalog-card.svelte";
export { default as FlowSteps } from "./components/flow-steps.svelte";
export type { FlowStep } from "./components/flow-steps.svelte";
export { default as LineArt } from "./components/line-art.svelte";
export { default as PictureCard } from "./components/picture-card.svelte";
export type { PictureItem } from "./components/picture-card.svelte";
export { default as PictureGrid } from "./components/picture-grid.svelte";
export { default as ProjectRows } from "./components/project-rows.svelte";
export type { ProjectRow } from "./components/project-rows.svelte";
export { default as ReleaseLoop } from "./components/release-loop.svelte";
export type { ReleaseInstaller, ReleaseStep } from "./components/release-loop.svelte";
export { default as StatTile } from "./components/stat-tile.svelte";
export { default as StepCards } from "./components/step-cards.svelte";
export type { StepCard } from "./components/step-cards.svelte";
export { default as SurfaceTile } from "./components/surface-tile.svelte";
export { default as GlassBand } from "./blocks/sections/glass-band.svelte";
export { default as SectionHead } from "./blocks/sections/section-head.svelte";

// Feature sections.
export { default as CatalogSection } from "./blocks/sections/catalog-section.svelte";
export { default as PictureSection } from "./blocks/sections/picture-section.svelte";
export { default as ProjectsSection } from "./blocks/sections/projects-section.svelte";
export { default as StepsSection } from "./blocks/sections/steps-section.svelte";
export { default as SurfaceBento } from "./blocks/sections/surface-bento.svelte";
export type { Surface } from "./blocks/sections/surface-bento.svelte";
