// claude-multi.hmziq.xyz/privacy and /terms, word for word.

export type LegalBlock = ["p", string] | ["ul", string[]] | ["defs", [string, string][]] | ["caps", string]
export type LegalDoc = { title: string; updated: string; short: string; sections: [string, ...LegalBlock[]][] }

export const legal: Record<"privacy" | "terms", LegalDoc> = {
  "privacy": {
    "title": "Privacy policy",
    "updated": "2026-05-20",
    "short": "This page explains what this website (claude-multi.hmziq.xyz) collects, what it doesn't, and how to opt out. The CLI itself collects nothing.",
    "sections": [
      [
        "Scope",
        [
          "p",
          "This privacy policy covers the claude-multi marketing website hosted at claude-multi.hmziq.xyz."
        ],
        [
          "p",
          "It does not cover the claude-multi command-line tool itself. The CLI runs entirely on your machine, makes no outbound connections of its own, and collects no telemetry. Any data sent by the CLI is sent to the AI providers you configure (Anthropic, GLM, MiniMax, DeepSeek, etc.) and is governed by their privacy policies, not ours."
        ]
      ],
      [
        "Data we collect",
        [
          "p",
          "When you visit this website, Google Firebase Analytics records the following anonymized signals:"
        ],
        [
          "ul",
          [
            "The pages you visit on this site",
            "Approximate location (country and region, derived from IP, IP itself is not stored)",
            "Device type, operating system, and browser",
            "Referrer URL (the link you clicked to arrive here)",
            "Session duration and bounce events"
          ]
        ],
        [
          "p",
          "We use this data exclusively to understand which pages are useful, where readers come from, and whether to invest more time in particular sections of the docs."
        ]
      ],
      [
        "Data we don't collect",
        [
          "ul",
          [
            "Your name, email, or any personally identifiable information",
            "API keys, credentials, or any data from your local CLI",
            "The content of your conversations with any AI provider",
            "Your full IP address (Firebase truncates it for analytics)",
            "Cross-site behavior (we don't run third-party advertising trackers)"
          ]
        ]
      ],
      [
        "Cookies",
        [
          "p",
          "Firebase Analytics sets first-party cookies (typically _ga, _ga_*) to distinguish unique visitors and sessions. These cookies expire after up to two years. You can delete them at any time through your browser's cookie controls."
        ]
      ],
      [
        "Third-party services",
        [
          "p",
          "This site loads resources from a small number of external services:"
        ],
        [
          "defs",
          [
            [
              "Google Firebase Analytics",
              "Page and session analytics. See Firebase Privacy."
            ],
            [
              "Google Fonts",
              "We load Inter and JetBrains Mono from Google's CDN. See the Google Fonts privacy FAQ."
            ],
            [
              "GitHub",
              "External links to github.com redirect there; GitHub's privacy practices apply once you leave this site."
            ]
          ]
        ]
      ],
      [
        "Your rights",
        [
          "p",
          "Under GDPR (EU/EEA) and CCPA (California), you have the right to know what data is processed, to request deletion, and to object to processing. Because the data we collect is anonymized and not tied to any identifier we control, the practical exercise of these rights is browser-side: clear your cookies or block the analytics script and the data linking stops. If you believe data has been improperly collected, contact us using the channel below."
        ]
      ],
      [
        "How to opt out",
        [
          "ul",
          [
            "Use a privacy-focused browser (Brave, Firefox with Enhanced Tracking Protection)",
            "Browse in incognito / private mode",
            "Install uBlock Origin or a similar content blocker",
            "Use the official Google Analytics Opt-out Browser Add-on"
          ]
        ]
      ],
      [
        "Children's privacy",
        [
          "p",
          "This site is a developer tool for adults building software. It is not directed at children under 13, and we do not knowingly collect data from them."
        ]
      ],
      [
        "Changes to this policy",
        [
          "p",
          "If we change this policy materially, we'll update the \"last updated\" date at the top of this page. The full version history lives in the GitHub repository, so you can audit every change."
        ]
      ],
      [
        "Contact",
        [
          "p",
          "Questions, concerns, or takedown requests? Open an issue on GitHub. It's the fastest channel and it leaves a public record."
        ]
      ]
    ]
  },
  "terms": {
    "title": "Terms of use",
    "updated": "2026-05-20",
    "short": "claude-multi is free, open source under MIT, and provided as-is. You're responsible for how you use it and for any third-party services it connects to.",
    "sections": [
      [
        "Acceptance",
        [
          "p",
          "By installing or using the claude-multi command-line tool, or by browsing this website, you agree to these terms. If you do not agree, do not install or use the software, and please leave the site."
        ]
      ],
      [
        "The software",
        [
          "p",
          "claude-multi is released under the MIT License. The full license text is included in the LICENSE file in the source repository. In summary, you may:"
        ],
        [
          "ul",
          [
            "Use the software for any purpose, commercial or non-commercial",
            "Modify, fork, and redistribute it",
            "Bundle it into your own products",
            "Sell copies of it (with the MIT license preserved)"
          ]
        ],
        [
          "p",
          "The only obligation is that the copyright notice and license text travel with any copies or substantial portions you redistribute."
        ]
      ],
      [
        "No warranty",
        [
          "caps",
          "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT."
        ],
        [
          "p",
          "In plain English: this is a project maintained by an independent developer in their own time. We do our best to ship working, safe software, but we make no guarantees that it will work for your specific setup, that it will be free of bugs, or that it will be maintained indefinitely. Test in a non-critical environment first."
        ]
      ],
      [
        "Third-party providers",
        [
          "p",
          "claude-multi connects to AI services operated by other companies. We are not affiliated with, endorsed by, or partnered with any of these providers. Your usage of each provider is governed entirely by their own terms of service and acceptable use policies:"
        ],
        [
          "defs",
          [
            [
              "Anthropic",
              "anthropic.com/legal"
            ],
            [
              "Z.ai (GLM)",
              "z.ai"
            ],
            [
              "MiniMax",
              "minimax.io"
            ],
            [
              "DeepSeek",
              "deepseek.com"
            ]
          ]
        ]
      ],
      [
        "API costs",
        [
          "p",
          "Each AI provider charges separately for API usage. claude-multi does not bill you, does not see your API keys (they stay on your machine in per-instance config files), and does not receive any commission from the providers it interoperates with. Any cost you incur is between you and the provider whose API key you supply."
        ]
      ],
      [
        "Your responsibilities",
        [
          "p",
          "When using claude-multi, you agree to:"
        ],
        [
          "ul",
          [
            "Keep your API keys secure and not share them publicly",
            "Comply with the acceptable-use policies of every provider you configure",
            "Respect applicable laws and intellectual property rights in your jurisdiction",
            "Not use the software to generate or distribute illegal or harmful content",
            "Back up anything important. See the no-warranty clause above"
          ]
        ]
      ],
      [
        "Trademarks",
        [
          "p",
          "\"Claude\" and \"Claude Code\" are trademarks of Anthropic, PBC. \"GLM\" is a trademark of Zhipu AI. \"MiniMax\" and \"DeepSeek\" are trademarks of their respective owners. claude-multi is an independent open-source project. It is not affiliated with, endorsed by, or sponsored by any of these companies. We reference their names only to identify the third-party services the tool interoperates with."
        ]
      ],
      [
        "Website use",
        [
          "p",
          "This website (claude-multi.hmziq.xyz) is provided for informational purposes. You may not attempt to attack, scrape at abusive rates, reverse-engineer infrastructure, or otherwise interfere with the operation of the site. Reasonable use of public assets (RSS-style fetches, link previews) is welcome."
        ]
      ],
      [
        "Modifications",
        [
          "p",
          "We may update these terms from time to time. Material changes will be reflected by bumping the \"last updated\" date at the top. Because this page is open source, every revision is auditable in the git history. Continued use of the software or the site after a change constitutes acceptance of the updated terms."
        ]
      ],
      [
        "Governing law",
        [
          "p",
          "These terms are governed by the laws of the maintainer's primary jurisdiction. To the extent any provision is found unenforceable, the remainder remains in effect. Nothing in these terms limits any rights you may have under mandatory consumer protection laws in your local jurisdiction."
        ]
      ],
      [
        "Contact",
        [
          "p",
          "For legal or licensing questions, open an issue on GitHub or reach out via the channels on hmziq.rs."
        ]
      ]
    ]
  }
}
