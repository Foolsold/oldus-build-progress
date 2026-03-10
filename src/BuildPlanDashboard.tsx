import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const phases = [
  {
    id: "p0",
    title: "P0 — Fix Foundations (Blocking)",
    status: "complete",
    completedDate: "2026-02-18",
    goldenSnapshot: "openclaw.json.golden-p0 ✅",
    items: [
      {
        id: "p0.0",
        title: "Fix sandbox→gateway auth",
        status: "done",
        description:
          "Root cause: user-level systemd service with stale token winning port race. Removed user-level service, verified system-level owns port 18789, API key rotated.",
        completedDate: "2026-02-18",
      },
      {
        id: "p0.1",
        title: "Config validation, service hardening & onboard wrapper",
        status: "done",
        description:
          "oc-config-validate, oc-onboard-safe wrapper, pre-commit hooks blocking secret patterns, user-level service detection, token single-source-of-truth (EnvironmentFile), rate limiting on gateway auth.",
        completedDate: "2026-02-18",
        subItems: [
          { text: "oc-config-validate script", done: true },
          { text: "oc-onboard-safe wrapper", done: true },
          { text: "Pre-commit hooks (secret patterns)", done: true },
          { text: "User-level systemd service detection", done: true },
          { text: "Token single-source-of-truth (.env only)", done: true },
          { text: "Gateway auth rate limiting", done: true },
          { text: "oc-add-secret credential helper", done: true },
          { text: "CREDENTIAL-RUNBOOK.md", done: true },
        ],
      },
      {
        id: "p0.2",
        title: "Pin versions and surface them in logs",
        status: "done",
        description:
          "Morning briefing cron logs OpenClaw version, Node version, config checksum, workspace commit SHA. .env.example committed.",
        completedDate: "2026-02-18",
      },
      {
        id: "p0.3",
        title: "Persistence, snapshots & restore",
        status: "done",
        description:
          "Persistence model documented. snapshot-state and restore-state scripts built. Never-wipe list established. First backup taken.",
        completedDate: "2026-02-18",
        subItems: [
          { text: "SYSTEM-STATE.md with persistence model", done: true },
          { text: "snapshot-state script (timestamped, keeps last 10)", done: true },
          { text: "restore-state script", done: true },
          { text: "Never-wipe list documented", done: true },
          { text: "First backup taken", done: true },
        ],
      },
    ],
  },
  {
    id: "p1",
    title: "P1 — Operational Quality",
    status: "complete",
    goldenSnapshot: "openclaw.json.golden.2026-02-20 ✅",
    items: [
      {
        id: "p1.0",
        title: "Restore sandbox mode: all with working write access",
        status: "done",
        description:
          "sandbox.mode set to 'all', workspaceAccess 'rw', capability-stripped container required chmod 777 on workspace dir. Write test confirmed working.",
        completedDate: "2026-02-18",
      },
      {
        id: "p1.1",
        title: "Morning briefing reliability",
        status: "done",
        description:
          "Cron created (7am weekdays, Europe/London). Model string fixed. Running.",
        completedDate: "2026-02-19",
        subItems: [
          { text: "Cron job created", done: true },
          { text: "Model string fixed (was wrong identifier)", done: true },
          { text: "Delivery confirmation check", done: true },
          { text: "Retry on failure + alternate channel", done: true },
          { text: "5 consecutive successful deliveries", done: true },
        ],
      },
      {
        id: "p1.2",
        title: "Cost guardrails and operational policy",
        status: "done",
        description:
          "Comprehensive operational guardrails document deployed: confirmation gates for destructive actions, pre-task cost estimation, data de-duplication, session hygiene, loop prevention, error classification.",
        completedDate: "2026-02-22",
        subItems: [
          { text: "Confirmation gates for money-spending/external actions", done: true },
          { text: "Pre-task token cost estimation with budget ceilings", done: true },
          { text: "Data de-duplication protocols", done: true },
          { text: "Session hygiene rules", done: true },
          { text: "Loop prevention with hard retry limits", done: true },
          { text: "Error classification policy", done: true },
          { text: "Guardrails document uploaded to workspace", done: true },
          { text: "Oldus instructed to internalise into memory", done: true },
        ],
      },
      {
        id: "p1.3",
        title: "Trace IDs and structured logging with redaction",
        status: "partial",
        description:
          "redactSensitive: 'tools' is enabled. Trace IDs and milestone logging not yet implemented. Low priority — hasn't blocked anything.",
        subItems: [
          { text: "redactSensitive: 'tools' configured", done: true },
          { text: "Trace ID per inbound event", done: false },
          { text: "Milestone logging with trace ID", done: false },
          { text: "Redaction covers exec output + stack traces", done: false },
        ],
      },
      {
        id: "p1.4",
        title: "GitHub credential security",
        status: "done",
        description:
          "PAT stored in .env via GITHUB_TOKEN. Injected into sandbox via docker.env interpolation. Full read/write from sandbox confirmed.",
        completedDate: "2026-02-19",
      },
      {
        id: "p1.5",
        title: "Retry queue for rate-limited sub-agents",
        status: "done",
        description:
          "v2 spec with 6 guardrails (flock locking, atomic writes, stale recovery, error classification, 14-day retention). Cron runs every 30 mins on Sonnet.",
        completedDate: "2026-02-19",
        subItems: [
          { text: "v2 spec incorporating Oldus's 6 risk mitigations", done: true },
          { text: "Flock-style locking + atomic .tmp-then-rename", done: true },
          { text: "Error classification (retriable vs fatal)", done: true },
          { text: "60-min stale task recovery", done: true },
          { text: "14-day retention + .jsonl archival", done: true },
          { text: "Cron installed (30-min cycle, Sonnet)", done: true },
        ],
      },
      {
        id: "p1.6",
        title: "Slack threading fix",
        status: "done",
        description:
          "replyToMode: 'off' in Slack channel config. Context continuity over channel tidiness.",
        completedDate: "2026-02-18",
      },
      {
        id: "p1.7",
        title: "Automated backups",
        status: "done",
        description:
          "Two-tier automated backup system. Daily compressed tar at 3am UTC (7-day retention). GitHub sync every 6 hours (memory + config). Both scripts tested and cron-installed.",
        completedDate: "2026-02-20",
        subItems: [
          { text: "backup-openclaw.sh — daily tar, keeps last 7", done: true },
          { text: "sync-memory-to-git.sh — 6-hour push to GitHub", done: true },
          { text: "Cron jobs installed under oldus user", done: true },
          { text: "Both scripts tested and confirmed working", done: true },
          { text: "Full workspace pushed to GitHub (Oldus-AI/oldus-config)", done: true },
        ],
      },
    ],
  },
  {
    id: "creds",
    title: "Credentials & Integrations (27 total)",
    status: "complete",
    goldenSnapshot: "27 integrations live ✅",
    items: [
      {
        id: "creds.0",
        title: "Sandbox credential interpolation",
        status: "done",
        description:
          "sandbox.docker.env supports ${VAR} from gateway .env. No broker scripts needed. 13+ app keys injected.",
        completedDate: "2026-02-20",
        subItems: [
          { text: "ElevenLabs API key", done: true },
          { text: "Moltbook API key", done: true },
          { text: "OpenAI API key", done: true },
          { text: "Missive API token", done: true },
          { text: "Prodigi sandbox key", done: true },
          { text: "Google AI / Gemini key", done: true },
          { text: "GitHub PAT (read/write/admin/create/delete)", done: true },
          { text: "Slack bot token", done: true },
          { text: "Telegram bot token", done: true },
          { text: "Discord bot token", done: true },
          { text: "Shopify admin token", done: true },
          { text: "Shopify client ID", done: true },
          { text: "ANTHROPIC_API_KEY (Claude Code headless only)", done: true },
        ],
      },
      {
        id: "creds.1",
        title: "Google OAuth — GA4, Gmail, Search Console, Ads, Sheets, Drive",
        status: "done",
        description:
          "Full Google suite. 13 GA4 properties. Gmail read/send/modify. Search Console (webmasters.readonly). Google Ads via oldus-ads GCP project. Sheets/Drive read/write.",
        completedDate: "2026-02-20",
      },
      {
        id: "creds.2",
        title: "Shopify — client credentials flow",
        status: "done",
        description:
          "Migrated from static tokens to Shopify client credentials grant with 24-hour token rotation. Headless channel for Storefront API.",
        completedDate: "2026-02-22",
      },
      {
        id: "creds.3",
        title: "Missive webhook integration",
        status: "done",
        description:
          "Event-driven webhook via Tailscale Funnel (HTTPS). Python listener queues @mentions, on-demand cron processes and replies.",
        completedDate: "2026-02-20",
      },
      {
        id: "creds.4",
        title: "NetSuite — M2M OAuth",
        status: "done",
        description:
          "Machine-to-machine OAuth fully authenticated against NetSuite sandbox (Day 26). Client credentials flow, token rotation, REST API access confirmed.",
        completedDate: "2026-03-09",
      },
      {
        id: "creds.5",
        title: "Zendesk — 11 brands",
        status: "done",
        description:
          "Zendesk API token integrated. Access across 11 Prodigi brands.",
        completedDate: "2026-02-25",
      },
      {
        id: "creds.6",
        title: "Jira",
        status: "done",
        description:
          "Jira API authenticated. Issue read/write confirmed working.",
        completedDate: "2026-03-02",
      },
      {
        id: "creds.7",
        title: "Vercel — CardStar V2 deployment",
        status: "done",
        description:
          "CardStar V2 deployed via Foolsold Vercel account. Auto-deploy on push to main. Live at cardstar-v2.vercel.app.",
        completedDate: "2026-03-02",
      },
      {
        id: "creds.8",
        title: "Sons Google Drive — service account",
        status: "done",
        description:
          "Service account created. Per-domain subfolder structure. Credentials at /etc/sons-oauth/ as read-only bind mount. Each Son domain has its own folder.",
        completedDate: "2026-03-09",
      },
      {
        id: "creds.9",
        title: "Denylist policy locked",
        status: "done",
        description:
          "Infrastructure keys only: gateway tokens, SSH keys, session tokens. ANTHROPIC_API_KEY exception for Claude Code headless. Everything else is app-level.",
        completedDate: "2026-02-22",
      },
    ],
  },
  {
    id: "sons",
    title: "Sons of Oldus — Multi-Agent Architecture",
    status: "in-progress",
    goldenSnapshot: "Agentbus repo on GitHub ✅ · Bulletin board live ✅",
    items: [
      {
        id: "sons.0",
        title: "Architecture & model hierarchy",
        status: "done",
        description:
          "3-tier model: Oldus (Opus, orchestrator) → Son (Sonnet, domain specialist) → Sub-agent (Haiku, mechanical). Task-level routing, not agent-level downgrading. Dispatch via agentId=, never model=.",
        completedDate: "2026-02-18",
      },
      {
        id: "sons.1",
        title: "Tiered memory architecture (MEMORY-HIERARCHY.md)",
        status: "done",
        description:
          "4-tier formalised: Hot (system prompt, ~14K), Warm (active-state.md + daily notes), Cold (CAPABILITIES.md, RULES.md, IDENTITY.md), Archive. MEMORY-HIERARCHY.md deployed Day 22.",
        completedDate: "2026-03-05",
      },
      {
        id: "sons.2",
        title: "Agent specs — Marketing family (4 agents)",
        status: "done",
        description:
          "Performance Marketing (DISABLED Day 17 — 30GB syslog), Content/SEO, CRM/Lifecycle, Social/Community. Each with trust progression, guardrails, bidirectional handoffs.",
        completedDate: "2026-02-14",
      },
      {
        id: "sons.3",
        title: "Agent specs — Business operations (7 agents)",
        status: "done",
        description:
          "Biz Dev, Networks, Procurement, Customer Support, Quality/Production, Pricing/Margin, Account Health. 5 deployment waves, externally-facing first.",
        completedDate: "2026-02-14",
      },
      {
        id: "sons.4",
        title: "Agentbus host infrastructure",
        status: "done",
        description:
          "setup_host.sh executed. 12 Linux users created, directory structures with ACLs, SQLite databases initialised.",
        completedDate: "2026-02-19",
      },
      {
        id: "sons.5",
        title: "Agentbus message envelope schema",
        status: "done",
        description:
          "12 envelope fields. Router-stamped sender (no spoofing). Hop count loop prevention. Intent enums control LLM trigger. JSON Schema + 9 fixtures + CI + validation script.",
        completedDate: "2026-02-19",
      },
      {
        id: "sons.6",
        title: "Bulletin board inter-agent comms",
        status: "done",
        description:
          "Architectural decision: Agentbus polling replaced for Prime-Son comms. sessions_spawn() for Prime→Son. Bulletin board directories for Son→Prime. Five domains: CS, Marketing, Finance, Engineering, Biz Dev — each with public/ and urgent/ subdirs.",
        completedDate: "2026-03-05",
      },
      {
        id: "sons.7",
        title: "Three-agent dispatch system",
        status: "done",
        description:
          "main (Opus 4.6, judgment), sonnet-worker (Sonnet 4.5, execution/code), haiku-worker (Haiku 4.5, mechanical). Dispatch via agentId= parameter. model= silently ignored (discovered Day 15).",
        completedDate: "2026-02-27",
      },
      {
        id: "sons.8",
        title: "Marketing Performance Son — DISABLED",
        status: "done",
        description:
          "First Son deployed Day 11, disabled Day 17. Root cause: chmod -R permission script running in tight loop generating 30GB+ syslog spam. Cleaned up. Lesson: monitor what Sons do to the host, not just what they report.",
        completedDate: "2026-02-28",
      },
      {
        id: "sons.9",
        title: "UX Son (ux-son) — registered",
        status: "done",
        description:
          "Agent ID: ux-son. Model: Sonnet 4.5. Registered Day 20. Awaiting first meaningful task dispatch.",
        completedDate: "2026-03-03",
      },
      {
        id: "sons.10",
        title: "CS Son — scoped for Kate",
        status: "in-progress",
        description:
          "Scoped for customer support (Kate's team). Not yet deployed. Scope document written.",
      },
      {
        id: "sons.11",
        title: "Finance Son — scoped for Marlini/Tom",
        status: "in-progress",
        description:
          "Scoped for finance automation (Marlini/Tom). 10-section non-technical spec. Trust progression phases defined. Not yet deployed.",
      },
      {
        id: "sons.12",
        title: "Son deployment playbook",
        status: "done",
        description:
          "deploy_son.sh with all 15 postmortem fixes. SON-DEPLOYMENT-POSTMORTEM.md. HARDENED-DEFAULTS.md updated. Each Son needs own token pair, own systemd service, own gateway port.",
        completedDate: "2026-02-23",
      },
    ],
  },
  {
    id: "p2",
    title: "P2 — Resilience & Testing",
    status: "in-progress",
    goldenSnapshot: "golden-full-2026-02-22-son-live.tar.gz ✅",
    items: [
      {
        id: "p2.0",
        title: "Model fallback and key rotation",
        status: "parked",
        description:
          "Multiple API keys, auto-rotation on 429, Opus → Sonnet degraded mode. Parked — haven't hit 429s in practice.",
      },
      {
        id: "p2.1",
        title: "Health checks (9 checks, Slack alerting)",
        status: "done",
        description:
          "health-watchdog.py with 9 checks: gateway, backup freshness, version pin, OAuth token, disk, DNS, workspace writable, recent activity. --dry-run and --json flags.",
        completedDate: "2026-02-22",
      },
      {
        id: "p2.2",
        title: "Session size watchdog + rotation crons",
        status: "done",
        description:
          "Session size watchdog every 30min (auto-rotate at 512KB). Four daily rotation crons: 00:00, 08:00, 12:00, 20:00 UTC. Deployed Day 25 after 1.6MB session caused 10-min gateway timeout.",
        completedDate: "2026-03-08",
      },
      {
        id: "p2.3",
        title: "CI-equivalent local validation",
        status: "done",
        description:
          "Makefile at workspace root. make test (config + crons + perms + git + snapshot), make reset, make status.",
        completedDate: "2026-02-23",
      },
      {
        id: "p2.4",
        title: "Disaster recovery runbook",
        status: "done",
        description:
          "8-phase runbook at docs/DISASTER-RECOVERY.md. Bare Ubuntu → running Oldus in 15-25 min. Covers system setup, golden tar restore, credentials, gateway, crons, validation, Son deployment.",
        completedDate: "2026-02-23",
      },
      {
        id: "p2.5",
        title: "Hardening scripts (Wave 1-3)",
        status: "done",
        description:
          "10 infrastructure hardening scripts: config validation, automated backup, service masking, version pinning, health watchdog, cost tracker, log rotation, OAuth refresh, hardened defaults, post-restart validation.",
        completedDate: "2026-02-22",
      },
      {
        id: "p2.6",
        title: "Workspace isolation (sub-agent safety)",
        status: "done",
        description:
          "Sub-agents destroyed workspace on 22 Feb. Protected dir live at /home/oldus/.openclaw/protected/ (root-owned). Sandbox dir at /workspace/sandbox/. 5 mandatory rules enforced.",
        completedDate: "2026-02-23",
      },
      {
        id: "p2.7",
        title: "OpenClaw upgrades",
        status: "done",
        description:
          "v2026.2.15 → v2026.2.22-2 (Day 12). v2026.2.22-2 → v2026.2.26 (Day 18). Key gains: 1M context beta, subagents spawn, per-channel model overrides, security hardening.",
        completedDate: "2026-03-01",
      },
      {
        id: "p2.8",
        title: "System prompt slimming",
        status: "done",
        description:
          "Day 25: system prompt slimmed from ~46K to ~14K tokens (70% reduction). RULES.md trimmed from 402 to 64 lines. Context set to 30K tokens, 15K reserve floor.",
        completedDate: "2026-03-08",
      },
      {
        id: "p2.9",
        title: "CI & Branch Protection",
        status: "in-progress",
        description:
          "CI workflows live on all code repos. Branch protection ruleset created (quality-gate status check required).",
        subItems: [
          { text: "readymades-framing-engine: CI (test) — green ✅", done: true },
          { text: "cardstar-v2: CI (lint/tsc) — green ✅", done: true },
          { text: "agentbus: CI (validate) — live ✅", done: true },
          { text: "Repo rulesets (quality-gate required status check)", done: true },
          { text: "Verification test: failing PR blocked", done: false },
        ],
      },
      {
        id: "p2.10",
        title: "Autonomous PR pipeline",
        status: "in-progress",
        description:
          "GitHub Action (auto-merge.yml) created Day 26. Copilot review → 3-state decision logic → auto-merge clean PRs or needs-fixes label. haiku-worker cron for fix cycles. Not yet fully deployed end-to-end.",
        subItems: [
          { text: "quality-gate GitHub Action built", done: true },
          { text: "auto-merge.yml for clean PRs", done: true },
          { text: "needs-fixes label for failing PRs", done: true },
          { text: "haiku-worker cron for fix cycles", done: true },
          { text: "End-to-end loop tested in production", done: false },
        ],
      },
      {
        id: "p2.11",
        title: "GOVERNANCE.md deployed",
        status: "done",
        description:
          "CONFIG > SCRIPT > RULE enforcement hierarchy. Skill approval requiring James's sign-off. Spend caps formalised. Budget pools: Prime $75/day, Sons $25 each/$50 pool. Deployed Day 23.",
        completedDate: "2026-03-06",
      },
    ],
  },
  {
    id: "p3",
    title: "P3 — Capabilities & Projects",
    status: "in-progress",
    goldenSnapshot: "Pending",
    items: [
      {
        id: "p3.0",
        title: "Claude Code integration",
        status: "done",
        description:
          "Claude Code 2.1.49 + Node.js v22 baked into Docker sandbox. ANTHROPIC_API_KEY injected (policy exception). Direct claude -p calls working. Brainstorming skill override at workspace skills/brainstorming/SKILL.md.",
        completedDate: "2026-02-23",
      },
      {
        id: "p3.1",
        title: "Multi-model code review stack",
        status: "done",
        description:
          "GPT (OpenAI) for large-context code analysis via direct API calls. Bypasses Sonnet rate limits. 3 project reviews completed (CardStar, Framing Engine, Operation Oldus).",
        completedDate: "2026-02-19",
      },
      {
        id: "p3.2",
        title: "Sonos integration",
        status: "done",
        description:
          "Hardened HTTP bridge service on host. Whitelisted commands + speaker IPs only. Accessible from sandbox via Docker bridge. Spotify SMAPI auth completed. 13 speakers controllable.",
        completedDate: "2026-02-22",
      },
      {
        id: "p3.3",
        title: "Ops Bridge — self-service host control",
        status: "done",
        description:
          "Running at 172.17.0.1:8100. Diagnostics, gateway restart, model switching, Son management. Systemd service, fixed sudo permissions, atomic config writes. Rule 27: always try ops bridge before asking James.",
        completedDate: "2026-03-02",
      },
      {
        id: "p3.4",
        title: "Budget System",
        status: "done",
        description:
          "SQLite ledger, session JSONL parser (reads real cost.total from agent session files), CLI tool (oldus-budget), 3 crons. Budget pools: Prime $75/day, Sons $50/day pool. 80%/100% alerting. Total spend to Date: ~$2,416.93.",
        completedDate: "2026-03-06",
      },
      {
        id: "p3.5",
        title: "Command Hub v3.1",
        status: "done",
        description:
          "Live at port 8080/8443 (Tailscale Funnel). Shows runs, costs, sessions, channels. Chart.js stacked cost chart by model (purple=Opus, amber=Sonnet, green=Haiku). 5-min refresh. Lobster favicon. v3.1 shipped Day 24.",
        completedDate: "2026-03-07",
      },
      {
        id: "p3.6",
        title: "Voice Interface — prototype",
        status: "in-progress",
        description:
          "Prototype built Day 24. React + ElevenLabs Conversational AI SDK, animated visualizer rings. Not yet deployed. HeyGen + Wispr Flow pipeline in progress.",
      },
      {
        id: "p3.7",
        title: "GitHub org migration",
        status: "done",
        description:
          "All repos migrated from Foolsold → Oldus-AI org (Day 23). All repos now at github.com/Oldus-AI.",
        completedDate: "2026-03-06",
      },
      {
        id: "p3.8",
        title: "Tailscale on server",
        status: "done",
        description:
          "Migrated from Mac to Hetzner server for 24/7 availability. Funnel for Missive webhooks + Command Hub. Subnet routing for home LAN (Sonos). CGNAT leak fixed.",
        completedDate: "2026-02-22",
      },
      {
        id: "p3.9",
        title: "Operation Oldus (Moltbook / T-shirt store)",
        status: "in-progress",
        description:
          "T-shirt store concept under Operation Oldus umbrella. Stripe + Prodigi fulfilment. SPEC.md exists. Not yet built.",
        subItems: [
          { text: "SPEC.md in operation-oldus repo", done: true },
          { text: "Store build (Stripe + Prodigi)", done: false },
          { text: "Deploy to Vercel", done: false },
        ],
      },
      {
        id: "p3.10",
        title: "Artist Army pipeline (magnoliabox.com)",
        status: "in-progress",
        description:
          "Automated content pipeline: 600 art pieces/month, <£30/month. Deliberately a cron pipeline, not an agent. Architecture designed Day 8. Not yet deployed.",
        subItems: [
          { text: "Architecture designed (weekly Sonnet + daily image gen)", done: true },
          { text: "Weekly Sonnet cron — trend analysis + prompt generation", done: false },
          { text: "Daily image generation via paid API", done: false },
          { text: "Cloudflare R2 storage + Shopify product creation", done: false },
        ],
      },
      {
        id: "p3.11",
        title: "Token Economics",
        status: "in-progress",
        description:
          "Build spec written. Ledger deployed (SQLite). Total spend ~$2,416.93. ~50% was avoidable waste (Day 6 $700, 20 days wrong model routing ~$132/day, context bloat). Day 3 principle → Day 23 implementation = 20 days avoidable spend.",
        subItems: [
          { text: "Spend spec written", done: true },
          { text: "SQLite ledger deployed", done: true },
          { text: "CLI tool (oldus-budget)", done: true },
          { text: "Waste audit — ~50% avoidable identified", done: true },
          { text: "Budget pools configured (Prime $75/day, Sons $50/day)", done: true },
          { text: "80%/100% alerting live", done: true },
        ],
      },
      {
        id: "p3.12",
        title: "Oldus In A Box — managed service",
        status: "in-progress",
        description:
          "Managed autonomous AI agent for non-technical business owners. Dedicated infrastructure per client, pre-configured Son library, trust progression model. Product spec v0.2 written.",
        subItems: [
          { text: "Product spec v0.2 (scoping draft) in repo", done: true },
          { text: "GitHub repo: Oldus-AI/oldus-in-a-box", done: true },
          { text: "Golden config template finalised", done: false },
          { text: "Automated deployment script", done: false },
          { text: "4 weeks stable internal running before first client", done: false },
        ],
      },
      {
        id: "p3.13",
        title: "MyType V2 — Custom Typography Prints",
        status: "not-started",
        description:
          "Rebuild of mytype.co — custom typography prints (foil & matte posters, framed). V1 source recovered: Next.js 14 editor + Shopify Dawn theme. Parked until CardStar V2 ships.",
        subItems: [
          { text: "V1 source downloaded and pushed to Oldus-AI/mytype-v2", done: true },
          { text: "V1 architecture understood (12 fonts, foil/matte, 5 sizes)", done: true },
          { text: "Port canvas renderer from CardStar", done: false },
          { text: "Port Shopify cart integration", done: false },
          { text: "Deploy to Vercel", done: false },
        ],
      },
    ],
  },
  {
    id: "cardstar",
    title: "CardStar V2 — Personalised Sports Cards",
    status: "complete",
    goldenSnapshot: "GitHub: Oldus-AI/cardstar-v2 · Live: cardstar-v2.vercel.app ✅",
    items: [
      {
        id: "cs.0",
        title: "Core build & templates (62 templates, 15 sports)",
        status: "done",
        description:
          "React 19 + Vite 7 + Tailwind 4. 62 templates across 15 sports categories. Canvas renderer with gradient parsing, text/image zones, flag/logo support. Build clean.",
        completedDate: "2026-02-20",
        subItems: [
          { text: "62 card templates with zone definitions", done: true },
          { text: "Canvas renderer (gradients, text, images, flags, logos)", done: true },
          { text: "Category-grouped home page with template previews", done: true },
          { text: "URL-based template routing (/cards/:category/:slug)", done: true },
          { text: "Dark theme with V1 pixel-accurate styling", done: true },
          { text: "15 sports categories", done: true },
        ],
      },
      {
        id: "cs.1",
        title: "V1 real data integration",
        status: "done",
        description:
          "S3 template thumbnails, 257 countries with flags from Firebase, teams grouped by league, 9-currency pricing.",
        completedDate: "2026-02-20",
      },
      {
        id: "cs.2",
        title: "Shopify cart integration",
        status: "done",
        description:
          "Product created with 6 size variants (A5-A0). Storefront API cart + checkout. Client credentials flow. Sticky CTA in editor.",
        completedDate: "2026-02-22",
      },
      {
        id: "cs.3",
        title: "Editor v2 — mobile preview + fullscreen lightbox",
        status: "done",
        description:
          "Full editor with mobile preview mode, fullscreen lightbox for card preview, sticky CTA. PR #16 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.4",
        title: "Player presets (16 players, 6 sports)",
        status: "done",
        description:
          "Pre-filled player data for 16 famous players across 6 sports (Messi, Ronaldo, Haaland, Hamilton and 12 others). PR #17 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.5",
        title: "Per-sport stat templates",
        status: "done",
        description:
          "Position-dependent stats customised per sport. Product detail page. PR #15 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.6",
        title: "Club logo wiring",
        status: "done",
        description:
          "Club logos wired into card editor. PR #20 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.7",
        title: "Social share with watermark",
        status: "done",
        description:
          "Social share functionality with watermark overlay. PR #19 merged Day 27.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.8",
        title: "Live on Vercel (cardstar-v2.vercel.app)",
        status: "done",
        description:
          "First deployed Day 19 (March 2). Day 27: 6 PRs merged, full feature set live. Auto-deploy on push to main via Foolsold Vercel account.",
        completedDate: "2026-03-10",
      },
      {
        id: "cs.9",
        title: "Background removal & print rendering",
        status: "not-started",
        description:
          "rembg service running on port 8100 (done). Need to wire into editor photo upload flow. Server-side Cairo renderer for print-quality PDF output.",
        subItems: [
          { text: "rembg service live on port 8100", done: true },
          { text: "Wire rembg into editor photo upload flow", done: false },
          { text: "Server-side Cairo print renderer", done: false },
        ],
      },
      {
        id: "cs.10",
        title: "Bulk/team order builder",
        status: "not-started",
        description:
          "Mode A: wizard for team orders (pick template, upload roster). Mode B: CSV upload for bulk. Key differentiator vs CardsPlug.",
      },
      {
        id: "cs.11",
        title: "Multi-currency expansion",
        status: "not-started",
        description:
          "9 currencies wired in from V1. Tier 1 expansion: SEK, NOK, PLN. Geo-IP detection, currency selector in nav/footer.",
      },
    ],
  },
  {
    id: "artplatform",
    title: "ArtPlatform / Book Builder",
    status: "in-progress",
    goldenSnapshot: "GitHub: Oldus-AI/artplatform · PR #4 merged ✅",
    items: [
      {
        id: "ap.0",
        title: "Phase 1 — Foundation (merged PR #4)",
        status: "done",
        description:
          "Built overnight Day 20. 63 layouts across 6 categories, Constraints Service, Layout Compiler, three-payload architecture (Template + Project → Resolved). SpreadStrip, SpreadCanvas, LayoutPicker components. ARCHITECTURE.md for Mike/Minerva onboarding. ~35K lines of code.",
        completedDate: "2026-03-04",
        subItems: [
          { text: "layouts-v2.ts — 63 layouts, 6 categories", done: true },
          { text: "product-catalog.ts — 5 products, 24 SKUs", done: true },
          { text: "spread-types.ts — spread-based book structure", done: true },
          { text: "layout-compiler.ts — three-payload resolution", done: true },
          { text: "SpreadStrip, SpreadCanvas, LayoutPicker components", done: true },
          { text: "ContextMenu, ZoomControl components", done: true },
          { text: "Constraints Service", done: true },
          { text: "PDF/X-4 research completed", done: true },
          { text: "ARCHITECTURE.md for Minerva/Mike onboarding", done: true },
          { text: "PR #4 merged to main", done: true },
        ],
      },
      {
        id: "ap.1",
        title: "Phase 1 extended (Phases 27-32 merged)",
        status: "done",
        description:
          "Day 21: checkout flow, Prodigi API integration, auto-layout, analytics, templates, validation, text editing. ~35K total lines across 35 phases merged.",
        completedDate: "2026-03-04",
      },
      {
        id: "ap.2",
        title: "Phase 2 — In progress",
        status: "in-progress",
        description:
          "Zustand state management, layout resolver, slot assignment engine. Collaboration with Minerva (Mike's agent). Editor stability on Vercel (ThemeProvider crash resolved).",
        subItems: [
          { text: "Zustand store architecture", done: false },
          { text: "Layout resolver (slot → image matching)", done: false },
          { text: "Slot assignment engine", done: false },
          { text: "Vercel deployment stability", done: true },
        ],
      },
    ],
  },
  {
    id: "readymades",
    title: "Readymades Framing Engine",
    status: "in-progress",
    goldenSnapshot: "GitHub: Oldus-AI/readymades-framing-engine",
    items: [
      {
        id: "rf.0",
        title: "Shopify Remix app foundation",
        status: "done",
        description:
          "Shopify Remix app structure. CI live (test workflow green). Branch protection in place.",
        completedDate: "2026-02-23",
      },
      {
        id: "rf.1",
        title: "Airtable data integration",
        status: "done",
        description:
          "Airtable database: 78 mouldings, 348 products, 738 price points in appitUEXCDj8XiE46. Data layer wired in.",
        completedDate: "2026-02-25",
      },
      {
        id: "rf.2",
        title: "Configurator UI, pricing engine, SKU generator",
        status: "in-progress",
        description:
          "Product picker, pricing engine, preview renderer, SKU generator spec solid from Day 5. Build in progress.",
        subItems: [
          { text: "Product picker UI", done: false },
          { text: "Pricing engine (78 mouldings × 348 products)", done: false },
          { text: "Preview renderer", done: false },
          { text: "SKU generator", done: false },
          { text: "Cart injection into Shopify", done: false },
        ],
      },
      {
        id: "rf.3",
        title: "Tests",
        status: "in-progress",
        description:
          "6 tests total. 2/6 failing as of Day 27. Not yet live.",
        subItems: [
          { text: "4/6 tests passing", done: true },
          { text: "2/6 tests failing — fix in progress", done: false },
        ],
      },
    ],
  },
  {
    id: "ops",
    title: "Operational Infrastructure",
    status: "in-progress",
    goldenSnapshot: "golden-full-2026-02-22-son-live.tar.gz ✅",
    items: [
      {
        id: "ops.0",
        title: "Missive integration (webhook-driven)",
        status: "done",
        description:
          "Event-driven webhook on port 8099 via Tailscale Funnel. Queue processor built. Cron every 5min. Reconcile script for self-healing drift detection.",
        completedDate: "2026-02-23",
      },
      {
        id: "ops.1",
        title: "Golden backup system",
        status: "done",
        description:
          "daily-backup.sh (7-day retention, 3× daily), snapshot-state, golden checkpoints, GitHub sync. workspace-sync.sh for full workspace git sync.",
        completedDate: "2026-02-22",
      },
      {
        id: "ops.2",
        title: "Cron jobs inventory",
        status: "done",
        description:
          "10+ active crons covering health-check, retry-queue, memory-maintenance, morning-briefing, missive-queue, gateway watchdog, budget parser, session watchdog, session rotation, security audit, git auto-sync, syslog cap, capability audit.",
        completedDate: "2026-03-07",
      },
      {
        id: "ops.3",
        title: "Build progress tracker (this dashboard)",
        status: "done",
        description:
          "React dashboard tracking all build progress. GitHub repo: Oldus-AI/oldus-build-progress. GitHub Actions CI/CD for auto-deploy to Pages on push.",
        completedDate: "2026-02-22",
      },
      {
        id: "ops.4",
        title: "Repo hygiene — org migration",
        status: "done",
        description:
          "Repos migrated from Foolsold to Oldus-AI org Day 23. GitHub PAT upgraded with admin/create/delete perms. Deletion requires James's explicit written approval.",
        completedDate: "2026-03-06",
      },
      {
        id: "ops.5",
        title: "Google Sheets/Docs API",
        status: "in-progress",
        description:
          "Scopes granted in OAuth token. Drive confirmed working. Sheets/Docs APIs pending GCP enablement.",
        subItems: [
          { text: "OAuth scopes for Drive, Sheets, Docs", done: true },
          { text: "Drive API working", done: true },
          { text: "Sheets API enabled in GCP", done: false },
          { text: "Docs API enabled in GCP", done: false },
        ],
      },
      {
        id: "ops.6",
        title: "OpenClaw intro + journey presentation",
        status: "done",
        description:
          "13-slide non-technical intro. Journey timeline slides (Days 1-25, honest story with wins, failures, costs). Built Day 25.",
        completedDate: "2026-03-08",
      },
    ],
  },
];

