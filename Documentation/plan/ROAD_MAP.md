# Frontend Roadmap

## Phase 1 – Auth & Core Form and Tables (May 8 – Jul 2, 2025)

### Sprint 1 (8 – 21 May, 2025)

- [x] Set up public layout, initial public (login/register) views, and Formik-based dynamic form component.
- [x] Start multi-step wizard experience .

### Sprint 2 (22 May – 4 Jun, 2025)

- [x] Wire table pagination and integrate initial create / edit flows.

### Sprint 3 (5 – 18 Jun, 2025)

- [x] Launch Notifications view, global file preview, and Data archive view.

### Sprint 4 (19 Jun– 2 Jul, 2025)

- [x] Add reusable dropdown and collapse group components.
- [x] Build star-based evaluation input.
- [x] Set up initial CI build workflows and API-based file-return handler for demos.

## Phase 2 – Dashboards & File Management (Jul 3 – Aug 27, 2025)

### Sprint 5 (3 – 16 Jul, 2025)

- [x] Introduce release automation (auto-versioning, commit conventions, Husky) and UX features like read/unread notifications, and clickable email/phone in tables.
- [x] Enforce secure password change flow by requiring old password.

### Sprint 6 (17 – 30 Jul, 2025)

- [x] Improve file handling: upload size limits, multi-file input, and increased per-file size.
- [x] Set up PR title checks / auto releases in CI/CD.

### Sprint 7 (31 Jul – 13 Aug, 2025)

- [x] Add capacity controls for dropdown-option API calls and file-count limits.
- [x] Apply system identity/theming across the app.
- [x] Launch independent file-upload service, form reset behavior.

## Phase 3 – Admin Settings & Bulk Ops (28 Aug – 22 Oct, 2025)

### Sprint 8 ( 28 Aug – 10 Sep, 2025)

- [x] Add system admin login plus admin tools for bulk data insertion and initial user management view.

### Sprint 9 (11 Sep – 24 Sep, 2025)

- [x] Provide admin “delete all users data” operations guarded with warning messages.

### Sprint 10 (25 Sep – 8 Oct, 2025)

- [x] Focus sprint on stabilization, refinement, and QA around approvals, and bulk-insert operations (no major net-new features).

### Sprint 11 (9 – 22 Oct, 2025)

- [x] Override and standardize date input formats across forms.
- [x] Add role/Type-based filters to admin user management to improve operability at scale.

## Phase 4 – Template Platform, Admin Tools & Advanced Components (Oct 23 – Dec 17, 2025)

### Sprint 12 (23 Oct – 5 Nov, 2025)

- [x] Build necessary template views and an initial to-do list for template work.
- [x] Set up NVM controller, splitting public-view inputs and standardizing configuration.
- [x] Implement a global table layout that centralizes common table functionality.
- [x] Add an improved navbar on the authenticated layout for template-based apps.

### Sprint 13 (6 – 19 Nov, 2025)

- [x] Dedicated stabilization sprint: polish template views, global table layout, and navigation behavior (primarily refactors and fixes).

### Sprint 14 (20 Nov – 3 Dec, 2025)

- [x] Create example view for the new DataTable page pattern.
- [x] Add placeholder pages for optional backend-driven services and a support-center section.
- [x] Clone initial UI for messaging service and expand user-related settings under admin.
- [x] Add generic template example pages and basic page placeholders.
- [x] Refresh documentation to-do lists to reflect template-focused backlog.

### Sprint 15 (4 – 17 Dec, 2025)

- [x] Add live demo pages for the datatable and form examples.
- [x] Implement refresh-token setup for auth and role-permissions UI under Settings.
- [x] Build bulk data-insertion tooling and data-backup service under Settings.
- [x] Enhance datatable UX with column-visibility controller, orderable columns, export/print tools, and calendar data viewer.
- [x] Introduce theme-color settings for admin area.
- [x] Ship a full suite of advanced inputs with live examples:
    - [x] Checkbox groups, radio layouts, image/card/button-based checkbox & radio inputs.
    - [x] Button/switch-based boolean inputs, color & star inputs, and range slider.
    - [x] Accordion and tabs-based data view components, plus modal/table/dropdown UI examples.
- [x] Finalize updated documentation to-do list for next iterations.

## Phase 5 — Foundation & Shipping Readiness (18 Dec - 28 Jan, 2026)

### Sprint 16 — Release hygiene + documentation baseline (18 - 31 Dec, 2025)

- [ ] Fix changelog generating script (make it deterministic, supports conventional commits, handles merges)
- [x] Update documentation (README, commit convention, local dev, release flow)
- [ ] “Definition of Done” checklist for PRs (release notes, docs, migrations, screenshots)
- [ ] Build config file
    - [ ] Rounded corners value
- [ ] Build how to start customization guide
    - [x] App rebranding
    - [ ] Config File
    - [ ] Services build
