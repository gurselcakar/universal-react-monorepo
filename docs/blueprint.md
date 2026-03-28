# SaaS Task & Habit Tracker: Market Research & Architecture Blueprint

## Part 1: Market Research & Competitor Analysis

Building a SaaS competitor in the productivity market is a bold move, but the gap targeting seamlessly blending nested subtasks, flexible recurring tasks, daily habits, and long-term goal tracking is exactly where the current heavyweights drop the ball.

Here is the unvarnished reality of your biggest competitors based on real user feedback.

### 1. Todoist: The Minimalist Giant

Todoist is the baseline most users measure other apps against, but it falls apart spectacularly when pushed into complex workflows or habit tracking.

- **The Benefits:** Incredible Natural Language Processing (NLP) for quick entry. The UI is clean, fast, and familiar. It’s excellent for standard "getting things done" (GTD) task dumping.
- **The Drawbacks (Your Opportunities):**
  - **Subtasks are universally hated:** Users constantly complain that subtasks are treated as "first-class" independent tasks. If a subtask is due today, it shows up in the "Today" view without the context of the parent task. You have to click _into_ the parent project just to see the nested hierarchy.
  - **Habits create guilt:** Todoist treats habits as standard recurring tasks. If you miss a daily habit, it turns red and stays "Overdue." Users hate this, comparing it to "spam email building up." There’s no grace period, streak tracking, or easy way to just say "skip today."
  - **No big-picture goals:** Everything is a project or a task. You can't track long-term, uncompletable goals or tie daily actions to a macro-level vision.

### 2. Motion: The AI Micro-Manager

Motion focuses heavily on the _when_ by auto-scheduling tasks onto a calendar, targeting neurodivergent users (like those with ADHD) and busy professionals.

- **The Benefits:** It completely removes the cognitive load of figuring out what to do next. It automatically reshuffles your calendar when you miss a task or a meeting goes long.
- **The Drawbacks (Your Opportunities):**
  - **Exorbitantly expensive:** At $250–$500 a year, users are incredibly unforgiving of its flaws.
  - **Glitchy and rigid:** Real user feedback points to a buggy mobile app. Worse, if you manually move an auto-scheduled task because you just don't feel like doing it, the system "locks" the task and breaks the AI flow.
  - **Feature bloat:** Users complain Motion is pushing unwanted "AI Meeting Notes" and "AI Docs" rather than fixing core task management bugs.
  - **Ignores the "Why":** Motion is purely transactional. It has absolutely no framework for long-term goal tracking or habit building.

### 3. Akiflow: The Aggregator

Akiflow acts as a command center, pulling tasks from email, Slack, Notion, and other apps into one universal inbox for time-blocking.

- **The Benefits:** Fantastic for people who have tasks scattered across a dozen platforms. Manual time-blocking feels more predictable than Motion’s AI.
- **The Drawbacks (Your Opportunities):**
  - **Still just a calendar overlay:** It’s built for daily execution, not life management. Like Motion, it completely lacks native habit tracking or macro-goal nesting.
  - **Overkill for individuals:** It’s a great tool for managing _work_ chaos, but users struggle to adapt it for personal growth, routines, or layered project planning.

### 4. TickTick & Amazing Marvin (Your Closest Relatives)

You should look closely at these two, as they attempt to solve the exact problems you are tackling.

- **TickTick:** Has native habit tracking (with streaks and check-ins) alongside a calendar and tasks. **The flaw:** Users note that nesting goals, subtasks, and notes feels clunky, and the UI lacks the polish of Todoist.
- **Amazing Marvin:** Incredible nesting capabilities and highly customizable. **The flaw:** Users complain it’s like sitting in a "space shuttle control room." The learning curve is massive, and users often spend more time tweaking the app than actually doing their tasks.

---

## The Core Insight: The "Intent vs. Action" Mismatch

Based on user frustrations, your app needs to solve the **"Intent vs. Action" Mismatch**. Current apps treat buying groceries (a task), drinking water (a habit), and writing a novel (a goal) as the exact same data type. They aren't.