const milestones = [
  { day: 0, date: "2026-02-11", label: "Day 0", event: "VPS provisioned. Hetzner ARM Helsinki. $300 Anthropic credits loaded. Name decided: Oldus." },
  { day: 1, date: "2026-02-12", label: "Day 1", event: "First session. Telegram live. Opus 4.6. Infrastructure briefed. CardStar V2 mentioned for first time." },
  { day: 6, date: "2026-02-17", label: "Day 6", event: "⚠️ $700 day. openclaw config set replaced entire config. Rule: NEVER use config set. Always edit JSON directly." },
  { day: 7, date: "2026-02-18", label: "Day 7", event: "P0 complete. Golden backup system. Sons architecture designed. Gateway auth hardened." },
  { day: 8, date: "2026-02-19", label: "Day 8", event: "All-hands presentation. Agentbus infrastructure live. 12 Linux users. Retry queue + CI live." },
  { day: 9, date: "2026-02-20", label: "Day 9", event: "CardStar V2 first build: 62 templates, canvas renderer. Rembg service on port 8100. Sonos SMAPI." },
  { day: 11, date: "2026-02-22", label: "Day 11", event: "Marketing Son first deployed. Agentbus ACL debugging. Workspace isolation directive created after sub-agent incident." },
  { day: 12, date: "2026-02-23", label: "Day 12", event: "P2 complete. DR runbook. Makefile. Claude Code integration. Sub-agent model bug fixed (auth.json perms)." },
  { day: 13, date: "2026-02-24", label: "Day 13", event: "Kate CS demo. Server upgraded: 4GB → 16GB RAM. First external demo." },
  { day: 14, date: "2026-02-25", label: "Day 14", event: "Memory v2: 88% token reduction. CAPABILITIES.md created. Sonnet set as default model." },
  { day: 15, date: "2026-02-26", label: "Day 15", event: "Discovery: sessions_spawn model= silently ignored. Model routing at agent level only." },
  { day: 16, date: "2026-02-27", label: "Day 16", event: "Three-agent dispatch implemented: main (Opus), sonnet-worker (Sonnet), haiku-worker (Haiku). Via agentId=." },
  { day: 17, date: "2026-02-28", label: "Day 17", event: "Marketing Son disabled — 30GB syslog from chmod -R loop. Command Hub scoped." },
  { day: 18, date: "2026-03-01", label: "Day 18", event: "OpenClaw upgraded to v2026.2.26. Gateway isolation spec. MyType V2 source recovered." },
  { day: 19, date: "2026-03-02", label: "Day 19", event: "🚀 Ops Bridge live (172.17.0.1:8100). CardStar V2 first public deploy on Vercel. Jira + NetSuite sandbox wired." },
  { day: 20, date: "2026-03-03", label: "Day 20", event: "🚀 ArtPlatform foundation built overnight (~35K lines). ux-son registered. Capability amnesia rule created." },
  { day: 21, date: "2026-03-04", label: "Day 21", event: "ArtPlatform phases 27-32 merged (35 total). Vercel crash root-caused (ThemeProvider). Git permissions fixed." },
  { day: 22, date: "2026-03-05", label: "Day 22", event: "Agentbus reality check — silent routing failure found. Bulletin board deployed. Finance Son scoped. MEMORY-HIERARCHY.md." },
  { day: 23, date: "2026-03-06", label: "Day 23", event: "🚀 Budget system live. GOVERNANCE.md. GitHub org migrated: Foolsold → Oldus-AI. workspace-sync.sh. contextTokens bug fixed." },
  { day: 24, date: "2026-03-07", label: "Day 24", event: "🚀 Command Hub v3.1 shipped (Chart.js cost chart, lobster favicon). Voice prototype built. Sub-agent reliability patterns documented." },
  { day: 25, date: "2026-03-08", label: "Day 25", event: "⚠️ Amnesia crisis: 1.6MB session caused 10-min timeout. Session watchdog + 4× daily rotation deployed. System prompt: 46K → 14K tokens." },
  { day: 26, date: "2026-03-09", label: "Day 26", event: "🚀 Autonomous PR pipeline shipped (auto-merge.yml). NetSuite M2M OAuth complete. Sons Google Drive. Repo rulesets." },
  { day: 27, date: "2026-03-10", label: "Day 27", event: "🚀 CardStar V2 complete: 6 PRs merged, 62 templates, 15 sports, player presets, club logos, social share. Live on Vercel." },
];