- [ ] Build workflows
    - [x] Auto-release on merge to main
    - [x] PR title checks (conventional commits)
    - [x] Lint + format + typecheck + test on PRs
    - [ ] CodeQL

### Sprint 17 — Repo structure: Vite + Turbo baseline (1 - 14 Jan, 2026)

- [x] Wrap frontend with Vite (replace CRA) OR keep CRA but create migration path (pick one and complete it)
- [ ] Introduce Turborepo structure (apps/admin, apps/landing, packages/ui, packages/core, packages/i18n)
- [ ] Set shared lint/format/build tasks + caching
- [ ] Prep “analysis tools integration” skeleton (packages/analysis placeholder + interface contracts)
- [ ] Sign with generator details (every code file + footer)
- [ ] Brand the app with identity (logo, colors, fonts)

### Sprint 18 — Initial dashboard contents (MVP set) (15 - 28 Jan, 2026)

- [ ] Non-Admin dashboard v1:
    - [ ] Account info card
    - [ ] Notifications list
    - [ ] Calendar basic block
- [ ] Admin dashboard v1:
    - [ ] Users stats + list
    - [ ] System health basic widget (static placeholder + API hook)
    - [ ] Subscriptions placeholder section

## Phase 6 — Core UI Engine (Forms + DataTable) (29 Jan - 25 Mar, 2026)

### Sprint 19 — Form engine: foundational input types (29 Jan - 11 Feb, 2026)

- [ ] Build date/time input suite:
    - [ ] date, time, datetime, month, year, weekday
- [ ] Searchable + clearable select (single)
    - [ ] API vs static options
- [ ] Rich text editor (minimal, stable; don’t over-customize)
- [ ] Nested form layouts (v2):
    - [ ] sections + grids
    - [ ] split form (two columns)
    - [ ] within-table editing (basic)

### Sprint 20 — Form engine: advanced inputs + wizard v2 (12 - 25 Feb, 2026)

- [ ] Google maps picker (location input) — minimal integration
- [ ] Multi-select with search + clear
- [ ] Build form wizard v2:
    - [ ] steps, validation per step
    - [ ] save draft locally
    - [ ] resume draft
- [ ] “Form-of-forms” base schema support (enough to render forms from config)

### Sprint 21 — DataTable v2: server-side foundations (26 Feb - 11 Mar, 2026)

- [ ] Replace modals with dedicated CRUD pages
- [ ] Server-side pagination + sorting + search (single search box)
- [ ] Server-side filtering (v2):
    - [ ] text, number, date, boolean
- [ ] Column presets (v2): badge, boolean, progress, avatar/image
- [ ] Row selection + bulk actions (standard actions only)
- [ ] LocalStorage persistence (v2): column visibility + order + pagination info + filters + sort + search

### Sprint 22 — DataTable v2: advanced filters + layouts (12 - 25 Mar, 2026)

- [ ] Advanced filters builder (AND/OR + operators)
- [ ] Default filter values
- [ ] Details panel option (expand row)
- [ ] Responsive cards view (auto switch / manual toggle)
- [ ] Scroll vs pagination mode (choose one as default; keep both optional)

## Phase 7 — Views and UX Platform Layer (26 Mar - 22 Apr, 2026)

### Sprint 23 — Themes + layout switchers (26 Mar - 8 Apr, 2026)

- [ ] Dark/light mode
- [ ] Color theme switcher (primary/secondary + neutral surfaces)
- [ ] Horizontal/vertical layout switcher
- [ ] Boxed/full-width layout option
- [ ] Persist UI preferences (per user in localStorage first; later server)

### Sprint 24 — Data view options v2 (9 - 22 Apr, 2026)

- [ ] Kanban view (basic columns + drag optional later)
- [ ] Gallery / photo grid view
- [ ] Charts + stat cards (basic library + patterns)
- [ ] Toaster/notifications system (app-wide)

## Phase 8 — Backend APIs for Generator Features (23 Apr - 18 May, 2026)

### Sprint 25 — Platform APIs v2 (23 Apr - 4 May, 2026)

- [ ] Prepare API key for integration with other systems BE / FE apps.
- [ ] API: return values of `TablesNames` (and metadata needed for generator)
- [ ] API: export file by field & filters (CSV/XLSX pipeline contract)
- [ ] Data localization support contract (server returns locale-aware labels where needed)
- [ ] Advanced workflows
    - [ ] Ci/Cd to main service providers (AWS, GCP, Azure)
    - [ ] Unit test

### Sprint 26 — Auth integrations v2 (5 - 18 May, 2026)

- [ ] OAuth login integration (Google + Microsoft) with clean provider abstraction
- [ ] Provider selection config (enabled/disabled per env/settings)
- [ ] UX: login method switching + fallback email/pass

## Phase 9 — Admin Platform “Settings & Ops” (19 May - 29 Jun, 2026)

