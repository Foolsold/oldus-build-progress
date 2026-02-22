import { useState } from "react";

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
          "replyToMode: 'off' in Slack channel config. Context continuity over channel tidiness. Known bug #5470 may regress after redeploys.",
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
          { text: "Full workspace pushed to GitHub (Foolsold/oldus-config)", done: true },
        ],
      },
    ],
  },
  {
    id: "creds",
    title: "Credentials & Integrations",
    status: "complete",
    goldenSnapshot: "13 sandbox keys confirmed ✅",
    items: [
      {
        id: "creds.0",
        title: "Sandbox credential interpolation",
        status: "done",
        description:
          "sandbox.docker.env supports ${VAR} from gateway .env. No broker scripts needed. 13 app keys injected.",
        completedDate: "2026-02-20",
        subItems: [
          { text: "ElevenLabs API key", done: true },
          { text: "Moltbook API key", done: true },
          { text: "OpenAI API key (GPT-5.2 code reviews)", done: true },
          { text: "Missive API token", done: true },
          { text: "Prodigi sandbox key", done: true },
          { text: "Google AI / Gemini key", done: true },
          { text: "GitHub PAT (read/write)", done: true },
          { text: "Slack bot token", done: true },
          { text: "Telegram bot token", done: true },
          { text: "Discord bot token", done: true },
          { text: "Shopify admin token", done: true },
          { text: "Shopify client ID", done: true },
          { text: "ANTHROPIC_API_KEY (exception: Claude Code headless only)", done: true },
        ],
      },
      {
        id: "creds.1",
        title: "Google OAuth — GA4 + Gmail",
        status: "done",
        description:
          "OAuth flow via SSH tunnel through Tailscale (localhost:8085). 13 GA4 properties (Kew, Magnolia Box, RSC Prints, Pwinty, CardStar, Readymades, Canvas Republic, etc.). Gmail read/send/modify.",
        completedDate: "2026-02-18",
      },
      {
        id: "creds.2",
        title: "Google OAuth — Search Console",
        status: "done",
        description: "webmasters.readonly scope added. Prodigi properties accessible.",
        completedDate: "2026-02-19",
      },
      {
        id: "creds.3",
        title: "Google OAuth — Ads",
        status: "done",
        description:
          "Separate Google Cloud project (oldus-ads). adwords scope. OAuth completed via SSH tunnel. Note: Google Ads developer token still needed for programmatic campaign push — requires Manager account application.",
        completedDate: "2026-02-19",
      },
      {
        id: "creds.4",
        title: "Google OAuth — Sheets + Drive",
        status: "done",
        description:
          "spreadsheets (read/write) + drive.readonly scopes added. 7 total scopes across all Google services. APIs enabled in Cloud Console.",
        completedDate: "2026-02-20",
      },
      {
        id: "creds.5",
        title: "Missive webhook integration",
        status: "done",
        description:
          "Event-driven webhook via Tailscale Funnel (HTTPS). Python listener queues @mentions, on-demand cron processes and replies. Moved from Mac to server for 24/7 reliability.",
        completedDate: "2026-02-20",
        subItems: [
          { text: "Webhook listener (Python, systemd)", done: true },
          { text: "Tailscale Funnel for HTTPS termination", done: true },
          { text: "On-demand cron for processing queue", done: true },
          { text: "Migrated from Mac to Hetzner server", done: true },
        ],
      },
      {
        id: "creds.6",
        title: "Shopify — client credentials flow",
        status: "done",
        description:
          "Migrated from static tokens to Shopify client credentials grant with 24-hour token rotation. Headless channel for Storefront API. Admin token for backend.",
        completedDate: "2026-02-22",
      },
      {
        id: "creds.7",
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
    goldenSnapshot: "Agentbus repo on GitHub ✅",
    items: [
      {
        id: "sons.0",
        title: "Architecture & model hierarchy",
        status: "done",
        description:
          "3-tier model: Oldus (Opus, orchestrator) → Son (Opus, domain specialist + evaluator) → Sub-agent (Sonnet, execution). Task-level routing, not agent-level downgrading. Backlog: consider Haiku as third tier for purely mechanical crons.",
        completedDate: "2026-02-18",
      },
      {
        id: "sons.1",
        title: "Tiered memory architecture",
        status: "done",
        description:
          "Oldus: canonical shared context. Sons: isolated domain memory. Inter-agent: bulletin board pattern (no full memory merge). Prevents cross-domain pollution and token bloat.",
        completedDate: "2026-02-18",
      },
      {
        id: "sons.2",
        title: "Agent specs — Marketing family (4 agents)",
        status: "done",
        description:
          "Performance Marketing, Content/SEO, CRM/Lifecycle, Social/Community. Each with trust progression, guardrails, bidirectional sibling handoffs, success metrics.",
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
        title: "Router-enforced PolicyMaps",
        status: "done",
        description:
          "Router scans outboxes, applies policy, routes to inboxes. Deterministic token spend control — Router has authoritative override on processing mode.",
        completedDate: "2026-02-19",
      },
      {
        id: "sons.7",
        title: "Agentbus router daemon",
        status: "in-progress",
        description:
          "Pure Python daemon (systemd), no LLM calls. Core routing works. Permission/ACL issues between agent users caused deadlettering on Day 11. Deploy script and HARDENED-DEFAULTS.md need updating based on learnings.",
        subItems: [
          { text: "Router scan loop (outbox polling)", done: true },
          { text: "Policy enforcement (PolicyMap application)", done: true },
          { text: "SQLite state management (init_state_db)", done: true },
          { text: "DB schema — code is source of truth, not setup_host.sh", done: true },
          { text: "Message routing from outbox → inbox", done: true },
          { text: "Deadletter handling for undeliverable messages", done: true },
          { text: "ACL permissions — router user needs write to all agent inboxes", done: false, note: "Root cause identified, fix in progress" },
          { text: "Bind mount consistency — OpenClaw sometimes ignores config changes", done: false, note: "Requires gateway restart + container recreation" },
          { text: "Inbox handler (shared Python module for Sons to consume)", done: false },
          { text: "Slack mirror (post routed messages to Slack for visibility)", done: false },
          { text: "Update deploy_son.sh with Day 11 debugging fixes", done: false },
          { text: "Update HARDENED-DEFAULTS.md with Son deployment learnings", done: false },
        ],
      },
      {
        id: "sons.8",
        title: "Marketing Performance Son — first Son deployed",
        status: "in-progress",
        description:
          "First Son running on port 18790 with own gateway instance. Extensive debugging on Day 11: auth, Docker perms, config paths, bind mounts. Son responds to direct messages. Automated routing loop still needs ACL fix.",
        subItems: [
          { text: "Own OpenClaw gateway on port 18790 (systemd service)", done: true },
          { text: "Independent OPENCLAW_GATEWAY_TOKEN + DEVICE_TOKEN", done: true },
          { text: "401 auth issues resolved (token pair mismatch)", done: true },
          { text: "Chat completions HTTP endpoint enabled (nested config path)", done: true },
          { text: "Docker group membership for agent_marketing_performance user", done: true },
          { text: "Son identity prompt + Prodigi brand context (Readymades, Canvas Republic, Magnolia Box)", done: true },
          { text: "Son responds to direct HTTP messages", done: true },
          { text: "Full Agentbus round-trip proven (Oldus → Son → Oldus → Telegram)", done: true },
          { text: "Bind mount for Agentbus inbox directory", done: false, note: "Config set but not consistently applied" },
          { text: "Automated message routing via Agentbus (blocked by ACL)", done: false },
          { text: "Keyword research pipeline (Search Console + web search)", done: false },
          { text: "Gemini image generation — landscape 1200×628", done: false },
          { text: "Gemini image generation — square 1200×1200", done: false },
          { text: "Gemini image generation — portrait 900×1600", done: false },
          { text: "Google Ads copy — 15 headline variants (30 char limit)", done: false },
          { text: "Google Ads copy — 4 description variants (90 char limit)", done: false },
          { text: "Campaign package assembly + Slack delivery", done: false },
        ],
      },
      {
        id: "sons.9",
        title: "Son deployment playbook",
        status: "in-progress",
        description:
          "Repeatable process for deploying new Sons. Day 11 debugging surfaced numerous issues that need to be captured so Son #2 doesn't repeat them.",
        subItems: [
          { text: "deploy_son.sh script exists (creates user, dirs, gateway config)", done: true },
          { text: "Reference config template for Son gateway (openclaw.json)", done: true },
          { text: "Documented: Son needs own token pair (not shared with Oldus)", done: true },
          { text: "Documented: HTTP endpoint config is nested under agents.defaults, not root", done: true },
          { text: "Documented: agent user needs docker group membership", done: true },
          { text: "Generic deploy-son.sh with all 15 postmortem fixes", done: true },
          { text: "SON-DEPLOYMENT-POSTMORTEM.md with every issue documented", done: true },
          { text: "HARDENED-DEFAULTS.md updated with Son deployment section", done: true },
          { text: "Fix: deploy script should set correct ACLs on inbox/outbox dirs", done: true },
          { text: "Fix: deploy script should configure bind mounts in Son's openclaw.json", done: true },
          { text: "Fix: deploy script should verify gateway starts cleanly before exiting", done: true },
        ],
      },
    ],
  },
  {
    id: "p2",
    title: "P2 — Resilience & Testing",
    status: "in-progress",
    goldenSnapshot: "Pending P2 completion",
    items: [
      {
        id: "p2.0",
        title: "Model fallback and key rotation",
        status: "parked",
        description:
          "Multiple API keys, auto-rotation on 429, Opus → Sonnet degraded mode. Parked — haven't hit 429s in practice. Check if OpenClaw handles natively before building custom.",
      },
      {
        id: "p2.1",
        title: "Health checks that detect 'stuck but running'",
        status: "done",
        description:
          "health-watchdog.py with 9 checks: gateway, backup freshness, version pin, OAuth token, disk, DNS, workspace writable, recent activity. --dry-run and --json flags. Slack alerting ready.",
        completedDate: "2026-02-22",
        subItems: [
          { text: "Process running check (systemctl is-active)", done: true },
          { text: "Gateway WebSocket reachable", done: true },
          { text: "Backup freshness (<26 hours)", done: true },
          { text: "Version pin check", done: true },
          { text: "OAuth token freshness", done: true },
          { text: "Disk space check", done: true },
          { text: "DNS resolution", done: true },
          { text: "Workspace writable", done: true },
          { text: "Recent memory activity", done: true },
          { text: "Alert on failure (Slack notification)", done: true },
          { text: "Cron schedule (every 15 mins)", done: true },
        ],
      },
      {
        id: "p2.2",
        title: "Fixture replay and contract tests",
        status: "parked",
        description:
          "Deprioritised. Normalisers run inside gateway — can't invoke from sandbox. Requires OpenClaw to expose webhook simulation endpoint. Skip until supported.",
      },
      {
        id: "p2.3",
        title: "CI-equivalent local validation",
        status: "not-started",
        description:
          "Quick win building on existing oc-config-validate and snapshot-state scripts.",
        subItems: [
          { text: "make test — config validation + contract tests + snapshot verification", done: false },
          { text: "make reset — nuke state/session caches but not snapshots", done: false },
          { text: "Makefile in workspace root", done: false },
        ],
      },
      {
        id: "p2.4",
        title: "Disaster recovery runbook",
        status: "not-started",
        description:
          "Written procedure: bare Ubuntu → running Oldus in 20 minutes using GitHub backups + golden tar. Foundation for Oldus In A Box provisioning.",
        subItems: [
          { text: "Step-by-step runbook document", done: false },
          { text: "Tested on fresh VPS", done: false },
          { text: "Automated provisioning script (optional)", done: false },
          { text: "Include Son deployment in runbook", done: false },
        ],
      },
      {
        id: "p2.5",
        title: "Agentbus integration tests",
        status: "not-started",
        description:
          "End-to-end tests for the message routing pipeline. Send message from Oldus outbox → Router picks up → delivers to Son inbox → Son processes → response in Oldus inbox.",
        subItems: [
          { text: "Test harness script (Python)", done: false },
          { text: "Happy path: Oldus → Router → Son → response", done: false },
          { text: "Error path: malformed envelope → deadletter", done: false },
          { text: "Permission path: ACL rejection → appropriate error", done: false },
          { text: "Loop guard: hop count exceeded → drop", done: false },
        ],
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
          "Claude Code 2.1.49 + Node.js v22 baked into Docker sandbox. ANTHROPIC_API_KEY injected (policy exception). Direct claude -p calls working at $0.045/call on Sonnet.",
        completedDate: "2026-02-22",
        subItems: [
          { text: "Claude Code installed in sandbox Docker image", done: true },
          { text: "ANTHROPIC_API_KEY policy exception approved", done: true },
          { text: "Headless mode (-p flag) tested and working", done: true },
          { text: "Branch convention: oldus/<description>, never main", done: true },
          { text: "Default Sonnet, escalate to Opus for architecture", done: true },
          { text: "Full bridge skill with job envelopes", done: false, note: "Direct calls sufficient for now" },
        ],
      },
      {
        id: "p3.1",
        title: "Multi-model code review stack",
        status: "done",
        description:
          "GPT-5.2 for large-context code analysis via direct API calls. Bypasses Sonnet rate limits. 3 project reviews completed (CardStar, Framing Engine, Operation Oldus).",
        completedDate: "2026-02-19",
      },
      {
        id: "p3.2",
        title: "Sonos integration",
        status: "done",
        description:
          "Hardened HTTP bridge service on host. Whitelisted commands + speaker IPs only. Accessible from sandbox via Docker bridge. Spotify SMAPI auth completed. 13 speakers controllable.",
        completedDate: "2026-02-22",
        subItems: [
          { text: "sonoscli Go binary installed", done: true },
          { text: "HTTP bridge service (host-side, systemd)", done: true },
          { text: "Whitelisted commands and speaker IPs", done: true },
          { text: "Docker bridge iptables rule for sandbox access", done: true },
          { text: "Spotify SMAPI auth (search + playback)", done: true },
          { text: "Tailscale subnet routing for home LAN", done: true },
        ],
      },
      {
        id: "p3.3",
        title: "Tailscale on server",
        status: "done",
        description:
          "Migrated from Mac to Hetzner server for 24/7 availability. Funnel for Missive webhooks. Subnet routing for home LAN (Sonos). iptables fix for CGNAT leak (Hetzner abuse ticket resolved).",
        completedDate: "2026-02-22",
        subItems: [
          { text: "Tailscale installed on Hetzner server", done: true },
          { text: "Funnel configured for webhook HTTPS", done: true },
          { text: "Subnet routing for home LAN devices", done: true },
          { text: "CGNAT traffic leak fixed (iptables FORWARD rule)", done: true },
          { text: "Hetzner abuse ticket resolved", done: true },
          { text: "Mac Funnel disabled (server is primary)", done: true },
        ],
      },
      {
        id: "p3.4",
        title: "Voice / Zoom integration",
        status: "not-started",
        description:
          "Recall.ai for meeting participation, real-time transcription → Claude → ElevenLabs TTS. Reusable service for any agent. Build spec complete from Day 2.",
      },
      {
        id: "p3.5",
        title: "Operation Oldus (Moltbook)",
        status: "not-started",
        description:
          "Oldus as Prodigi representative on Moltbook (2.5M+ agents). 6 creative approaches, dedicated submolt, shareable OpenClaw skill for Prodigi API. E-commerce store (Stripe + Prodigi fulfilment). SPEC.md exists in operation-oldus repo.",
      },
      {
        id: "p3.6",
        title: "Artist Army pipeline (magnoliabox.com)",
        status: "not-started",
        description:
          "Automated content pipeline designed on Day 8. ~£30/month for 600 new art pieces. Deliberately a cron pipeline, not an agent — no reasoning tokens burned on mechanical work.",
        subItems: [
          { text: "Weekly Sonnet cron — trend analysis + prompt generation", done: false },
          { text: "Daily image generation via paid API (Flux Pro or Gemini)", done: false },
          { text: "Multi-ratio post-processing (Python/ImageMagick)", done: false },
          { text: "Cloudflare R2 storage", done: false },
          { text: "Shopify product creation via Admin API", done: false },
          { text: "artist-army repo populated with pipeline code", done: false },
        ],
      },
      {
        id: "p3.7",
        title: "Rembg background removal service",
        status: "done",
        description:
          "FastAPI service running on port 8100. systemd managed. ONNX runtime with u2net model. Wired into CardStar V2 via Vite proxy.",
        completedDate: "2026-02-20",
      },
      {
        id: "p3.8",
        title: "Oldus In A Box — managed service",
        status: "not-started",
        description:
          "Productised version of the Oldus golden config for non-technical business owners. Provisioning script that takes bare Ubuntu → running agent in 20 mins. Revenue model: ~£1k+/month per client. Depends on P2.4 disaster recovery runbook.",
        subItems: [
          { text: "Provisioning script (depends on P2.4 runbook)", done: false },
          { text: "Client-facing config wizard (tool stack questionnaire)", done: false },
          { text: "Billing / Stripe integration", done: false },
          { text: "Run paid pilots with 2-3 business owner friends", done: false },
          { text: "Document which use cases prove most valuable", done: false },
        ],
      },
    ],
  },
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
  { text: "13 app-level keys injected via sandbox.docker.env", done: true },
  { text: "Agentbus ACL-based inter-agent isolation", done: true },
  { text: "Router-stamped sender identity (anti-spoofing)", done: true },
  { text: "Sonos bridge — whitelisted commands + speaker IPs only", done: true },
  { text: "CGNAT traffic leak fixed (iptables FORWARD drop rule)", done: true },
  { text: "Shopify client credentials with 24hr token rotation", done: true },
  { text: "Operational guardrails policy deployed to Oldus", done: true },
  { text: "Scoped GitHub PAT (3 repos only)", done: false, note: "Optional — all-repos access intentional" },
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
  "HTTP endpoint config for Sons lives at gateway.http.endpoints.chatCompletions, not at root level.",
];

const repoStatus = [
  { name: "oldus-config", status: "active", note: "Golden config + 6hr auto-sync. Source of truth." },
  { name: "agentbus", status: "active", note: "Router, inbox handler, deploy configs. Active development." },
  { name: "cardstar-v2", status: "active", note: "62 templates, canvas renderer, Shopify cart, editor." },
  { name: "readymades-framing-engine", status: "active", note: "Shopify Remix app. 2/6 tests failing — needs fix." },
  { name: "sons-of-oldus", status: "active", note: "Agent architecture specs. Golden config files removed." },
  { name: "operation-oldus", status: "waiting", note: "SPEC.md only. Build when prioritised." },
  { name: "artist-army", status: "waiting", note: "Will hold magnoliabox.com pipeline. Empty scaffold." },
  { name: "mount-craft-studio", status: "archived", note: "Read-only reference. Lovable PoC for framing engine." },
  { name: "cardstar-frontend", status: "archived", note: "V1 Angular app. Superseded by cardstar-v2." },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    done: { bg: "#059669", text: "white", label: "DONE" },
    "in-progress": { bg: "#D97706", text: "white", label: "IN PROGRESS" },
    waiting: { bg: "#6366F1", text: "white", label: "WAITING" },
    partial: { bg: "#8B5CF6", text: "white", label: "PARTIAL" },
    "not-started": { bg: "#6B7280", text: "white", label: "NOT STARTED" },
    complete: { bg: "#059669", text: "white", label: "COMPLETE" },
    parked: { bg: "#9CA3AF", text: "white", label: "PARKED" },
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
        textTransform: "uppercase",
        whiteSpace: "nowrap",
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
      {note && (
        <span style={{ color: "#9CA3AF", fontStyle: "italic" }}> — {note}</span>
      )}
    </span>
  </div>
);

const PhaseCard = ({ phase }: { phase: (typeof phases)[0] }) => {
  const [expanded, setExpanded] = useState(phase.status !== "complete" && phase.status !== "parked");
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
              {doneCount}/{totalCount} items · Golden: {phase.goldenSnapshot}
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

export default function BuildPlanDashboard() {
  const [showRepos, setShowRepos] = useState(false);

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
        maxWidth: "780px",
        margin: "0 auto",
        padding: "24px 16px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", margin: 0 }}>
            Oldus Build Plan
          </h1>
          <span style={{ fontSize: "20px" }}>🦞</span>
        </div>
        <p style={{ fontSize: "13px", color: "#6B7280", margin: "4px 0 16px 0" }}>
          OpenClaw v2026.2.15 · Claude Opus 4.6 · Hetzner ARM · Updated 2026-02-22 · Day 11
        </p>
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
                  background: "#059669",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
          <span style={{ fontSize: "22px", fontWeight: 800, color: "#059669" }}>{overallPct}%</span>
        </div>
      </div>

      {phases.map((phase) => (
        <PhaseCard key={phase.id} phase={phase} />
      ))}

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
            <CheckItem key={idx} text={item.text} done={item.done} note={item.note} />
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
          style={{
            padding: "16px 20px",
            background: "#FEF3C7",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
            ⚠️ Operational Rules ({operationalRules.length})
          </div>
          <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
            Derived from incidents — not optional
          </div>
        </div>
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
              }}
            >
              <span style={{ fontWeight: 700, color: "#D97706", flexShrink: 0 }}>{idx + 1}.</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
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
              📁 Repository Status ({repoStatus.length})
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
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 0",
                  fontSize: "13px",
                }}
              >
                <span style={{ fontSize: "14px" }}>
                  {repo.status === "active" ? "🟢" : repo.status === "waiting" ? "🟡" : "⚪"}
                </span>
                <span style={{ fontWeight: 600, color: "#111827", minWidth: "200px" }}>
                  {repo.name}
                </span>
                <span style={{ color: "#6B7280" }}>{repo.note}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "20px 0 8px 0",
          fontSize: "11px",
          color: "#9CA3AF",
        }}
      >
        Conscious omissions: watch mode, Docker Compose, separate dev/prod images, Claude Code DinD,
        Kubernetes/Vault
      </div>
    </div>
  );
}