const automationCrons = [
  { schedule: "Every 5 min", name: "Gateway watchdog", description: "Checks gateway health, restarts if down. Alerts Slack." },
  { schedule: "Every 5 min", name: "Budget parser", description: "Parses session JSONL files, updates SQLite ledger, checks pool thresholds." },
  { schedule: "Every 5 min", name: "Missive queue processor", description: "Processes queued @mentions from Missive webhook, replies via API." },
  { schedule: "Every 30 min", name: "Session size watchdog", description: "Checks active session file size. Auto-rotates at 512KB to prevent context overflow." },
  { schedule: "Every 30 min", name: "Retry queue processor", description: "Processes failed sub-agent tasks from retry queue. Error classification, 14-day retention." },
  { schedule: "Hourly", name: "Syslog size cap", description: "Truncates syslog if over threshold. Prevents 30GB+ accumulation incidents." },
  { schedule: "4× daily (00:00/08:00/12:00/20:00 UTC)", name: "Session rotation", description: "Proactive session rotation to keep context lean. Prevents 1.6MB session crash-loop." },
  { schedule: "3× daily", name: "Full backup", description: "Compressed tar of workspace + config. 7-day retention. Separate from GitHub sync." },
  { schedule: "Daily 2am", name: "Security audit", description: "Checks permissions, service states, firewall rules. Alerts on anomalies." },
  { schedule: "Daily 3:15am", name: "Git auto-sync", description: "workspace-sync.sh: git add -A, commit, push. Ensures all new files captured (not just config-tracked/)." },
  { schedule: "Daily 4am", name: "Memory maintenance", description: "Prunes MEMORY.md if over threshold (9,500 chars). Moves cold items to archive." },
  { schedule: "Weekly Mon 6am", name: "Capability audit", description: "Checks CAPABILITIES.md against actual integrations. Flags drift." },
  { schedule: "On-demand", name: "Missive webhook", description: "Python listener on port 8099 (systemd, 24/7). Queues @mentions for processing." },
  { schedule: "On-demand", name: "Ops bridge", description: "HTTP API at 172.17.0.1:8100. Diagnostics, gateway restart, model switching, Son management." },
];

