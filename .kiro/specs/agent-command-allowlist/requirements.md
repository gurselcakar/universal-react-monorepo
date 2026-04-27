# Requirements Document

## Introduction

This feature introduces a version-controlled command allowlist for Kiro, the AI-powered
development environment. The allowlist defines which shell commands Kiro is permitted to execute
on behalf of the developer. By committing this configuration to the repository, every team member
shares the same set of approved commands, reducing the risk of unintended or dangerous command
execution while keeping the developer experience smooth.

The allowlist covers general commands (build tools, linters, package managers, test runners, etc.)
and is not limited to any single CLI. It lives inside the `.kiro/` directory so it travels with
the repo and is governed by the same review process as application code.

---

## Glossary

- **Allowlist**: The configuration file that enumerates the commands Kiro is permitted to execute.
- **Allowlist_Loader**: The component responsible for reading, parsing, and validating the
  Allowlist file at startup and when the file changes.
- **Command_Matcher**: The component that evaluates a requested command against the Allowlist
  rules to determine whether execution is permitted.
- **Kiro_Agent**: The AI agent within Kiro that proposes and executes shell commands on behalf of
  the developer.
- **Command_Entry**: A single rule in the Allowlist that specifies a permitted command pattern.
- **Glob_Pattern**: A wildcard pattern (e.g., `pnpm *`, `nx run-many *`) used to match a family
  of related commands without listing each variant individually.
- **Workspace_Root**: The top-level directory of the repository where the `.kiro/` directory
  resides.

---

## Requirements

### Requirement 1: Allowlist File Location and Format

**User Story:** As a developer, I want the command allowlist stored in a well-known location
inside the repository, so that it is version-controlled and shared across the team.

#### Acceptance Criteria

1. THE Allowlist SHALL be stored at the path `.kiro/commands/allowlist.json` relative to the
   Workspace_Root.
2. THE Allowlist SHALL use JSON format with a top-level object containing a `version` field and a
   `commands` array of Command_Entry objects.
3. WHEN the Allowlist file does not exist, THE Allowlist_Loader SHALL treat the configuration as
   empty and deny all command execution by the Kiro_Agent.
4. THE Allowlist file SHALL be committable to version control so that all team members share the
   same configuration after pulling the repository.

---

### Requirement 2: Command Entry Structure

**User Story:** As a developer, I want each allowlist entry to specify a command pattern and an
optional description, so that the team understands why each command is permitted.

#### Acceptance Criteria

1. THE Command_Entry SHALL contain a required `pattern` field that specifies the command or
   Glob_Pattern to allow.
2. THE Command_Entry SHALL contain an optional `description` field that explains the purpose of
   the allowed command.
3. THE Command_Entry SHALL contain an optional `args` field that constrains the permitted
   arguments as an array of allowed Glob_Patterns.
4. WHEN the `args` field is omitted from a Command_Entry, THE Command_Matcher SHALL permit any
   arguments for that command.
5. WHEN the `args` field is present, THE Command_Matcher SHALL only permit arguments that match
   at least one pattern in the `args` array.

---

### Requirement 3: Command Matching and Evaluation

**User Story:** As a developer, I want Kiro to check every command against the allowlist before
execution, so that only approved commands run in my workspace.

#### Acceptance Criteria

1. WHEN the Kiro_Agent requests execution of a shell command, THE Command_Matcher SHALL evaluate
   the command against all Command_Entry patterns in the Allowlist before execution proceeds.
2. WHEN the requested command matches at least one Command_Entry pattern, THE Command_Matcher
   SHALL permit execution.
3. WHEN the requested command does not match any Command_Entry pattern, THE Command_Matcher SHALL
   deny execution and return a descriptive message indicating the command is not in the Allowlist.
4. THE Command_Matcher SHALL perform case-sensitive matching on command names.
5. WHEN a Command_Entry pattern contains a Glob_Pattern, THE Command_Matcher SHALL expand the
   pattern using standard glob semantics (where `*` matches any sequence of characters within a
   single argument).

---

### Requirement 4: Allowlist Loading and Validation

**User Story:** As a developer, I want the allowlist validated when it is loaded, so that
malformed configurations are caught early rather than at command execution time.

#### Acceptance Criteria

