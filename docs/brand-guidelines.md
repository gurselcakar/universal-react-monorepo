# Brand Guidelines — SaaS Task & Habit Tracker

> A design system rooted in **Intentional Warmth**: structured enough to trust, human enough to forgive.

---

## 1. Design Philosophy

### The Problem We're Solving Visually

Every competitor in the productivity space converges on the same lifeless aesthetic — pale grays, razor-thin type, cold blues, identical card layouts. They look like tools built for robots. Our users aren't robots. They're humans trying to balance buying groceries, drinking enough water, and writing a novel — three fundamentally different intentions crammed into the same checkbox.

### Our Aesthetic Position: Warm Modernism

Imagine an architect's drafting table in a sunlit studio. The instruments are precise. The lines are clean. The wood is warm. Everything serves its purpose and nothing is wasted. That is our north star.

We combine **Swiss editorial precision** (clear hierarchy, relentless grid discipline, purposeful whitespace) with **craft warmth** (textured backgrounds, organic accents, earthy tones, considered details). The result: an interface that feels like a premium instrument you'd find in a design museum — not a SaaS dashboard.

### Core Principles

| Principle       | Meaning                                | What It Looks Like                                                                                        |
| --------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Intentional** | Every pixel serves the user's goal     | No decorative clutter. If it doesn't help the user act, it doesn't exist.                                 |
| **Warm**        | Technology with a human pulse          | Warm color temperatures, textured surfaces, rounded-but-not-bubbly corners, serif headings.               |
| **Honest**      | Three entities, three visual languages | Tasks, Habits, and Goals look and behave differently — because they _are_ different.                      |
| **Forgiving**   | No guilt in the interface              | Missed habits fade quietly. No angry reds screaming at the user. Skipped items are treated with softness. |
| **Layered**     | Depth reveals complexity gradually     | The Today view is simple. A Goal view is rich. Surface is calm; depth is powerful.                        |

---

## 2. Color System

### Philosophy

Our palette is drawn from natural materials — clay, slate, parchment, forest canopy, amber resin. No neon. No synthetic purples. No gradients-for-the-sake-of-gradients. Colors are warm, grounded, and carry semantic meaning across the three entity types.

### Core Palette

#### Surface & Text

| Token              | Hex       | Usage                                                  |
| ------------------ | --------- | ------------------------------------------------------ |
| `--canvas`         | `#FAF8F4` | Primary background. Warm parchment — never pure white. |
| `--canvas-raised`  | `#F3F0EA` | Cards, modals, elevated surfaces.                      |
| `--canvas-feature` | `#EDEAE4` | Input areas                                            |
| `--ink`            | `#2A2623` | Primary text. Warm near-black — never `#000`.          |
| `--ink-muted`      | `#6B6560` | Secondary text, timestamps, metadata.                  |
| `--ink-faint`      | `#A39E97` | Placeholders, disabled states, tertiary info.          |
| `--border`         | `#DDD8D0` | Subtle dividers and card borders.                      |
| `--border-strong`  | `#C4BEB5` | Active/focused borders, stronger separation.           |

#### Entity Colors — The Three Voices

Each entity type owns a color that runs through every interaction associated with it. These are not interchangeable.

| Entity             | Token           | Hex       | Rationale                                                                                       |
| ------------------ | --------------- | --------- | ----------------------------------------------------------------------------------------------- |
| **Tasks**          | `--task`        | `#4A6FA5` | Slate blue. Structured, reliable, action-oriented. The color of a well-organized blueprint.     |
| **Tasks (light)**  | `--task-light`  | `#EBF0F7` | Tinted surface for task cards/selections.                                                       |
| **Habits**         | `--habit`       | `#C17A3A` | Warm amber. Organic, living, rhythmic. The color of honey and morning light.                    |
| **Habits (light)** | `--habit-light` | `#FBF3E8` | Tinted surface for habit cards.                                                                 |
| **Goals**          | `--goal`        | `#3A7A5C` | Forest evergreen. Growth, aspiration, the long view. The color of a tree you planted years ago. |
| **Goals (light)**  | `--goal-light`  | `#EAF5F0` | Tinted surface for goal views.                                                                  |