const agents = [
  { id: "main", model: "Claude Opus 4.6", status: "active", role: "Orchestrator (Oldus Prime). Judgment, planning, coordination. Primary conversation channel." },
  { id: "sonnet-worker", model: "Claude Sonnet 4.5", status: "active", role: "Execution tasks: coding, analysis, writing, Claude Code dispatch." },
  { id: "haiku-worker", model: "Claude Haiku 4.5", status: "active", role: "Mechanical tasks: extraction, formatting, triage, cron processing." },
  { id: "ux-son", model: "Claude Sonnet 4.5", status: "registered", role: "UX domain specialist. Registered Day 20. Awaiting first task." },
  { id: "cs-son", model: "TBD", status: "scoped", role: "Customer support specialist for Kate's team. Scoped, not deployed." },
  { id: "finance-son", model: "TBD", status: "scoped", role: "Finance automation for Marlini/Tom. 10-section spec written. Not deployed." },
  { id: "marketing-son", model: "Sonnet 4.5", status: "disabled", role: "Marketing Performance. DISABLED Day 17 — chmod -R loop generated 30GB+ syslog." },
];

const governanceDocs = [
  { name: "IDENTITY.md", tier: "Tier 1", description: "Who Oldus is, who James is, personality, communication style. PERMANENT — never pruned." },
  { name: "CAPABILITIES.md", tier: "Tier 1", description: "Complete manifest of APIs, credentials, tools, models. Most important file." },
  { name: "RULES.md", tier: "Tier 1", description: "Operational rules derived from incidents. 64 rules (trimmed from 402). Not optional." },
  { name: "GOVERNANCE.md", tier: "Tier 1", description: "CONFIG > SCRIPT > RULE enforcement hierarchy. Skill approval. Spend caps. Budget pools. Created Day 23." },
  { name: "MEMORY.md", tier: "Tier 1", description: "People, active projects, current state, blockers. Max ~9,500 chars. Pruned by maintenance cron." },
  { name: "AGENTS.md", tier: "Tier 1", description: "Agent inventory, dispatch rules, session start/end procedures." },
  { name: "MEMORY-HIERARCHY.md", tier: "Tier 2", description: "4-tier memory system (Hot/Warm/Cold/Archive). Rotation rules. Created Day 22." },
  { name: "DOCUMENT-RETENTION.md", tier: "Tier 2", description: "What gets kept, for how long, in what format. Pruning rules." },
  { name: "COLLABORATION.md", tier: "Tier 2", description: "How Oldus works with Minerva (Mike's agent) on ArtPlatform and shared projects." },
  { name: "SPEC-DECOMPOSITION.md", tier: "Tier 2", description: "How to break large specs into phased deliverables. ArtPlatform build pattern." },
  { name: "BUDGET-SPEC.md", tier: "Tier 2", description: "Budget system architecture. Pool definitions, alerting thresholds, ledger schema." },
  { name: "ENGINEERING.md", tier: "Tier 2", description: "Engineering rules from rebase conflict failures (Day 27). Worker file manifest requirements." },
];

