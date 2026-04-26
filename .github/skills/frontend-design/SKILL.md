---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces. Implement real working code with exceptional attention to aesthetic details and creative choices — always rooted in the established brand system.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Brand Guidelines — NON-NEGOTIABLE

This workspace has an established brand system defined in `docs/brand-guidelines.md` and `packages/theme/src/theme.ts`. **You MUST follow it. It is not optional.**

### Colors — Use the Token System ONLY

**NEVER introduce custom color values (hex, rgb, hsl, named colors).** All colors must come exclusively from the theme token system:

**Surface & Text tokens:** `--canvas`, `--canvas-raised`, `--canvas-feature`, `--ink`, `--ink-muted`, `--ink-faint`, `--border`, `--border-strong`

**Entity tokens (use each only for its entity — do NOT mix):**

- Tasks: `--task` (`#4A6FA5` slate blue), `--task-light`
- Habits: `--habit` (`#C17A3A` warm amber), `--habit-light`
- Goals: `--goal` (`#3A7A5C` forest green), `--goal-light`

**Semantic tokens:** `--completed`, `--missed`, `--skipped`, `--overdue`, `--destructive`

**Alias tokens (for component compatibility):** `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`, `--muted`, `--muted-foreground`, `--ring`, `--destructive-foreground`

In Tailwind, reference these as CSS variables (e.g. `bg-[var(--canvas)]`, `text-[var(--ink)]`) or via the theme's utility classes if configured.

> **Exception:** Custom colors are only acceptable for purely decorative effects (e.g. a noise texture overlay, a grain SVG filter value) where no semantic token applies and the value carries zero brand meaning. This is rare. When in doubt, use a token.

### Typography — Use the Brand Fonts

- **Display/Headings:** Outfit (Google Fonts, variable weight 100–900)
- **Body/UI:** DM Sans (Google Fonts, variable)
- **Mono (numbers, streaks, dates):** JetBrains Mono

Do NOT use Inter, Roboto, Arial, system-ui, or any other font. These are banned from this codebase.

### Spacing — 8px Base Unit

All spacing must be multiples of 8px: `4, 8, 12, 16, 24, 32, 48, 64, 96px`. Use the `--space-*` tokens or equivalent Tailwind spacing scale values.

### Other Brand Rules

- **Never pure white (`#FFF`) or pure black (`#000`)** — always use canvas/ink tokens
- **Red is banned from habit tracking** — use `--missed` (terracotta) instead
- **Entity colors are sacred** — `--task` blue never appears in habit UI, `--habit` amber never in goal UI
- **Border radius:** `--radius-sm` (6px) buttons/inputs, `--radius-md` (10px) cards, `--radius-lg` (16px) modals, `--radius-full` (9999px) avatars/pills
- **Shadows use warm tones:** `--shadow-sm/md/lg` with `rgba(42, 38, 35, …)` — never blue-grey shadows

---

## Design Thinking

Before coding, understand the context and how to express it within the brand:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Entity context**: Is this showing Tasks, Habits, Goals, or a mix? Apply the correct entity visual language from the brand guidelines.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: How can this be MEMORABLE within the brand system? Great layout, motion, and typographic hierarchy — not custom colors.

**CRITICAL**: The brand system is the canvas. Creativity lives in layout, motion, spatial composition, typographic expression, and interaction design — not in inventing new colors.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:

- Production-grade and functional
- Visually striking and memorable — within the brand
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

---

## MANDATORY: Use Shared UI Primitives

**This is non-negotiable.** All UI components MUST be built using the shared UI primitives library from `packages/shared-frontend/ui/`.

**Rule:** Do NOT invent, duplicate, or create custom UI components. The shared primitives are the canonical source of truth for all UI across the monorepo (mobile, web, ui-demo).

### Available Shared Primitives

Import and compose from `@packages/shared-frontend/ui`:

- **Form inputs:** `Input`, `Select`, `Checkbox`, `Radio`, `Textarea`
- **Surface components:** `Card`, `Badge`
- **Layout & structure:** Use Tailwind + shared foundations
- **Other primitives:** Check `packages/shared-frontend/src/ui/` for the complete catalog

**Import pattern:**

```tsx
import { Card, Badge, Input } from '@packages/shared-frontend/ui'
// Or from the package directly
import { Button } from '@packages/shared-frontend'
```

### When to Extend vs. Reuse

- **Existing primitive covers your need?** Use it directly. Apply brand tokens and Tailwind utilities to customize styling, NOT custom CSS.
- **Need a variant?** Extend the primitive with props or compose multiple primitives together.
- **Need something completely new?** Add it to the shared primitives library (`packages/shared-frontend/src/ui/`), get it reviewed, then use it everywhere. Do NOT create app-local replacements.

### Exception: App-Specific Layouts

Layout compositions that are specific to one app (web page sections, mobile screens, dashboard arrangements) may be built locally. But every leaf component and interactive element MUST come from the shared UI library.

---

## Frontend Aesthetics Guidelines

Focus on:

- **Typography**: Use Outfit for display/headings, DM Sans for body/UI, JetBrains Mono for numbers. Exploit the full weight range. Use negative tracking at display sizes (`-0.02em` to `-0.025em`). Max line length 65ch for body text.
- **Color & Theme**: Use only the token system above. Brand warmth comes from the canvas tones and entity colors — trust the system, don't fight it.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth using the canvas token family. Add textures, noise overlays, and geometric patterns that complement — not override — the warm parchment/mahogany palette. Layered transparencies, warm-toned shadows, and decorative borders all work within the system.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Layouts need real craft — spacing rhythm, typographic hierarchy, and motion choreography carry the design, not color invention.

Remember: the brand is Warm Modernism — Swiss editorial precision with craft warmth. Execute that vision with discipline and creativity in equal measure.

---

## MANDATORY: Demo Every New UI Component in `apps/ui-demo`

**All new shared UI primitives added to `packages/shared-frontend/src/ui/` MUST be demonstrated in the `apps/ui-demo` app.** This is non-negotiable — a component without a demo is considered incomplete.

### What a Demo Must Show

- **All variants** — every `entity`, `variant`, `size`, or other prop that changes rendering
- **Composition** — how sub-components (`CardHeader`, `CardFooter`, etc.) work together
- **States** — default, hover (web), pressed (native), disabled if applicable
- **Real content** — use plausible task/habit/goal copy, not "Lorem ipsum" or placeholder text

### Where to Add It

Add a new `const XyzSection = () => (...)` component to `apps/ui-demo/src/routes/index.tsx`, following the same pattern as `TypographySection`, `ButtonsSection`, and `ColorsSection`:

1. Use `<SectionNumber n="0N" />`, `<SectionHeading>`, and `<SubLabel>` for consistent section structure
2. Add `<XyzSection />` inside `<main>` in `ComponentLibrary`
3. Add a nav link in the header `['Typography', 'Buttons', 'Colors', 'YourComponent']`
4. Assign the next sequential section number

### Section Structure Template

```tsx
const CardSection = () => (
  <section className="border-border border-t py-16" id="cards">
    <div className="mb-10">
      <SectionNumber n="04" />
      <SectionHeading>Cards</SectionHeading>
      <p className="text-foreground-muted font-body mt-2 text-sm">
        Brief description of the component and its purpose
      </p>
    </div>
    {/* variant groups with <SubLabel> headers */}
  </section>
)
```
