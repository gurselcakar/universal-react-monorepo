# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Architecture, scope, decisions | Morpheus | System design, trade-off analysis, what to build next |
| Code review | Morpheus | PR review, quality gates, pattern enforcement |
| Mobile app (Expo/React Native) | Trinity | expo-router screens, NativeWind on native, mobile auth UX |
| Web app (Next.js) | Neo | App Router, SSR, server components, web routing |
| UI demo / component showcase | Neo | apps/ui-demo, TanStack Router routes |
| API / tRPC | Tank | tRPC routers, procedures, API design |
| Database / Drizzle | Tank | Schema changes, migrations, queries |
| Auth / better-auth | Tank | Auth config, session management, providers |
| Design system / tokens | Mouse | packages/theme, color, typography, spacing |
| Component visual design | Mouse | Shared component aesthetics, UX patterns, accessibility |
| UI/UX flows | Mouse | Interaction design, states, transitions |
| Testing / QA | Oracle | Unit tests, integration tests, edge cases, cross-platform verification |
| TypeScript quality | Oracle | Type safety review, type-level bug detection |
| Session logging | Scribe | Automatic — never needs routing |
| Work queue / backlog | Ralph | Monitoring, issue triage, keep-alive |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Morpheus |
| `squad:morpheus` | Pick up issue and complete the work | Morpheus |
| `squad:trinity` | Pick up issue and complete the work | Trinity |
| `squad:neo` | Pick up issue and complete the work | Neo |
| `squad:tank` | Pick up issue and complete the work | Tank |
| `squad:oracle` | Pick up issue and complete the work | Oracle |
| `squad:mouse` | Pick up issue and complete the work | Mouse |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, the **Lead** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Lead review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn the tester to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. The Lead handles all `squad` (base label) triage.