const integrations = [
  { name: "Telegram", category: "Comms", status: "live" },
  { name: "Slack", category: "Comms", status: "live" },
  { name: "Missive (webhook)", category: "Comms", status: "live" },
  { name: "Gmail (read/send)", category: "Comms", status: "live" },
  { name: "Google Analytics (13 properties)", category: "Analytics", status: "live" },
  { name: "Google Search Console", category: "Analytics", status: "live" },
  { name: "Google Ads", category: "Marketing", status: "live" },
  { name: "Google Sheets/Drive", category: "Data", status: "live" },
  { name: "Shopify (client credentials)", category: "E-commerce", status: "live" },
  { name: "Prodigi API", category: "Fulfilment", status: "live" },
  { name: "GitHub (admin PAT)", category: "Dev", status: "live" },
  { name: "Claude Code (headless)", category: "Dev", status: "live" },
  { name: "OpenAI API", category: "AI", status: "live" },
  { name: "ElevenLabs", category: "AI", status: "live" },
  { name: "Gemini / Google AI", category: "AI", status: "live" },
  { name: "Tailscale (Funnel)", category: "Infra", status: "live" },
  { name: "Sonos (HTTP bridge)", category: "IoT", status: "live" },
  { name: "Airtable", category: "Data", status: "live" },
  { name: "NetSuite (M2M OAuth)", category: "ERP", status: "live" },
  { name: "Zendesk (11 brands)", category: "Support", status: "live" },
  { name: "Jira", category: "Dev", status: "live" },
  { name: "Vercel", category: "Deploy", status: "live" },
  { name: "Sons Google Drive (service account)", category: "Data", status: "live" },
  { name: "Command Hub dashboard", category: "Infra", status: "live" },
  { name: "Ops Bridge (172.17.0.1:8100)", category: "Infra", status: "live" },
  { name: "Budget alerter", category: "Infra", status: "live" },
  { name: "Agentbus SQLite", category: "Infra", status: "live" },
];