1. WHEN Kiro starts a session in a workspace, THE Allowlist_Loader SHALL read and parse the
   Allowlist file from `.kiro/commands/allowlist.json`.
2. IF the Allowlist file contains invalid JSON, THEN THE Allowlist_Loader SHALL report a
   descriptive parse error that includes the file path and the nature of the syntax error.
3. IF a Command_Entry is missing the required `pattern` field, THEN THE Allowlist_Loader SHALL
   reject the entry and report which entry index is invalid.
4. WHEN the Allowlist file is modified while a session is active, THE Allowlist_Loader SHALL
   reload the file and apply the updated rules without requiring a session restart.
5. THE Allowlist_Loader SHALL validate that the `version` field is present and matches a
   supported version string.

---

### Requirement 5: Default Allowlist Generation

**User Story:** As a developer setting up the allowlist for the first time, I want Kiro to
generate a sensible default allowlist based on the project's tooling, so that I have a useful
starting point.

#### Acceptance Criteria

1. WHEN a developer requests initialization of the Allowlist and no Allowlist file exists, THE
   Kiro_Agent SHALL generate a default Allowlist file at `.kiro/commands/allowlist.json`.
2. THE default Allowlist SHALL include entries for common development commands detected in the
   project (package manager commands, build scripts, test runners, and linters).
3. WHEN the project uses pnpm as the package manager, THE default Allowlist SHALL include entries
   for `pnpm install`, `pnpm run *`, and `pnpm exec *`.
4. WHEN the project uses NX as the build orchestrator, THE default Allowlist SHALL include entries
   for `nx run-many *`, `nx run *`, and `nx affected *`.
5. THE default Allowlist SHALL include a comment-style `description` on each generated entry
   explaining why the command was included.

---

### Requirement 6: Security and Escape Prevention

**User Story:** As a developer, I want the allowlist to prevent command injection and shell
escapes, so that the approved commands cannot be circumvented.

#### Acceptance Criteria

1. THE Command_Matcher SHALL evaluate the full command string, including pipes (`|`), command
   chaining (`&&`, `||`, `;`), and subshell expressions (`$(...)`, backticks), as a single unit
   against the Allowlist.
2. WHEN a requested command contains shell operators (pipes, chains, or subshells) and the
   Allowlist entry does not explicitly permit that full compound command, THE Command_Matcher
   SHALL deny execution.
3. THE Command_Matcher SHALL deny execution of commands that attempt to modify the Allowlist file
   itself, unless an explicit Allowlist entry permits it.
4. IF a command is denied, THEN THE Command_Matcher SHALL log the denied command, the reason for
   denial, and the timestamp for audit purposes.

---

### Requirement 7: Developer Experience and Overrides

**User Story:** As a developer, I want clear feedback when a command is blocked and an easy way
to update the allowlist, so that I am not frustrated when legitimate commands are denied.

#### Acceptance Criteria

1. WHEN a command is denied, THE Kiro_Agent SHALL display a message that includes the denied
   command, the reason for denial, and instructions for adding the command to the Allowlist.
2. WHEN a developer requests adding a new command to the Allowlist, THE Kiro_Agent SHALL append a
   new Command_Entry to the `commands` array in the Allowlist file and confirm the addition.
3. THE Allowlist SHALL support a special `"*"` wildcard entry in the `commands` array that
   permits all commands, allowing teams to opt out of restrictions entirely.
4. WHEN the `"*"` wildcard entry is present, THE Command_Matcher SHALL permit all commands
   without further pattern evaluation.

---

### Requirement 8: Allowlist Serialization Round-Trip

**User Story:** As a developer, I want the allowlist to be reliably read and written without data
loss, so that automated edits preserve the full configuration.

#### Acceptance Criteria

1. THE Allowlist_Loader SHALL parse the Allowlist JSON file into an in-memory Allowlist object.
2. THE Allowlist_Loader SHALL serialize the in-memory Allowlist object back to JSON format.
3. FOR ALL valid Allowlist files, parsing then serializing then parsing SHALL produce an
   equivalent Allowlist object (round-trip property).
4. THE serialized JSON output SHALL use 2-space indentation and a trailing newline to match
   standard repository formatting conventions.
