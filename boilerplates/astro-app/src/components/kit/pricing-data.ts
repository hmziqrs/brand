import type { PricingBilling, PricingCompareData, PricingFaqData, PricingHeroData, PricingTier } from "$brand/blocks/site/pricing-types";

export type PricingExample = { hero: PricingHeroData; billing: PricingBilling; example: string; tiers: PricingTier[]; compare: PricingCompareData; faq: PricingFaqData };

export const studioPricing: PricingExample = {
  hero: {
    kicker: "› Pricing",
    title: "Priced in writing, before any code.",
    accent: "before any code.",
    lede: "Fixed projects or retainer, from one small studio across the stack. Every engagement starts with a written plan and a number we both sign."
  },
  billing: {
    label: "Commitment",
    options: ["Month to month", "A quarter, 10% off"]
  },
  example: "oxlabs.dev publishes no prices yet. Every number on this page is an example.",
  tiers: [
    {
      name: "Discovery",
      tab: "Discovery",
      for: "One week of focused work: calls with your team, a read of the codebase, a written plan we both sign off on.",
      art: "plan",
      amount: ["$2,400", "$2,400"],
      unit: ["fixed", "fixed"],
      short: ["fixed · about a week", "fixed · about a week"],
      note: ["About a week, paid up front", "About a week, paid up front"],
      cta: "Book a discovery week",
      act: "Book a week",
      items: ["Calls with your team", "A read of the codebase", "Architecture spec in your repo", "A fixed quote for the build"]
    },
    {
      name: "Fixed-scope project",
      tab: "Project",
      for: "A build with its scope and price agreed in writing. Production from week one, behind a flag.",
      art: "modules",
      amount: ["$12,000", "$12,000"],
      unit: ["from, per project", "from, per project"],
      short: ["from · per project", "from · per project"],
      note: ["Fixed price, paid in milestones", "Fixed price, paid in milestones"],
      cta: "Start a project",
      act: "Start",
      pick: true,
      badge: "Most projects",
      items: ["Discovery week included", "Friday demo, weekly deploy", "Real CI on day one", "A handover for whoever is next"]
    },
    {
      name: "Monthly retainer",
      tab: "Retainer",
      for: "A standing slice of the studio for a product that keeps moving: features, fixes, upgrades.",
      art: "queue",
      amount: ["$9,600", "$8,640"],
      unit: ["a month", "a month"],
      short: ["a month", "a month · billed quarterly"],
      note: ["Month to month, 30 days’ notice", "Billed quarterly, 10% off"],
      cta: "Talk about a retainer",
      act: "Talk to us",
      items: ["Up to 16 days a month", "One queue, in your order", "A written update every week", "Unused days roll over a month"]
    },
    {
      name: "Day rate",
      tab: "Day rate",
      for: "Single-discipline work with a clear edge: an audit, a migration, a stubborn bug.",
      art: "tools",
      amount: ["$650", "$585"],
      unit: ["a day", "a day"],
      short: ["a day", "a day · 10-day block"],
      note: ["Booked two days or more at a time", "Booked as a ten-day block, 10% off"],
      cta: "Book days",
      act: "Book days",
      items: ["Front end, back end, mobile or desktop", "Pairing with your team", "A written report at the end", "Two days at the least"]
    }
  ],
  compare: {
    title: "Compare the engagements",
    accent: "engagements",
    lede: "Same studio, same standards; what changes is how the work is priced and how long we stay.",
    corner: "Engagement",
    groups: [
      {
        name: "Price",
        rows: [
          ["How it’s priced", "Fixed", "Fixed, per scope", "Per month", "Per day"],
          ["When you pay", "Up front", "In milestones", "Monthly or quarterly", "Per block of days"],
          ["Shortest engagement", "1 week", "4 weeks", "1 month", "2 days"],
          ["When the scope changes", "A new quote", "A written change order", "Reorder the queue", "Book more days"]
        ]
      },
      {
        name: "What you get",
        rows: [
          ["A written plan we both sign", true, true, true, false],
          ["Code in your repo from the first commit", false, true, true, true],
          ["Real CI on day one", false, true, true, false],
          ["Friday demo, weekly deploy", false, true, true, false],
          ["Architecture spec in your repo", true, true, "When it changes", false],
          ["Handover doc and runbook", false, true, true, "A written report"]
        ]
      },
      {
        name: "How we work",
        rows: [
          ["The engineer on the kickoff writes the code", true, true, true, true],
          ["Disciplines", "All four", "Any mix", "Any mix", "One per block"],
          ["Updates", "Daily notes", "Weekly, in writing", "Weekly, in writing", "End-of-day notes"],
          ["Replies", "Within a working day", "Within a working day", "Within a working day", "Within a working day"]
        ]
      },
      {
        name: "After launch",
        rows: [
          ["Bugs we shipped, fixed free", false, "For 30 days", "Always", false],
          ["The codebase left better than we found it", true, true, true, true]
        ]
      }
    ],
    foot: "Prices and terms are examples. Every engagement starts with a written number we both sign."
  },
  faq: {
    title: "Good questions, short answers.",
    lede: "Anything else, write in. Every message gets a real reply from an engineer who writes code.",
    items: [
      {
        q: "Do you take single-discipline work, or only full-stack engagements?",
        a: "Both. oxlabs is one small studio across the stack, but you can engage just the front end, back end, mobile, or desktop — or thread several disciplines together into one build."
      },
      {
        q: "Why does every project start with a discovery week?",
        a: "Because a price without a plan is a guess. A week of calls, a read of the codebase and a written plan give us both a number we can hold to."
      },
      {
        q: "What happens when the scope changes mid-project?",
        a: "We write it down. A change order names what moves, what it costs and what it pushes back; nothing changes until you sign it."
      },
      {
        q: "What does \"production as default\" mean in practice?",
        a: "There is no throwaway prototype. Work lands in your repository behind a feature flag, on the same CI as everything else, from the first commit — so what you see in the demo is real software, not a staging-only mock."
      },
      {
        q: "How do I start a project?",
        a: "Email is the most direct line; GitHub and the socials work too. Every message gets a real reply from an engineer who writes code, usually within a business day."
      }
    ]
  }
};