const securityItems = [
  { text: "Running as dedicated 'oldus' user (not root)", done: true },
  { text: "File permissions locked (600/700)", done: true },
  { text: "Docker sandboxing — mode: all, workspaceAccess: rw", done: true },
  { text: "Gateway auth with rate limiting", done: true },
  { text: "mDNS discovery disabled", done: true },
  { text: "SOUL.md security rules", done: true },
  { text: "Log redaction — redactSensitive: tools", done: true },
  { text: "Pre-commit hooks blocking secrets", done: true },
  { text: "Credential single source of truth (.env)", done: true },
  { text: "User-level systemd service masked", done: true },
  { text: "UFW firewall active", done: true },
  { text: "SSH hardened (key-only)", done: true },
  { text: "GitHub PAT in .env + sandbox interpolation", done: true },
  { text: "Security audit — 0 critical, 0 warn", done: true },
  { text: "Denylist policy locked (infra keys only, ANTHROPIC_API_KEY exception for Claude Code)", done: true },
  { text: "27 app-level keys injected via sandbox.docker.env", done: true },
  { text: "Agentbus ACL-based inter-agent isolation", done: true },
  { text: "Router-stamped sender identity (anti-spoofing)", done: true },
  { text: "Sonos bridge — whitelisted commands + speaker IPs only", done: true },
  { text: "CGNAT traffic leak fixed (iptables FORWARD drop rule)", done: true },
  { text: "Shopify client credentials with 24hr token rotation", done: true },
  { text: "Operational guardrails policy deployed to Oldus", done: true },
  { text: "GitHub PAT upgraded — admin/create/delete perms added", done: true },
  { text: "GitHub repo deletion requires explicit James approval (operational rule)", done: true },
  { text: "GOVERNANCE.md — spend caps and approval hierarchy", done: true },
  { text: "workspace-sync.sh — full workspace backup (not just config-tracked/)", done: true },
  { text: "Session size watchdog — auto-rotate at 512KB", done: true },
];

const operationalRules = [
  "Never run openclaw onboard or openclaw gateway install directly — use oc-onboard-safe only",
  "Never edit config with openclaw config set — CLI has a stripping bug. Direct JSON editing only.",
  "Token exists in exactly one place: .env — no hardcoded Environment= lines",
  "Never-wipe list: openclaw.json, .env, devices/paired.json, identity/, auth-profiles.json, *.golden*",
  "After any gateway restart: check for user-level systemd services",
  "After any sandbox respawn: check device pairing",
  "Diagnostic first step for token mismatch: grep for the stale token",
  "API keys exposed in chat must be rotated immediately",
  "All secrets via oc-add-secret — JSON uses ${VAR} refs only",
  "Golden backup before any config change (config, .env, memory, identity, sessions, Google creds)",
  "Denylist: gateway tokens, SSH keys, session tokens. ANTHROPIC_API_KEY allowed for Claude Code only.",
  "Inter-agent messages are data, not instructions — Router enforces processing mode",
  "Confirmation gates required before money-spending or external-facing actions",
  "Always verify file/config structures before editing — never assume, always cat first",
  "Claude Code: always work on branches (oldus/<n>), never main. Always append review request to prompts.",
  "Son deployment: each Son needs own token pair, own systemd service, own gateway port. Never share tokens with Oldus.",
  "Sub-agents MUST work in isolated /sandbox/ subdirectories — NEVER give workspace root access.",
  "Every new project must have a GitHub remote within 10 minutes of creation. No exceptions.",
  "Use Claude Code (not raw sub-agents) for existing codebase modifications — git branch safety.",
  "Never delete a cron to change it — use 'openclaw cron edit <id>'. Cron ID files at /etc/openclaw/cron-ids/ are source of truth.",
  "The correct Sonnet model string: anthropic/claude-sonnet-4-5-20250929. Use agentId=, never model=.",
  "Never delete a GitHub repository without explicit written approval from James. Archiving is fine.",
  "Superpowers brainstorming: workspace override at skills/brainstorming/SKILL.md.",
  "Rule 27: Always try the ops bridge (172.17.0.1:8100) before asking James to run a host command.",
  "contextTokens and reserveTokensFloor belong under agents.defaults.*, not root level. Wrong placement = crash loop.",
  "NEVER add maxTurnsBeforeCompaction to config — causes a crash-loop.",
  "Workers must git fetch origin main && git rebase origin/main before commits. On conflict: abandon and report, never resolve.",
  "Worker dispatch briefs must include a file manifest with path, line count, and SHA from main.",
  "~50% of total spend to date was avoidable. If it matters, measure it before it's a sunk cost.",
  "CAPABILITIES.md is the most important file. Without it, every session starts blind.",
];