#### Semantic Colors

| Token         | Hex       | Usage                                                                                  |
| ------------- | --------- | -------------------------------------------------------------------------------------- |
| `--completed` | `#3A7A5C` | Success/completion (shares Goal green — completing things serves goals).               |
| `--missed`    | `#B86B5A` | Missed habits. Muted terracotta — NOT angry red. Quiet acknowledgment, not punishment. |
| `--skipped`   | `#9B90B8` | Skipped habits. Soft lavender — neutral, no judgment, preserves streak.                |
| `--overdue`   | `#C4704A` | Overdue tasks. Warm clay-orange — urgent but not hostile.                              |
| `--danger`    | `#A84E4E` | Destructive actions only (delete account, remove goal). Reserved and rare.             |

### Dark Mode

Dark mode flips the canvas while preserving warmth. No blue-black. No pure `#000`. Think: mahogany desk at midnight.

| Token              | Light     | Dark      |
| ------------------ | --------- | --------- |
| `--canvas`         | `#FAF8F4` | `#1C1A16` |
| `--canvas-raised`  | `#F3F0EA` | `#252220` |
| `--canvas-feature` | `#FAF9F6` | `#2C2A26` |
| `--ink`            | `#2A2623` | `#EDE9E2` |
| `--ink-muted`      | `#6B6560` | `#9B958E` |
| `--ink-faint`      | `#A39E97` | `#5E5951` |
| `--border`         | `#DDD8D0` | `#3A3632` |
| `--border-strong`  | `#C4BEB5` | `#4E4943` |

Entity colors remain the same in dark mode — they're already calibrated for contrast on dark surfaces. The `*-light` tints shift to `*-dark` variants at ~12% opacity over the dark canvas.

### Color Rules

1. **Never use pure white (`#FFF`) or pure black (`#000`)** anywhere in the interface.
2. **Entity colors are sacred.** `--task` blue is never used for habit UI. `--habit` amber is never used for goal progress. Mixing them destroys the visual language.
3. **Red is banned from habit tracking.** Missed habits use `--missed` (terracotta). The word "overdue" never appears next to a habit.
4. **Backgrounds carry warmth.** Even in dark mode, surfaces lean warm (brown-blacks, not blue-blacks).
5. **Accent colors at 60-30-10.** Canvas tones dominate (60%). Ink and borders provide structure (30%). Entity colors are concentrated accents (10%) — rare enough to carry meaning.

---

## 3. Typography

### Philosophy

Typography signals competence. We use a **two-weight sans-serif system** — a sharp geometric display face for hierarchy and authority, paired with a tighter geometric for body text and UI. Both are professional, clean, and modern. The display face commands attention; the body face stays out of the way. Together they say: _this is a serious tool built by people who sweat the details._

### Type Stack