export const productPricing: PricingExample = {
  hero: {
    kicker: "Pricing",
    title: "Free on your machine. Pro when it’s work.",
    accent: "Pro when it’s work.",
    lede: "torii.tools is a native request client for the desktop, built in Rust on GPUI. Everything that runs on your machine is free; pay for sync, tests in CI and a shared workspace."
  },
  billing: {
    label: "Billing",
    options: ["Monthly", "Yearly, 2 months free", "Lifetime"]
  },
  example: "torii.tools has no paid plans yet. Plans, prices and features here are examples.",
  tiers: [
    {
      name: "Free",
      tab: "Free",
      for: "For one person on one machine. Everything that runs locally, for good.",
      art: "laptop",
      amount: ["$0", "$0", "$0"],
      unit: ["forever", "forever", "forever"],
      short: ["forever", "forever", "forever"],
      note: ["No account, no card", "No account, no card", "No account, no card"],
      cta: "Download free",
      act: "Download",
      items: ["Unlimited requests and collections", "HTTP, GraphQL and WebSocket", "Environments kept on your machine", "Collections as plain files in Git"]
    },
    {
      name: "Pro",
      tab: "Pro",
      for: "For people who live in it: sync across machines, scripts and runs in CI.",
      art: "request",
      amount: ["$9", "$7.50", "$149"],
      unit: ["a month", "a month", "once"],
      short: ["a month", "a month · billed yearly", "once · one payment"],
      note: ["Billed monthly", "Billed yearly, $90", "One payment, updates for a year"],
      cta: "Start 14 days free",
      act: "Try Pro",
      pick: true,
      badge: "Most picked",
      items: ["Everything in Free", "Encrypted sync across machines", "Pre-request scripts and assertions", "Run collections from the CLI in CI"]
    },
    {
      name: "Team",
      tab: "Team",
      for: "For teams that share collections, review each other’s changes and need SSO.",
      art: "endpoints",
      amount: ["$15", "$12.50", "$299"],
      unit: ["per person / month", "per person / month", "once per seat"],
      short: ["per person / month", "per person / month · yearly", "once per seat"],
      note: ["Billed monthly", "Billed yearly, $150 per person", "One payment per seat, updates for a year"],
      cta: "Start a team trial",
      act: "Try Team",
      items: ["Everything in Pro", "Shared workspaces with roles", "Comments and review on changes", "SSO and an audit log"]
    }
  ],
  compare: {
    title: "Compare every plan",
    accent: "every plan",
    lede: "Every request type is free. The paid plans add what a person or a team needs around them.",
    corner: "Plan",
    groups: [
      {
        name: "Requests",
        rows: [
          ["HTTP and REST", true, true, true],
          ["GraphQL", true, true, true],
          ["WebSocket and server-sent events", true, true, true],
          ["gRPC", false, true, true],
          ["Request history", "30 days", "Unlimited", "Unlimited"]
        ]
      },
      {
        name: "Collections",
        rows: [
          ["Collections and requests", "Unlimited", "Unlimited", "Unlimited"],
          ["Plain files you can commit", true, true, true],
          ["Environments and secrets", "On your machine", "Synced, encrypted", "Shared, encrypted"],
          ["Sync across machines", false, "3 machines", "Unlimited"]
        ]
      },
      {
        name: "Testing",
        rows: [
          ["Collection runner in the app", true, true, true],
          ["Pre-request scripts", false, true, true],
          ["Assertions on responses", false, true, true],
          ["CLI runner for CI", false, true, true],
          ["Mock servers", false, "1", "Unlimited"]
        ]
      },
      {
        name: "Team",
        rows: [
          ["Shared workspaces", false, false, true],
          ["Roles and permissions", false, false, true],
          ["Comments and review", false, false, true],
          ["SSO (SAML, OIDC)", false, false, true],
          ["Audit log", false, false, "1 year"]
        ]
      },
      {
        name: "Support",
        rows: [
          ["Docs and GitHub issues", true, true, true],
          ["Email support", false, true, true],
          ["A reply within a working day", false, false, true]
        ]
      }
    ],
    foot: "Plans, prices and features are examples: torii.tools has no paid plans yet."
  },
  faq: {
    title: "Questions, answered.",
    lede: "Example answers for example plans; the real ones land with the first paid release.",
    items: [
      {
        q: "Is Free a trial?",
        a: "No. Free has no time limit and no account. Requests, collections and environments live on your machine as plain files."
      },
      {
        q: "Where does synced data live?",
        a: "Collections and environments are encrypted on your machine before they sync, and the key never leaves your devices."
      },
      {
        q: "What counts as a person on Team?",
        a: "Anyone who opens a shared workspace. A CI job that runs collections with the CLI does not need a seat."
      },
      {
        q: "Can I switch plans or cancel?",
        a: "Any time. Upgrades start now and are prorated; downgrades and cancellations take effect at the end of the period, and your local files stay yours."
      },
      {
        q: "What does a lifetime licence include?",
        a: "You keep the version you bought for good and get every update for a year. After that you can renew updates at a discount, or stay on what you have."
      },
      {
        q: "Do you discount for open source and students?",
        a: "Yes. Maintainers of open-source projects and students get Pro free; write in from the project’s repository or a school address."
      }
    ]
  }
};