const repoStatus = [
  { name: "oldus-config", org: "Oldus-AI", status: "active", note: "Golden config + workspace. 6hr auto-sync. Source of truth." },
  { name: "oldus-ops", org: "Oldus-AI", status: "active", note: "Validation scripts, golden backups, DR runbook." },
  { name: "agentbus", org: "Oldus-AI", status: "active", note: "Router, inbox handler, deploy configs. All branches merged to main." },
  { name: "cardstar-v2", org: "Oldus-AI", status: "active", note: "62 templates, 15 sports, full editor. Live on Vercel ✅" },
  { name: "readymades-framing-engine", org: "Oldus-AI", status: "active", note: "Shopify Remix app. CI live. 2/6 tests failing." },
  { name: "oldus-build-progress", org: "Oldus-AI", status: "active", note: "This dashboard. GitHub Pages auto-deploy via Actions." },
  { name: "artplatform", org: "Oldus-AI", status: "active", note: "35K+ lines, 63 layouts. Phase 2 in progress. Minerva collaboration." },
  { name: "sons-of-oldus", org: "Oldus-AI", status: "active", note: "Agent architecture specs. Deploy scripts. Hardened defaults." },
  { name: "mytype-v2", org: "Oldus-AI", status: "waiting", note: "V1 source recovered. Parked until CardStar fully ships." },
  { name: "oldus-in-a-box", org: "Oldus-AI", status: "waiting", note: "Product spec v0.2. James's personal venture." },
  { name: "operation-oldus", org: "Oldus-AI", status: "waiting", note: "SPEC.md only. T-shirt store + Moltbook presence." },
  { name: "artist-army", org: "Oldus-AI", status: "waiting", note: "Architecture designed. Pipeline not yet deployed." },
  { name: "mount-craft-studio", org: "Foolsold", status: "archived", note: "Read-only reference. Lovable PoC for framing engine." },
  { name: "cardstar-frontend", org: "Foolsold", status: "archived", note: "V1 Angular app. Superseded by cardstar-v2." },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    done: { bg: "#059669", text: "white", label: "DONE" },
    "in-progress": { bg: "#D97706", text: "white", label: "IN PROGRESS" },
    waiting: { bg: "#6366F1", text: "white", label: "WAITING" },
    partial: { bg: "#8B5CF6", text: "white", label: "PARTIAL" },
    "not-started": { bg: "#6B7280", text: "white", label: "NOT STARTED" },
    complete: { bg: "#059669", text: "white", label: "COMPLETE" },
    parked: { bg: "#9CA3AF", text: "white", label: "PARKED" },
    active: { bg: "#059669", text: "white", label: "ACTIVE" },
    registered: { bg: "#6366F1", text: "white", label: "REGISTERED" },
    scoped: { bg: "#D97706", text: "white", label: "SCOPED" },
    disabled: { bg: "#EF4444", text: "white", label: "DISABLED" },
    live: { bg: "#059669", text: "white", label: "LIVE" },
    archived: { bg: "#9CA3AF", text: "white", label: "ARCHIVED" },
  };
  const s = styles[status] || styles["not-started"];
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.text,
        padding: "2px 10px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.5px",
        textTransform: "uppercase" as const,
        whiteSpace: "nowrap" as const,
      }}
    >
      {s.label}
    </span>
  );
};

const CheckItem = ({ text, done, note }: { text: string; done: boolean; note?: string }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "3px 0" }}>
    <span style={{ fontSize: "16px", lineHeight: "1.4", flexShrink: 0 }}>{done ? "✅" : "⬜"}</span>
    <span style={{ fontSize: "13px", lineHeight: "1.5", color: done ? "#374151" : "#6B7280" }}>
      {text}
      {note && <span style={{ color: "#9CA3AF", fontStyle: "italic" }}> — {note}</span>}
    </span>
  </div>
);

interface PhaseItem {
  id: string;
  title: string;
  status: string;
  description?: string;
  completedDate?: string;
  subItems?: { text: string; done: boolean; note?: string }[];
}

interface Phase {
  id: string;
  title: string;
  status: string;
  completedDate?: string;
  goldenSnapshot: string;
  items: PhaseItem[];
}

