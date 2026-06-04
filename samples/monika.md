# Monika Aggarwal
Lead Engineer @ Directi · Frontend Architect · Aspiring AI Engineer · Ex-Housing
10 years building large-scale B2B2C productivity suites & high-traffic B2C platforms. Expert in TypeScript, system design, cross-product micro frontend architecture, build tooling, LLM integration & web performance. MCA, Delhi University 2016.

## Contact
email: monika.aggarwal1992@gmail.com
phone: +919958620225
linkedin: /in/monika-aggarwal-98b47380
github: /monika-agg

## Skills
LangGraph, RAG, MCP, TypeScript, React, Webpack, Module Federation, GraphQL, IndexedDB, SSR, PWA, i18n, Rollup, Service Workers, Lambda@Edge, GitHub Actions, CDNs, CI/CD, Observability, Agentic AI, System Design

## Work Experience

### Lead Frontend Engineer – Drive
Directi (Flock Suite) · May 2025 – Present
Tech lead & IC; 3-engineer team, 3 codebases: shared library (TCC), standalone app & Module Federated Suite integration.
- Built **CI/CD pipelines** (Jenkins/GitHub Actions), observability (Sentry/Medusa), centralised error logging & CDN integration across all 3 codebases
- Designed **scalable data layer** (Redux/IndexedDB), i18n architecture, centralised theming & **structured error model** (category, severity, conflict metadata) via shared policy layer
- Full Drive UX — **folder navigation** (listing, selection, breadcrumbs); **multi-file upload orchestration** (real-time progress, 3-stage error pipeline); deduplication & modal flows; multi-state keyboard nav (arrow nav + virtualised scroll-to-index); type-safe action registry with undo generators (TypeScript generics)
- Drive **component library** (TCC) — host-agnostic; generic TypeScript hooks, adapter contracts & discriminated unions across 90+ components; consumed by 3 products with **zero coupling**; two build targets sharing one codebase, Recipient App with own auth state machine & silent re-auth on token expiry
- Integrated Drive into Flock Suite (Mail/Calendar) via **Module Federation** with cross-functional runtime config, enabling **isolated dev/QA without multi-application setup**
- **Multi-phase attachment validation** for Drive-to-Mail flows — extension blacklists, per-file & batch size limits, in-flight upload space accounting, attachment count & mail size — all in a **single validation pass**
- Built **Claude Code** slash commands for developer productivity — automated PR review, feature scaffolding & new engineer onboarding; reduced review cycle time and accelerated team ramp-up

### Lead Frontend Engineer – Site Builder
Directi (Flock Suite) · Jul 2023 – May 2025
Architect & IC; mentored 3 engineers. **Full ownership**: system design, technical roadmap, spec, CI/CD, observability & delivery.
- Architected core library — 3-layer domain model (Config/Entity/Data) reducing persistence payload **~50×**; codified **7+ design patterns** (Builder, Factory, Registry, Observable, Strategy) as team conventions; template theming architecture
- Designed JSON-driven template schema with **bidirectional reactive dependency system** auto-syncing 100+ form configs; built live-preview editor with real-time two-way binding via custom Observable event system
- Offline-first distributed system — **IndexedDB + background server sync** with conflict resolution, Redux-backed publish task queue (28 slices) with multi-step error recovery & status tracking
- Integrated generative AI content generation with context-aware prompt decoration, streaming response & retry logic — **inline LLM suggestions per field** based on template & brand context; configurable system prompts for client/product orchestration
- Rollup **ESM/CJS multi-format build**; 64 test files covering builders, registries & validators; **127+ TypeScript interfaces** across full Config/Entity/Data hierarchy

### Senior Frontend Engineer – Mail & Platform
Directi (Flock Suite) · Mar 2020 – Jul 2023
IC across Mail (primary), Contacts & Calendar — production webmail serving millions across 15+ locales.
- Migrated rich-text composer to Froala: **built custom plugins** (alignment, color, auto lists, cross-locale rendering), resolved complex cursor/focus/scroll edge cases
- End-to-end CSP for production webmail: **custom Webpack plugin** for build-time injection, per-environment policy management, VAPT remediation — **eliminating XSS attack surface**
- Delivered centralised paywall, multi-theme support, localisation & 2FA authentication; designed **white-label branding system** with real-time theme propagation via session-cached pipeline
- Performance & async architecture: Mail delta sync upgrade (**polling → WebSocket**; reconciliation from **main thread → worker**); email prefetching for first N threads; dynamic locale bundles cut ~1.2 MB upfront; Service Worker PWA with storage-quota-managed caching; tree-shaking compressed signature bundle **4 MB → <100 KB**; Webpack build **30+ min → <5 min**

### Senior Frontend Engineer – Web Performance & Platform
Housing.com / Makaan.com · Jul 2016 – Mar 2020
Web Performance & Platform team — full architectural rewrite of Housing.com & Makaan.com to lean SSR stack; led performance engineering across both platforms.
- Achieved: JS bundle **300 → 125 KB (>50%)**, HTML 200 → 15–30 KB (70%), page load **5.5 → 3.5s**, GSC good URLs **27% → 74%**, Lighthouse **45 → 81**; established WebPageTest/Quattr lab monitoring & RUM via New Relic
- Multi-CDN (Akamai/CloudFront/CloudFlare): Lambda@Edge for **cache-key normalisation** (device, user/bot, A/B variant, query string & differential bundles); region-specific routing; **5xx shield** (stale-content failover for origin resilience)
- Engineered **custom SSR pre-Next.js** for scalability: **isomorphic** routing, critical CSS, GraphQL query-uglification Babel plugin (GET caching, 5 KB JS reduction); server-side Module Federation; differential JS bundle serving; chunk flushing via custom Babel plugins; asset preloading; **streaming injection with component scoped JS/CSS/data**; custom bundle optimisation plugins (__MOBILE__ tree-shaking, dead-code elimination); custom CSS pipeline on @linaria/atomic
- **INP via startTransition** for long-task breaking; **LCP via strategic API parallelisation**; CDN cache-hit improvements via request normalisation & origin shield configuration

## AI PROJECTS
Trend Jack Engine | Multi-agent agentic workflow (LangGraph + LangSmith) — trend discovery → research → brief generation → platform-specific creative drafts → QA gating → human-in-the-loop → auto-publish
Real Estate Search Bot | End-to-end LLM-powered conversational property search & discovery chatbot with tool calling; multi-tier routing & composable prompts/intents for scalability
Expense Reporter | Claude + Gmail MCP — reads CC statements, parses PDFs, categorises transactions & generates monthly spend report
Ask HR (Internal RAG) | RAG-powered bot for Directi employees to query HR policies with document grounding & source attribution. Summoned on @AskHR mentions on Slack
