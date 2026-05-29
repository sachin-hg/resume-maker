# Monika Aggarwal
Lead Frontend Architect & AI Engineer at Directi
10 years building large-scale B2B2C productivity suites & high-traffic B2C platforms (Housing.com). Expert in TypeScript, system design, cross-product component architecture, build tooling, LLM integration & web performance. MCA, Delhi University 2016.

## Contact
email: monika.aggarwal1992@gmail.com
phone: +919958620225
location:
linkedin: /in/monika-aggarwal-98b47380
github: /monika-agg

## Skills
LangGraph, RAG, MCP, TypeScript, React, Vite, Rollup, Webpack 5, GraphQL, Module Federation, SSR, Service Workers, PWA, Lambda@Edge, CDN (Akamai/CloudFront), GitHub Actions, Jenkins, Sentry, i18n, IndexedDB, Ant Design, Jest

## Work Experience

### Lead Frontend Engineer – Drive
Directi (Flock Suite) · May 2025 – Present
Tech lead & IC for Drive; 4-engineer team across 3 codebases: shared library (TCC), standalone app & Mail integration.
- Built host-agnostic Drive component library (TCC) — generic TypeScript hooks, adapter contracts & discriminated unions across 90+ files; consumed by 3 products with zero SDK coupling; two build targets (Drive app + Recipient App) sharing one codebase, Recipient App with own auth state machine (AuthRequired → Authenticated → AuthExpired) & silent re-auth on token expiry
- Full Drive UX: folder navigation, listing, selection, breadcrumbs, deduplication & modal flows (Replace/Keep Both/Skip with apply-to-all batch-preference); multi-state keyboard selection (shift-range, ctrl/cmd-toggle, Cmd+A, arrow nav + virtualised scroll-to-index); theming & i18n
- Module-federated Drive components for Mail integration; server-side copy orchestration: draft sync prerequisite, parallel Promise.allSettled() uploads, graceful partial-failure handling, progress pill & fallback on failure
- Multi-phase attachment validation for Drive-to-Mail flows — extension blacklists, per-file & batch size limits, in-flight upload space accounting, attachment count & mail size — all in a single validation pass
- Multi-file upload orchestration: real-time SDK progress, 3-stage error pipeline (policy → processor → handler), deduplication modal with batch-preference; system-wide structured error model (category, severity, conflict metadata) applied across all service calls via shared policy layer
- CI/CD (Jenkins/GitHub Actions), observability (Sentry/Medusa), CDN & data layer architecture across all 3 codebases; type-safe action registry (TypeScript generics + discriminated unions) unifying 6 operations with declarative typed params, undo generators & i18n messages

### Lead Frontend Engineer – Site Builder
Directi (Flock Suite) · Jul 2023 – May 2025
Sole architect & IC; mentored 2 junior devs. Full ownership: spec, CI/CD, observability & delivery.
- Architected TypeScript core library with 3-layer domain model (Config/Entity/Data) reducing persistence payload ~50×; codified 7+ design patterns (Builder, Factory, Registry, Observable, Strategy, Chain of Responsibility) as team conventions
- Designed JSON-driven template schema with bidirectional reactive dependency system auto-syncing 100+ form fields; built live-preview editor with real-time two-way binding via custom Observable event system
- Offline-first draft system: IndexedDB + background server sync, conflict resolution, Redux-backed publish task queue (28 slices) with multi-step error recovery & status tracking
- Integrated LLM content generation with context-aware prompt decoration, streaming response & retry logic — inline AI suggestions per field based on template & brand context
- Rollup ESM/CJS/UMD multi-format build for npm distribution; 64 test files covering builders, registries & validators; 127+ TypeScript interfaces across full Config/Entity/Data hierarchy

### Frontend Engineer – Mail & Platform
Directi (Flock Suite) · Mar 2020 – Jul 2023
IC across Mail (primary), Contacts & Calendar — production webmail serving millions across 15+ locales.
- Migrated rich-text composer CKEditor → Froala: built 4 custom plugins (alignment, color, lists, cross-locale rendering), resolved complex cursor/focus/scroll edge cases; designed white-label branding system with real-time theme propagation via session-cached pipeline
- End-to-end CSP for production webmail: custom Webpack plugin for build-time injection, per-environment policy management, VAPT remediation — eliminating XSS attack surface
- Performance: email prefetching for first N threads; dynamic locale bundles cut ~1.2 MB upfront; Service Worker PWA with storage-quota-managed caching; tree-shaking compressed signature bundle 4 MB → <100 KB; Webpack build 30+ min → <5 min

### Senior Frontend Engineer – Web Performance & Platform
Housing.com / Makaan.com · Jul 2016 – Mar 2020
Web Performance & Platform team — full architectural rewrite of Housing.com + Makaan.com to lean SSR stack.
- JS bundle 300 → 125 KB (>50%); HTML 200 → 15-30 KB (70%); page load 5.5 → 3.5s; GSC good URLs 27% → 74%
- Multi-CDN (Akamai/CloudFront/CloudFlare): Lambda@Edge for cache-key normalisation (device, user/bot, A/B variant, query string & differential bundles); region-specific routing; stale-content failover for origin resilience
- Custom SSR pre-Next.js: isomorphic routing, critical CSS extraction, GraphQL query-uglification Babel plugin for GET caching; server-side Module Federation with version control; differential serving of modern/legacy JS bundles
- INP via startTransition for long-task breaking; LCP via strategic API parallelisation; CDN cache-hit improvements via request normalisation & origin shield configuration

## AI Projects
Trend Jack Engine | Multi-agent LangGraph workflow — trend discovery → research → brief generation → platform-specific creative drafts → QA gating → auto-publish
Real Estate Search Bot | End-to-end LLM-powered conversational property search & discovery chatbot with tool calling
Expense Reporter | Claude + Gmail MCP — reads CC statements, parses PDFs, categorises transactions & generates monthly spend report
Ask HR (Internal RAG) | RAG-powered bot for Directi employees to query HR policies with document grounding & source attribution