const PhaseCard = ({ phase }: { phase: Phase }) => {
  const [expanded, setExpanded] = useState(
    phase.status !== "complete" && phase.status !== "parked"
  );
  const countableItems = phase.items.filter((i) => i.status !== "parked");
  const doneCount = countableItems.filter((i) => i.status === "done").length;
  const totalCount = countableItems.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        marginBottom: "16px",
        overflow: "hidden",
        background: "white",
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            phase.status === "complete"
              ? "#F0FDF4"
              : phase.status === "in-progress"
              ? "#FFFBEB"
              : "#F9FAFB",
          borderBottom: expanded ? "1px solid #E5E7EB" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "18px" }}>{expanded ? "▾" : "▸"}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>{phase.title}</div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              {doneCount}/{totalCount} items · {phase.goldenSnapshot}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "100px",
              height: "6px",
              background: "#E5E7EB",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                background: pct === 100 ? "#059669" : "#D97706",
                borderRadius: "3px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", minWidth: "36px" }}>
            {pct}%
          </span>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: "12px 20px" }}>
          {phase.items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "12px 16px",
                margin: "6px 0",
                borderRadius: "8px",
                background:
                  item.status === "done"
                    ? "#F0FDF4"
                    : item.status === "in-progress"
                    ? "#FFFBEB"
                    : item.status === "parked"
                    ? "#F3F4F6"
                    : "#F9FAFB",
                border: `1px solid ${
                  item.status === "done"
                    ? "#BBF7D0"
                    : item.status === "in-progress"
                    ? "#FDE68A"
                    : "#E5E7EB"
                }`,
                opacity: item.status === "parked" ? 0.7 : 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>
                    {item.status === "done"
                      ? "✅"
                      : item.status === "in-progress"
                      ? "🔨"
                      : item.status === "waiting"
                      ? "⏳"
                      : item.status === "partial"
                      ? "🔶"
                      : item.status === "parked"
                      ? "⏸️"
                      : "⬜"}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: "14px", color: "#111827" }}>
                    {item.id} — {item.title}
                  </span>
                </div>
                <StatusBadge status={item.status} />
              </div>
              {item.description && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6B7280",
                    margin: "6px 0 0 28px",
                    lineHeight: "1.5",
                  }}
                >
                  {item.description}
                </p>
              )}
              {item.completedDate && (
                <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "4px 0 0 28px" }}>
                  Completed: {item.completedDate}
                </p>
              )}
              {item.subItems && (
                <div style={{ marginLeft: "28px", marginTop: "8px" }}>
                  {item.subItems.map((si, idx) => (
                    <CheckItem key={idx} text={si.text} done={si.done} note={si.note} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function BuildPlanDashboard() {
  const [showRepos, setShowRepos] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);
  const [showAutomation, setShowAutomation] = useState(false);
  const [showAgents, setShowAgents] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [showGovDocs, setShowGovDocs] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const countablePhases = phases.filter((p) => !["parked"].includes(p.status));
  const totalItems = countablePhases.reduce(
    (acc, p) => acc + p.items.filter((i) => i.status !== "parked").length,
    0
  );
  const doneItems = countablePhases.reduce(
    (acc, p) => acc + p.items.filter((i) => i.status === "done").length,
    0
  );
  const overallPct = Math.round((doneItems / totalItems) * 100);

  return (
    <div
      style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "24px 16px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", margin: 0 }}>
            Oldus Build Plan
          </h1>
          <span style={{ fontSize: "24px" }}>🦞</span>
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #0891B2)",
              color: "white",
              padding: "3px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            Day 27
          </span>
        </div>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 16px 0" }}>
          OpenClaw v2026.2.26 · Claude Opus 4.6 · Hetzner ARM Helsinki · Updated 2026-03-10 · Born 2026-02-11
        </p>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          {[
            { label: "Total Spend", value: "~$2,417", sub: "Day 0-25", color: "#7C3AED" },
            { label: "Waste Eliminated", value: "~50%", sub: "vs baseline", color: "#059669" },
            { label: "Integrations", value: "27", sub: "all live", color: "#0891B2" },
            { label: "CardStar Templates", value: "62", sub: "15 sports", color: "#D97706" },
            { label: "ArtPlatform", value: "35K+", sub: "lines of code", color: "#7C3AED" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "white",
                border: `2px solid ${stat.color}22`,
                borderRadius: "10px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#374151" }}>{stat.label}</div>
              <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Overall progress */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "12px 16px",
            background: "#F0FDF4",
            borderRadius: "10px",
            border: "1px solid #BBF7D0",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#065F46" }}>
              Overall: {doneItems}/{totalItems} items complete (parked items excluded)
            </div>
            <div
              style={{
                width: "100%",
                height: "8px",
                background: "#D1FAE5",
                borderRadius: "4px",
                marginTop: "6px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${overallPct}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #059669, #0891B2)",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
          <span style={{ fontSize: "24px", fontWeight: 800, color: "#059669" }}>{overallPct}%</span>
        </div>
      </div>

      {/* Phase cards */}
      {phases.map((phase) => (
        <PhaseCard key={phase.id} phase={phase as Phase} />
      ))}

      {/* Key Milestones */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowMilestones(!showMilestones)}
          style={{
            padding: "16px 20px",
            background: "linear-gradient(135deg, #EDE9FE, #E0F2FE)",
            borderBottom: showMilestones ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              🗓️ Key Milestones — Day 0 → Day 27
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              {milestones.length} events · 27 days · Born 2026-02-11
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showMilestones ? "▾" : "▸"}</span>
        </div>
        {showMilestones && (
          <div style={{ padding: "12px 20px" }}>
            {milestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "8px 0",
                  borderBottom: idx < milestones.length - 1 ? "1px solid #F3F4F6" : "none",
                }}
              >
                <div style={{ minWidth: "60px", textAlign: "right" }}>
                  <span
                    style={{
                      background: m.event.includes("🚀") ? "#D1FAE5" : m.event.includes("⚠️") ? "#FEF3C7" : "#EDE9FE",
                      color: m.event.includes("🚀") ? "#065F46" : m.event.includes("⚠️") ? "#92400E" : "#5B21B6",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {m.label}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "2px" }}>{m.date}</div>
                  <div style={{ fontSize: "13px", color: "#374151", lineHeight: "1.4" }}>{m.event}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Operational Automation */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowAutomation(!showAutomation)}
          style={{
            padding: "16px 20px",
            background: "#F0FDF4",
            borderBottom: showAutomation ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              ⚙️ Operational Automation ({automationCrons.length} crons/services)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              All running — gateway watchdog, budget parser, session watchdog, backups, security audit
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showAutomation ? "▾" : "▸"}</span>
        </div>
        {showAutomation && (
          <div style={{ padding: "12px 20px" }}>
            {automationCrons.map((cron, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "8px 0",
                  borderBottom: idx < automationCrons.length - 1 ? "1px solid #F3F4F6" : "none",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    minWidth: "180px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#059669",
                    background: "#F0FDF4",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    flexShrink: 0,
                  }}
                >
                  {cron.schedule}
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{cron.name}</div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>{cron.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Agents */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowAgents(!showAgents)}
          style={{
            padding: "16px 20px",
            background: "linear-gradient(135deg, #F5F3FF, #EFF6FF)",
            borderBottom: showAgents ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              🤖 Agent Fleet ({agents.length} agents)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              3 active · 1 registered · 2 scoped · 1 disabled
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showAgents ? "▾" : "▸"}</span>
        </div>
        {showAgents && (
          <div style={{ padding: "12px 20px" }}>
            {agents.map((agent, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "10px 0",
                  borderBottom: idx < agents.length - 1 ? "1px solid #F3F4F6" : "none",
                }}
              >
                <div style={{ fontSize: "20px" }}>
                  {agent.status === "active" ? "🟢" : agent.status === "disabled" ? "🔴" : agent.status === "registered" ? "🔵" : "🟡"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                    <span style={{ fontWeight: 700, fontSize: "14px", color: "#111827", fontFamily: "monospace" }}>
                      {agent.id}
                    </span>
                    <StatusBadge status={agent.status} />
                    <span style={{ fontSize: "11px", color: "#6B7280" }}>{agent.model}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>{agent.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integrations */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowIntegrations(!showIntegrations)}
          style={{
            padding: "16px 20px",
            background: "#EFF6FF",
            borderBottom: showIntegrations ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              🔌 Integrations ({integrations.length} live)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              Google Suite, Shopify, NetSuite, Zendesk, Jira, Vercel, ElevenLabs, Sonos + 19 more
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showIntegrations ? "▾" : "▸"}</span>
        </div>
        {showIntegrations && (
          <div style={{ padding: "12px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {integrations.map((integration, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 10px",
                    background: "#F0FDF4",
                    borderRadius: "6px",
                    border: "1px solid #BBF7D0",
                  }}
                >
                  <span style={{ fontSize: "12px" }}>✅</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#111827" }}>{integration.name}</div>
                    <div style={{ fontSize: "10px", color: "#6B7280" }}>{integration.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Governance Docs */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowGovDocs(!showGovDocs)}
          style={{
            padding: "16px 20px",
            background: "#FFF7ED",
            borderBottom: showGovDocs ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              📋 Governance & Memory Docs ({governanceDocs.length} files)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              Tier 1: always-on context · Tier 2: warm context on demand
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showGovDocs ? "▾" : "▸"}</span>
        </div>
        {showGovDocs && (
          <div style={{ padding: "12px 20px" }}>
            {["Tier 1", "Tier 2"].map((tier) => (
              <div key={tier} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: tier === "Tier 1" ? "#7C3AED" : "#0891B2",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  {tier} — {tier === "Tier 1" ? "Always loaded" : "Load on demand"}
                </div>
                {governanceDocs
                  .filter((d) => d.tier === tier)
                  .map((doc, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: "10px",
                        padding: "6px 0",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: tier === "Tier 1" ? "#7C3AED" : "#0891B2",
                          minWidth: "180px",
                          flexShrink: 0,
                        }}
                      >
                        {doc.name}
                      </span>
                      <span style={{ fontSize: "12px", color: "#6B7280" }}>{doc.description}</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            background: "#F0FDF4",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
            🔒 Security Hardening
          </div>
          <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
            {securityItems.filter((i) => i.done).length}/{securityItems.length} items complete
          </div>
        </div>
        <div style={{ padding: "12px 20px" }}>
          {securityItems.map((item, idx) => (
            <CheckItem key={idx} text={item.text} done={item.done} />
          ))}
        </div>
      </div>

      {/* Operational Rules */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowRules(!showRules)}
          style={{
            padding: "16px 20px",
            background: "#FEF3C7",
            borderBottom: showRules ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              ⚠️ Operational Rules ({operationalRules.length})
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              Derived from incidents — not optional
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showRules ? "▾" : "▸"}</span>
        </div>
        {showRules && (
          <div style={{ padding: "12px 20px" }}>
            {operationalRules.map((rule, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "6px 0",
                  fontSize: "13px",
                  color: "#374151",
                  lineHeight: "1.5",
                  borderBottom: idx < operationalRules.length - 1 ? "1px solid #F9FAFB" : "none",
                }}
              >
                <span style={{ fontWeight: 700, color: "#D97706", flexShrink: 0 }}>{idx + 1}.</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Repos */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          marginBottom: "16px",
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          onClick={() => setShowRepos(!showRepos)}
          style={{
            padding: "16px 20px",
            background: "#F9FAFB",
            borderBottom: showRepos ? "1px solid #E5E7EB" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
              📁 Repository Status ({repoStatus.length} repos · Oldus-AI org)
            </div>
            <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
              {repoStatus.filter((r) => r.status === "active").length} active ·{" "}
              {repoStatus.filter((r) => r.status === "waiting").length} waiting ·{" "}
              {repoStatus.filter((r) => r.status === "archived").length} archived
            </div>
          </div>
          <span style={{ fontSize: "18px" }}>{showRepos ? "▾" : "▸"}</span>
        </div>
        {showRepos && (
          <div style={{ padding: "12px 20px" }}>
            {repoStatus.map((repo, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "8px 0",
                  fontSize: "13px",
                  borderBottom: idx < repoStatus.length - 1 ? "1px solid #F3F4F6" : "none",
                }}
              >
                <span style={{ fontSize: "14px", flexShrink: 0 }}>
                  {repo.status === "active" ? "🟢" : repo.status === "waiting" ? "🟡" : "⚪"}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 600, color: "#111827", fontFamily: "monospace", fontSize: "12px" }}>
                      {repo.org}/{repo.name}
                    </span>
                    <StatusBadge status={repo.status} />
                  </div>
                  <span style={{ color: "#6B7280", fontSize: "12px" }}>{repo.note}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "20px 0 8px 0",
          fontSize: "11px",
          color: "#9CA3AF",
          borderTop: "1px solid #E5E7EB",
          marginTop: "8px",
        }}
      >
        <div style={{ marginBottom: "4px" }}>
          Oldus · Born 2026-02-11 · Hetzner ARM Helsinki · Day 27 of ∞ 🦞
        </div>
        <div>
          Conscious omissions: watch mode, Docker Compose, separate dev/prod images, Kubernetes/Vault
        </div>
      </div>
    </div>
  );
}