### Sprint 27 — Onboarding + first-login wizard (19 May - 2 Jun, 2026 )

- [ ] Onboarding flow (admin settings + first login trigger)
- [ ] Required setup checklist (org name/logo, default language/timezone, login methods)
- [ ] Persist onboarding completion state

### Sprint 28 — Admin advanced settings v2 (2 - 15 Jun, 2026)

Implement only the “must-have knobs” first:

- [ ] Password policy (min length, complexity)
- [ ] Session timeout + login attempts limit
- [ ] Enabled languages + default language
- [ ] File upload limits (max size, max count)
- [ ] Basic integrations settings (API keys storage placeholder)

### Sprint 29 — Content management v2 (16 - 29 Jun, 2026)

- [ ] Policy / Terms with localization
- [ ] Landing page content management (basic sections data model)
- [ ] Files management (simple library + tagging)

---

## To Plan / Backlog (Post-Roadmap)

- [ ] Open-search integration (ElasticSearch / MeiliSearch)
- [ ] Blockchain integration (basic support for data storage/verification)
- [ ] Multi-tenant support (orgs, subdomains, data isolation)
- [ ] Generate automated tests (unit + integration) for core components
- [ ] Build form analytics (submission stats, abandonment rates)
- [ ] Build dashboard analytics (view stats, widget interactions)
- [ ] Build A/B testing framework (for forms and dashboards)
- [ ] Split admin panel into separate app (if not already done in Turborepo)
- [ ] Build analysis tools integration (actual implementation beyond prep)
- [ ] Build technical & business documentation (full suite)
- [ ] Advanced user controls (dashboard customization)
- [ ] Announcements / manual notifications generation service
- [ ] Email integration & management service (templates, scheduling, logs)
- [ ] Build user-level permissions
- [ ] Build record-level permissions
- [ ] Advanced form features (conditional logic, calculated fields)
- [ ] Advanced DataTable features (pivot tables, custom formulas)
- [ ] Mobile app (Flutter)
- [ ] PWA support
- [ ] Offline support (caching, local storage sync)
- [ ] Performance optimizations (lazy loading, code splitting)
- [ ] Accessibility improvements (WCAG compliance)
- [ ] Internationalization enhancements (Admin-panel controlled localization)
- [ ] Third-party integrations (CRM, ERP, marketing tools)
- [ ] Data export/import tools (beyond CSV/XLSX)
- [ ] Advanced security features (2FA, SSO)
- [ ] User feedback and support system (in-app chat)
- [ ] Build usability testing and UX improvements
- [ ] Full template dashboard catalog (e-commerce, SIS, CRM, etc.)
    - [ ] e-Commerce
    - [ ] Marketplace / 3rd party sellers
    - [ ] Delivery
    - [ ] Ride Hailing
    - [ ] Booking system
        - [ ] Venue
        - [ ] Tickets
        - [ ] Events
        - [ ] Appointments
    - [ ] e-Learning
    - [ ] Telemedicine
    - [ ] Real estate listing
    - [ ] Community / Social
        - [ ] Public
        - [ ] Private
    - [ ] Personal Financials
    - [ ] Project Management
    - [ ] CRM
    - [ ] search engine
    - [ ] Recruiting platform
    - [ ] HRMS
    - [ ] News portal
    - [ ] Personal-portfolio
    - [ ] SIS
    - [ ] Dynamic CMS (using form of forms + route-based content rendering)
    - [ ] Encyclopedia
        - [ ] Community contributions
        - [ ] Closed contributions
    - [ ] Task management tool
    - [ ] Collection management system
    - [ ] Event management system
        - [ ] planning
        - [ ] scheduling
        - [ ] ticketing
        - [ ] promotion
        - [ ] community engagement
    - [ ] Forms / requests management system
    - [ ] Client side
    - [ ] reviewer side
    - [ ] Checker side
    - [ ] Admin side
    - [ ] Video share platform
    - [ ] Video streaming platform
    - [ ] Firebase CMS
- [ ] Commit-based code generation
- [ ] AI-assisted features planing
- [ ] AI-assisted code generation (initial experiments + feasibility study)
- [ ] AI-assisted testing (unit/integration test generation)
- [ ] AI-assisted documentation (auto-generate/update docs based on code changes)
- [ ] Real-time features (WebSockets, live updates)
- [ ] GraphQL API support
- [ ] Server-side rendering (SSR) support
- [ ] Framework Variants (Frontend React alternatives, e.g., Vue, Angular + Backend variants, e.g., Express.js, GoLang, Java, Django)
- [ ] Micro-frontend + micro-service architecture support
- [ ] Database variants (Firebase, MySQL, MongoDB options)
- [ ] CI/CD pipeline templates (GitHub Actions, GitLab CI, Jenkins / service-based options e.g. aws amplify + beanstalk ...etc)

- [ ] Caching