| Role          | Family             | Fallback                | Source                                                                                                                                                      |
| ------------- | ------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Display**   | **Outfit**         | system-ui, sans-serif   | [Google Fonts](https://fonts.google.com/specimen/Outfit) — Variable font. Geometric with slightly wider proportions that give it presence at display sizes. |
| **Body / UI** | **DM Sans**        | system-ui, sans-serif   | [Google Fonts](https://fonts.google.com/specimen/DM+Sans) — Variable font. Tight, structured geometric. Exceptional at small UI sizes.                      |
| **Mono**      | **JetBrains Mono** | ui-monospace, monospace | For timestamps, streaks, progress numbers, code.                                                                                                            |

### Why These Fonts

- **Outfit** is a geometric sans with generously wide letterforms and clean, confident strokes. At display sizes its proportions feel commanding and premium — the kind of type you see on a well-designed fintech dashboard or an architect's presentation, not a generic landing page. Variable weight axis from 100–900 gives full control.
- **DM Sans** is a low-contrast geometric sans-serif designed by Colophon Foundry for Google. It's tighter and more structured than Outfit, with slightly shorter ascenders and precise geometry that makes it extremely legible at 12–16px. The optical size axis ensures sharpness at every scale. It avoids the blandness of Inter while remaining unmistakably professional.

### Type Scale

Based on a **1.250 (Major Third)** ratio, anchored at `16px` body size.

| Token                | Size                 | Weight             | Line Height | Tracking   | Usage                                  |
| -------------------- | -------------------- | ------------------ | ----------- | ---------- | -------------------------------------- |
| `--text-display`     | `36px` / `2.25rem`   | Outfit 700         | 1.15        | `-0.025em` | Page titles ("Today", "Goals")         |
| `--text-h1`          | `28px` / `1.75rem`   | Outfit 600         | 1.2         | `-0.02em`  | Section headings                       |
| `--text-h2`          | `22px` / `1.375rem`  | Outfit 600         | 1.25        | `-0.015em` | Card titles, goal names                |
| `--text-h3`          | `18px` / `1.125rem`  | DM Sans 600        | 1.35        | `-0.005em` | Subsection headings, list group labels |
| `--text-body`        | `16px` / `1rem`      | DM Sans 400        | 1.55        | `0`        | Body text, descriptions                |
| `--text-body-strong` | `16px` / `1rem`      | DM Sans 600        | 1.55        | `0`        | Emphasized body text                   |
| `--text-small`       | `14px` / `0.875rem`  | DM Sans 400        | 1.45        | `0.005em`  | Metadata, helper text, timestamps      |
| `--text-caption`     | `12px` / `0.75rem`   | DM Sans 500        | 1.4         | `0.02em`   | Labels, badges, streak counters        |
| `--text-mono`        | `13px` / `0.8125rem` | JetBrains Mono 500 | 1.5         | `0.03em`   | Numbers in progress, streaks, dates    |

### Typography Rules

1. **Outfit is for hierarchy. DM Sans is for everything else.** Display titles, page headings, and goal names use Outfit. Buttons, inputs, labels, body text, and all interactive UI use DM Sans.
2. **Tighten tracking at display sizes.** Outfit at 28px+ should use negative tracking (`-0.02em` to `-0.025em`) for a polished, professional look. Never track it loosely.
3. **Streak numbers and progress percentages** always use `--text-mono` (JetBrains Mono). Numbers deserve their own voice.
4. **Minimum text size is 12px.** Nothing smaller, ever. Accessibility is non-negotiable.
5. **Sentence case everywhere.** No ALL CAPS except for `--text-caption` badges and status labels.
6. **Line lengths max at 65 characters** for body text. Readability degrades beyond this.

---

## 4. Spacing & Layout

### Spacing Scale

An **8px base unit** system. Every spacing value is a multiple of 8. No exceptions.

| Token       | Value  | Usage                                                   |
| ----------- | ------ | ------------------------------------------------------- |
| `--space-1` | `4px`  | Hairline gaps. Icon-to-label padding.                   |
| `--space-2` | `8px`  | Tight padding. Between related inline elements.         |
| `--space-3` | `12px` | Inner card padding (compact).                           |
| `--space-4` | `16px` | Standard inner padding. Stack spacing between elements. |
| `--space-5` | `24px` | Card padding. Section inner spacing.                    |
| `--space-6` | `32px` | Between sections. Major group separation.               |
| `--space-7` | `48px` | Between page regions.                                   |
| `--space-8` | `64px` | Page-level breathing room. Top/bottom margins.          |
| `--space-9` | `96px` | Hero sections. Landing page vertical rhythm.            |

### Layout Grid

| Context             | Grid                             | Max Width                | Margins                         |
| ------------------- | -------------------------------- | ------------------------ | ------------------------------- |
| **Mobile**          | Single column, fluid             | `100%`                   | `--space-4` (16px) side margins |
| **Tablet**          | 8-column, fluid                  | `768px`                  | `--space-5` (24px) side margins |
| **Desktop sidebar** | Fixed 260px sidebar + fluid main | `1280px` main area       | `--space-6` (32px) main padding |
| **Desktop content** | 12-column within main area       | `860px` for text content | Auto-centered                   |

### Border Radius

| Token           | Value    | Usage                                         |
| --------------- | -------- | --------------------------------------------- |
| `--radius-sm`   | `6px`    | Buttons, badges, inputs, small chips.         |
| `--radius-md`   | `10px`   | Cards, dropdowns, popovers.                   |
| `--radius-lg`   | `16px`   | Modals, large panels, habit completion rings. |
| `--radius-full` | `9999px` | Avatars, circular progress indicators, pills. |

Corners are rounded but not bubbly. `6px` on a button says "friendly and modern." `20px` would say "children's app." We're in between.

### Elevation & Shadow

We use warm-toned shadows (brown-tinged, never blue-gray) to maintain temperature consistency.

| Token            | Value                                  | Usage                                                                           |
| ---------------- | -------------------------------------- | ------------------------------------------------------------------------------- |
| `--shadow-sm`    | `0 1px 3px rgba(42, 38, 35, 0.06)`     | Subtle lift. Cards at rest.                                                     |
| `--shadow-md`    | `0 4px 12px rgba(42, 38, 35, 0.08)`    | Hovered cards. Active items.                                                    |
| `--shadow-lg`    | `0 8px 30px rgba(42, 38, 35, 0.12)`    | Modals, popovers, floating elements.                                            |
| `--shadow-focus` | `0 0 0 3px var(--entity-color / 0.25)` | Focus rings. Adapts to entity context (blue for tasks, amber for habits, etc.). |

---

## 5. Entity Visual Language

This is the heart of the design system. Each entity type has its own visual DNA — its own shape language, interaction patterns, and micro-details. Users should be able to _feel_ the difference between a task, a habit, and a goal without reading a single word.

### Tasks — The Checkbox World

**Visual DNA:** Angular. Structured. Nest-aware.

| Property          | Specification                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Primary shape** | Square checkbox with `--radius-sm` corners                                                                                                                         |
| **Card style**    | `--canvas-raised` background, `1px --border` border, left border accent `3px solid --task` on hover/active                                                         |
| **Nesting**       | Indented `--space-5` per level. Vertical tree-line connector in `--border` color. Parent checkbox becomes a **progress ring** when it has children (shows X of Y). |
| **Completion**    | Checkbox fills with `--task` blue. Strikethrough animates across title over `300ms ease-out`. Card fades to 60% opacity.                                           |
| **Overdue**       | Left border shifts to `--overdue`. Due date label turns `--overdue`. No other drama.                                                                               |
| **Drag handle**   | Six-dot grip icon appears on hover, left of checkbox.                                                                                                              |

### Habits — The Ring World

**Visual DNA:** Circular. Rhythmic. Warm.

| Property           | Specification                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Primary shape**  | Circular completion ring (like Apple's Activity Ring but single).                                                                                            |
| **Card style**     | `--canvas-raised` background with a subtle `--habit-light` wash. Softly rounded `--radius-md`.                                                               |
| **Streak display** | `--text-mono` number centered below the ring. Flame icon (🔥) only appears at 7+ days. No icon pressure before that.                                         |
| **Completion**     | Ring animates clockwise fill with `--habit` amber, `500ms ease-in-out`. Satisfying haptic on mobile. Gentle scale-up pulse `1.05x → 1x` over `200ms`.        |
| **Skip**           | Dedicated "Skip" button (not buried in a menu). Ring fills with `--skipped` lavender. Label reads "Skipped" in `--ink-muted`. Streak number stays. No guilt. |
| **Missed**         | Ring stays empty. Date label shows `--ink-faint`. Item is **not** carried forward. It simply exists in history as a gap. No red. No badge.                   |
| **Weekly view**    | Seven small circles in a row (Mon–Sun). Filled = completed, half = skipped, empty = missed/future. A rhythm visualization, not a judgment.                   |

### Goals — The Progress World

**Visual DNA:** Expansive. Layered. Green-threaded.

| Property                 | Specification                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary shape**        | Horizontal progress bar with rounded caps (`--radius-full`).                                                                                                        |
| **Card style**           | Larger card with `--space-6` padding. `--goal-light` background. `--goal` accent on progress bar fill.                                                              |
| **Progress calculation** | Dynamically computed: weighted average of child task completion + habit adherence for the period. Displayed as `--text-mono` percentage.                            |
| **Children preview**     | Below the progress bar: a compact row showing "4/7 tasks · 85% habits this month" in `--text-small`.                                                                |
| **Status badges**        | Pill-shaped. `Active` = `--goal` green fill. `Paused` = `--ink-faint` outline. `Achieved` = `--goal` with checkmark. `Abandoned` = `--ink-faint` with line-through. |
| **Expand interaction**   | Clicking a Goal card expands to a full-page view with two tabs: "Tasks" and "Habits." Each tab renders items in their respective visual language.                   |

---

## 6. Component Patterns

### Buttons

| Variant       | Background                      | Text          | Border                | Usage                                                               |
| ------------- | ------------------------------- | ------------- | --------------------- | ------------------------------------------------------------------- |
| **Primary**   | `--ink`                         | `--canvas`    | none                  | Main actions: "Add Task", "Save"                                    |
| **Secondary** | `transparent`                   | `--ink`       | `1px --border-strong` | Alternative actions: "Cancel", "Skip Habit"                         |
| **Entity**    | `--task` / `--habit` / `--goal` | `white`       | none                  | Context-specific actions: "Add Subtask" (blue), "Log Habit" (amber) |
| **Ghost**     | `transparent`                   | `--ink-muted` | none                  | Tertiary: "Show completed", overflow menus                          |
| **Danger**    | `--danger`                      | `white`       | none                  | Destructive: "Delete Goal" (requires confirmation)                  |

All buttons: `--radius-sm`, `--text-body-strong`, `--space-2` vertical / `--space-4` horizontal padding, `150ms` background transition.

### Inputs

- Background: `--canvas-feature`
- Border: `1px solid --border`, shifts to `--border-strong` on focus
- Focus ring: `--shadow-focus` using the current entity color
- Placeholder text: `--ink-faint`, DM Sans italic
- Border radius: `--radius-sm`
- Height: `44px` (touch-friendly minimum)

### Cards

- Background: `--canvas-raised`
- Border: `1px solid --border`
- Radius: `--radius-md`
- Padding: `--space-5`
- Hover: Elevate to `--shadow-md`, `150ms ease`
- Active/selected: Left border accent `3px solid [entity-color]`

### Navigation — Sidebar

The sidebar is the spatial anchor. It uses a warm dark surface to feel like a bookshelf beside a desk.

| Property          | Value                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Width             | `260px` (collapsible to `56px` icon-only)                                                                                |
| Background        | `--ink` (warm near-black) in light mode, `--canvas-feature` in dark mode                                                 |
| Text              | `--canvas` in light mode, `--ink` in dark mode                                                                           |
| Active item       | `--canvas / 0.1` background highlight + left `3px` accent bar                                                            |
| Sections          | "Today" (top), "Goals" group, "More" (settings, archive)                                                                 |
| Entity indicators | Small colored dots (`6px` circles) next to section labels: blue dot for Tasks section, amber for Habits, green for Goals |

### Today View — The Daily Blend

The Today view is the most critical screen. It must seamlessly blend tasks and habits without making them feel like the same thing.

**Layout:**

1. **Header:** Date in `--text-display` Outfit. Day name in `--text-small` all-caps DM Sans. Weather-appropriate greeting optional.
2. **Habits Section:** Horizontal scrollable row of habit rings at the top. Always visible, never below the fold. Each ring is `64px` diameter on mobile, `56px` on desktop.
3. **Tasks Section:** Vertical list below. Grouped by "Morning / Afternoon / Evening" or by Goal, user-configurable. Parent tasks show nested indicator.
4. **Divider:** Between habits and tasks, a subtle `1px --border` line with the text "Tasks" in `--text-caption` centered.

---

## 7. Motion & Animation

### Philosophy

Motion should feel **physical** — like objects have weight and inertia. Not bouncy or playful (we're not a game), not robotic or instant (we're not a spreadsheet). Think: a smooth drawer sliding open, a book page turning, ink appearing on paper.

### Timing Tokens

| Token               | Duration | Easing                              | Usage                                                          |
| ------------------- | -------- | ----------------------------------- | -------------------------------------------------------------- |
| `--motion-instant`  | `100ms`  | `ease-out`                          | Hover states, color shifts, opacity changes                    |
| `--motion-fast`     | `200ms`  | `ease-out`                          | Button presses, checkbox toggles, small state changes          |
| `--motion-normal`   | `300ms`  | `ease-in-out`                       | Card expands/collapses, sidebar toggle, slide-ins              |
| `--motion-slow`     | `500ms`  | `cubic-bezier(0.16, 1, 0.3, 1)`     | Habit ring completion, goal progress updates, page transitions |
| `--motion-dramatic` | `800ms`  | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Streak milestone celebrations, goal achievement                |

### Key Animations

| Moment                                 | Animation                                                                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Task completion**                    | Checkbox fills blue → strikethrough slides L→R across title → card fades to 60% opacity. Sequential, not simultaneous. Total: `400ms`. |
| **Habit ring fill**                    | Ring draws clockwise from 12 o'clock → scale pulse `1.0 → 1.05 → 1.0`. SVG stroke-dashoffset animation.                                |
| **Streak milestone (7, 30, 100 days)** | Ring completion + subtle particle burst (confetti-style dots in `--habit` amber) + streak number counter animation.                    |
| **Goal progress update**               | Progress bar width transitions smoothly. Percentage counter ticks up like an odometer.                                                 |
| **Card enter (list)**                  | Staggered fade-up: `translateY(12px) → 0`, opacity `0 → 1`, `50ms` delay between items.                                                |
| **Sidebar collapse**                   | Width animates `260px → 56px`. Labels fade out before width shrinks. Icons remain centered.                                            |
| **Page transition**                    | Content crossfade: outgoing fades out (`150ms`), incoming fades in from `translateY(8px)` (`200ms`).                                   |
| **Delete**                             | Card collapses height to `0` with opacity fade. Items below slide up to fill the gap. `300ms`.                                         |

### Motion Rules

1. **Reduce motion**: Respect `prefers-reduced-motion`. Replace all transforms and spring animations with simple opacity fades at `--motion-fast`.
2. **No motion for motion's sake.** Every animation must communicate state change or provide feedback. Decorative loops are banned.
3. **Completion animations are sacred.** The moment a user checks off a task or fills a habit ring is the single most important dopamine hit in the app. Make it perfect.
4. **Stagger, don't swarm.** When multiple items animate (list load, reorder), stagger by `50ms`. Never animate everything simultaneously.

---

## 8. Iconography

### Style

Custom line icons. `1.5px` stroke weight at `24px` canvas. Rounded caps and joins. Warm and slightly imperfect (not mathematically rigid).

### Entity Icons

| Entity | Icon                                                                   | Notes                                                   |
| ------ | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| Task   | Square checkbox (empty / checked / indeterminate for partial subtasks) | The checked state fills with `--task` blue              |
| Habit  | Circle (empty / ring progress / filled)                                | Draws as an SVG ring for the completion animation       |
| Goal   | Mountain peak / flag on summit                                         | Compact enough for sidebar, expressive enough for cards |

### System Icons (24px grid)

`Plus`, `Calendar`, `Clock`, `Flame` (streak), `Skip-Forward` (skip habit), `ChevronRight` (expand), `ChevronDown` (collapse), `Grip` (drag handle), `Search`, `Settings`, `Archive`, `Trash` (danger contextual), `Sun`/`Moon` (theme toggle), `Sidebar` (collapse toggle).

Prefer [Lucide Icons](https://lucide.dev/) as the base set — they match our stroke weight and corner style. Customize where needed (particularly the habit ring and goal flag). Import via lucide-react-native.

---

## 9. Surfaces & Texture

### Background Treatment

The app background is never a flat single color. It carries a subtle warmth:

- **Light mode:** `--canvas` base with a faint paper-grain noise texture overlay at `3% opacity`. This prevents the "sterile SaaS" feeling.
- **Dark mode:** `--canvas` dark base with a subtle warm grain at `2% opacity`.

The noise texture should be a `200×200px` tiling PNG, applied via `background-image` on the root element with `background-repeat: repeat`.

### Card Depth

Cards use a combination of border and shadow — not just shadow alone. The border provides crispness; the shadow provides depth.

```
/* Card at rest */
border: 1px solid var(--border);
box-shadow: var(--shadow-sm);

/* Card on hover */
border-color: var(--border-strong);
box-shadow: var(--shadow-md);
```

### Glassmorphism: Banned.

No frosted glass effects, blur overlays, or transparency gimmicks. They create visual noise and hurt performance on mobile. Our aesthetic is about honest, warm materials — not ethereal translucency.

---

## 10. Responsive Behavior

| Breakpoint  | Width        | Layout Shift                                                                           |
| ----------- | ------------ | -------------------------------------------------------------------------------------- |
| **Mobile**  | `< 640px`    | Single column. Bottom tab bar (Today / Goals / Settings). Habits as horizontal scroll. |
| **Tablet**  | `640–1024px` | Collapsible sidebar. Content area expands. Habit rings move to a 2-row grid.           |
| **Desktop** | `> 1024px`   | Persistent sidebar. Full content area. Habit section as inline row.                    |

### Mobile-Specific Adaptations

- **Bottom tab bar** replaces sidebar. Three tabs: Today (house icon), Goals (mountain icon), Settings (gear icon).
- **Habit rings** are `64px` diameter, horizontally scrollable with snap-scrolling. The current habit is centered.
- **Task nesting** collapses to a single level visible. "Show subtasks" expands inline.
- **Swipe gestures:** Swipe right on task = complete. Swipe left = schedule/move. Swipe right on habit = complete. Swipe left = skip.
- **Touch targets:** Minimum `44×44px` for all interactive elements. No exceptions.
- **Haptics:** Light haptic on task completion. Medium haptic on habit ring fill. None on navigation.

---

## 11. Accessibility

### Non-Negotiables

- **WCAG 2.1 AA** compliance minimum. Target AAA for text contrast.
- **All entity colors** pass 4.5:1 contrast on both `--canvas` and `--canvas-raised`.
- **Focus indicators** are always visible (not just on keyboard nav). Use `--shadow-focus` with entity-appropriate color.
- **Screen reader semantics:** Tasks are `role="checkbox"`. Habits are `role="switch"` (on/off for today). Goals use `role="progressbar"` with `aria-valuenow`.
- **No color-only signifiers.** Entity type is communicated through icon shape AND color. Missed/skipped states have text labels, not just color changes.
- **Animation toggles** built into settings. Not just `prefers-reduced-motion` — a manual override for users who want partial animation.

### Contrast Verification

| Color                   | On `--canvas` (#FAF8F4) | On `--canvas-raised` (#F3F0EA) | Passes AA?                                                     |
| ----------------------- | ----------------------- | ------------------------------ | -------------------------------------------------------------- |
| `--ink` (#2A2623)       | 13.8:1                  | 12.4:1                         | Yes (AAA)                                                      |
| `--ink-muted` (#6B6560) | 5.1:1                   | 4.6:1                          | Yes (AA)                                                       |
| `--task` (#4A6FA5)      | 4.7:1                   | 4.3:1                          | Yes (AA, large text)                                           |
| `--habit` (#C17A3A)     | 3.8:1                   | 3.5:1                          | Borderline — use on `--canvas` only, or pair with `--ink` text |
| `--goal` (#3A7A5C)      | 4.6:1                   | 4.2:1                          | Yes (AA, large text)                                           |

> **Note on `--habit`:** Amber is inherently a mid-luminance color. For small text, always use `--ink` as the text color and `--habit` as an accent (borders, icons, ring fills). Never set `--habit` as a text color on light backgrounds.

---

## 12. Voice & Microcopy

### Tone

Calm. Direct. Gently encouraging. Never corporate. Never condescending.

| Do                             | Don't                                                                |
| ------------------------------ | -------------------------------------------------------------------- |
| "Nothing planned for today."   | "You have no tasks! Add one to get started! 🎉"                      |
| "3-day streak. Keep it going." | "AMAZING! You're on fire! 🔥🔥🔥"                                    |
| "Skipped — streak preserved."  | "It's okay, we all have off days!"                                   |
| "Goal: 64% complete"           | "You're almost there! Just a little more! 💪"                        |
| "This can't be undone."        | "Are you SURE you want to delete this? This action is IRREVERSIBLE!" |

### Empty States

Empty states are opportunities for warmth, not feature-selling.

- **No tasks today:** "A clear day. Add something, or enjoy the space."
- **No habits yet:** "Habits grow here. Start with one small thing."
- **New goal, no children:** "A goal without tasks is just a wish. Add one."
- **First-time user, empty Today:** "Welcome. What matters to you today?"

---

## 13. Design Token Summary (CSS Custom Properties)

```css
:root {
  /* Surface */
  --canvas: #faf8f4;
  --canvas-raised: #f3f0ea;
  --canvas-feature: #edeae4;

  /* Text */
  --ink: #2a2623;
  --ink-muted: #6b6560;
  --ink-faint: #a39e97;

  /* Borders */
  --border: #ddd8d0;
  --border-strong: #c4beb5;

  /* Entity */
  --task: #4a6fa5;
  --task-light: #ebf0f7;
  --habit: #c17a3a;
  --habit-light: #fbf3e8;
  --goal: #3a7a5c;
  --goal-light: #eaf5f0;

  /* Semantic */
  --completed: #3a7a5c;
  --missed: #b86b5a;
  --skipped: #9b90b8;
  --overdue: #c4704a;
  --danger: #a84e4e;

  /* Typography */
  --font-display: 'Outfit', system-ui, sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Spacing (8px base) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(42, 38, 35, 0.06);
  --shadow-md: 0 4px 12px rgba(42, 38, 35, 0.08);
  --shadow-lg: 0 8px 30px rgba(42, 38, 35, 0.12);

  /* Motion */
  --motion-instant: 100ms ease-out;
  --motion-fast: 200ms ease-out;
  --motion-normal: 300ms ease-in-out;
  --motion-slow: 500ms cubic-bezier(0.16, 1, 0.3, 1);
  --motion-dramatic: 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --canvas: #1c1a16;
    --canvas-raised: #252220;
    --canvas-feature: #16140f;
    --ink: #ede9e2;
    --ink-muted: #9b958e;
    --ink-faint: #5e5951;
    --border: #3a3632;
    --border-strong: #4e4943;

    --task-light: rgba(74, 111, 165, 0.12);
    --habit-light: rgba(193, 122, 58, 0.12);
    --goal-light: rgba(58, 122, 92, 0.12);
  }
}
```

---

## 14. What This System Does NOT Do

1. **No gradient backgrounds.** Gradients signal "marketing site." We signal "trusted tool."
2. **No glassmorphism or blur effects.** Honest materials only.
3. **No illustration-heavy onboarding.** We use clean typography and whitespace, not cartoon humans pointing at things.
4. **No gamification beyond streaks.** No points, levels, badges, or leaderboards. Habits are personal. Competition is optional and externalized (i.e., sharing, not ranking).
5. **No dark patterns.** The "Skip" button is just as prominent as "Complete." The free tier doesn't nag. Settings are where you expect them.
