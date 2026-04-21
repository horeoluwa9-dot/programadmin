
# ABC Program Admin Dashboard — v1 Plan

A full UI shell for the **Africa Business College** Program Admin system. All 13 modules will be navigable with realistic mock data, charts, and interactions. No auth/backend yet — except a working **AI Admin Assistant** powered by Lovable AI.

## Design system
- **Theme:** Light, enterprise SaaS / Bloomberg-style data density
- **Palette:** Deep Navy primary, Gold accent, Green (success), Amber (warning), Red (error), light gray surfaces — all defined as HSL tokens in `index.css` + Tailwind config
- **Typography:** Tight, data-friendly sans (Inter); larger numerals for KPIs
- **Components:** shadcn cards, tables, tabs, dialogs, charts (Recharts), heatmaps, sparklines, badges, command palette

## Layout
- **Collapsible sidebar** (mini-icon mode) with the 13 sections
- **Top bar:** global search (⌘K command palette), system alerts bell, messages, AI Assistant launcher, admin profile menu
- **Right context panel** (toggleable on dashboard pages): system alerts, AI insights, quick actions

## Pages & modules

1. **Overview Dashboard (`/`)** — Welcome header, 6 KPI cards (Active Programs, Enrolled Students, Faculty Assigned, Active Simulations, Completion %, At-Risk Students), enrollment growth line chart, completion trend, engagement heatmap, faculty workload bar chart, system alerts panel, quick action grid, live activity feed.

2. **Programs (`/programs`)** — Grid of program cards + "New Program" CTA. Detail page (`/programs/:id`) with tabs: Overview, **Curriculum Builder** (drag-and-drop modules → lessons → assignments using dnd-kit), Faculty Assignment, Cohort Mapping, Analytics.

3. **Courses (`/courses`)** — Library grid. Course Builder (`/courses/:id`) with 3-pane layout: module tree (left), lesson editor (center), AI content assistant + preview (right).

4. **Cohorts (`/cohorts`)** — List/grid with progress bars. Detail tabs: Members (with at-risk tags), Progress, Assignments, Collaboration.

5. **Faculty Management (`/faculty`)** — Directory + workload heatmap + assignment panel.

6. **Mentors (`/mentors`)** — Directory + allocation view + availability heatmap.

7. **Students (`/students`)** — Searchable directory with filters. Profile page: academic progress, simulation performance, grades, mentor feedback, risk indicators.

8. **Assessments (`/assessments`)** — List of quizzes/assignments, submission tracking, grading queue.

9. **Simulations Control (`/simulations`)** — Active/Scheduled/Completed tabs, Simulation Builder (scenario, difficulty, variables, outcome rules), real-time monitoring dashboard, evaluation panel.

10. **Analytics & Reports (`/analytics`)** — Institutional dashboard, academic performance comparisons, AI Risk Analysis Engine cards, export buttons (PDF/Excel).

11. **Announcements (`/announcements`)** — Message editor, audience selector (programs/cohorts/individuals), schedule, preview, sent history.

12. **Settings (`/settings`)** — Tabs: Institution profile, Branding, Notification rules, Security, System.

13. **Permissions / RBAC (`/permissions`)** — Roles list (Super Admin, Program Admin, Faculty, Mentor, Student) with a permission matrix UI (visual only, no enforcement in v1).

## AI Admin Assistant (working)
- Floating launcher in top bar opens a **slide-over chat panel**
- Streaming responses via a Supabase edge function calling **Lovable AI Gateway** (default model: `google/gemini-3-flash-preview`)
- System prompt frames it as the ABC institutional assistant; can answer questions about the (mock) metrics shown on screen, suggest actions, and summarize dashboards
- Insight cards on the Overview page surface AI-generated suggestions (hardcoded mock for cards; live chat for the panel)
- Handles 429 / 402 errors with friendly toasts
- Requires enabling **Lovable Cloud** to provision the `LOVABLE_API_KEY` secret and host the edge function

## Mock data
- A single `src/data/mock.ts` with realistic African business school context: programs (Leadership Excellence, Entrepreneurship Lab, Strategic Finance, Digital Transformation…), cohorts (e.g., "Lagos '25 Cohort A"), faculty, students, and time-series for charts
- Used consistently across pages so numbers reconcile

## Out of scope for v1 (called out for later)
- Authentication, real RBAC enforcement, route guards
- Persistence / database tables and CRUD
- Real file uploads, video hosting
- Real exports (buttons will trigger a toast)

## Suggested follow-up iterations
1. Add Lovable Cloud auth + `user_roles` table + route guards
2. Wire Programs / Courses / Cohorts CRUD to the database
3. Real Students + Assessments persistence and grading flows
4. Real Simulations engine + analytics queries