1. **Tasks** need deadlines and context (and _visible_ nested subtasks).
2. **Habits** need streaks, flexibility, and a guilt-free "skip" button, not an overdue badge.
3. **Goals** need to be the umbrella that ties it all together, showing progress based on the completion of the nested tasks and habits beneath them.

If you can build a clean UI that distinctly handles these three data types without overwhelming the user, you have a highly competitive product.

---

## Part 2: Database Architecture Blueprint

Getting the database architecture right from day one avoids the trap that apps like Todoist and Motion fell into. To solve the mismatch, we need a relational data model where **Goals, Tasks, and Habits are distinct entities** that can talk to each other.

### 1. The `Goal` Entity (The Umbrella)

This is the macro-level container. It doesn’t have a "checkbox" you can tick off directly; its progress is calculated dynamically based on the Tasks and Habits linked to it.

- **`id`** (UUID)
- **`title`** (String) - e.g., "Get Fit" or "Launch MVP"
- **`target_date`** (DateTime, Optional) - When do you want to achieve this?
- **`status`** (Enum: Active, Paused, Achieved, Abandoned)
- **`progress_cache`** (Float) - A rolled-up percentage (0-100%) calculated by a background job or database trigger based on completed nested items.

### 2. The `Task` Entity (The Action & Nested Subtasks)

This handles both your main tasks and your infinite nested subtasks. The secret sauce here is **self-referencing**.

- **`id`** (UUID)
- **`title`** (String)
- **`goal_id`** (UUID, Foreign Key, Optional) - Ties the task to the big picture.
- **`parent_task_id`** (UUID, Foreign Key, Optional) - **This is the key to nesting.** If this is `null`, it's a top-level task. If it has an ID, it's a subtask belonging to that parent.
- **`status`** (Enum: Todo, In_Progress, Done, Canceled)
- **`due_date`** (DateTime, Optional)
- **`do_date`** (DateTime, Optional) - Separating _when it's due_ from _when I plan to do it_ is a huge feature for users.

### 3. The `Habit` Entity (The Blueprint)

This does _not_ go in the Task table. The Habit entity is just the "rule" or the "template" for what the user wants to do.

- **`id`** (UUID)
- **`title`** (String) - e.g., "Drink 2L Water"
- **`goal_id`** (UUID, Foreign Key, Optional) - E.g., tied to the "Get Fit" goal.
- **`frequency_type`** (Enum: Daily, Weekly, Specific_Days)
- **`frequency_rules`** (JSON) - e.g., `["Mon", "Wed", "Fri"]`
- **`current_streak`** (Int) - Auto-calculates.
- **`longest_streak`** (Int)

### 4. The `Habit_Log` Entity (The Guilt-Free Execution)

This is how you solve the "overdue spam" problem. Instead of generating 365 future tasks for a daily habit, the system only generates a `Habit_Log` entry for _today_.

- **`id`** (UUID)
- **`habit_id`** (UUID, Foreign Key)
- **`date`** (Date)
- **`status`** (Enum: Completed, Skipped, Missed)
  - _Crucial UX Note:_ "Skipped" maintains the streak (for sick days/vacations), "Missed" resets the streak. "Missed" logs just stay in the past; they don't roll over to tomorrow and clutter the Today view.

---

## How the Magic Happens (The Query Logic)

When a user opens their app to the **"Today" view**, your backend runs a query that pulls:

1. All `Tasks` where `do_date` or `due_date` is today AND `parent_task_id` is null (so you only see the parent task, keeping the UI clean).
2. All `Habit_Logs` generated for today.

When a user clicks on a **`Goal`**, your backend queries:

1. All `Tasks` tied to that `goal_id`.
2. All `Habits` tied to that `goal_id`.
3. _The Rollup:_ The UI shows "3 of 5 tasks completed, 80% habit adherence this month" = 65% Goal Progress.

By separating these out, you give users the rigid structure they need for project management (Tasks/Subtasks) and the psychological safety they need for personal growth (Habit Logs with a "Skip" button).
