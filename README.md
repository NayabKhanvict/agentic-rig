# Agentic Rig — Multi-Agent Developer Pipeline

A multi-agent development pipeline built on Claude Code.

You give it a task. It runs **Architect → Coder → Reviewer → Docs → GitHub PR**.

No Python. No Node. No custom orchestration. Just Claude Code + these config files.

---

## How It Works

Claude Code reads `CLAUDE.md` on startup and becomes the Orchestrator. It then spawns four specialised subagents in sequence, passes outputs between them, applies code changes to disk, and opens a GitHub PR — all natively, without any external tooling.

```
YOU
 └── Give task (spec / URL / description)
      │
      ▼
 CLAUDE CODE (Orchestrator — reads CLAUDE.md)
      │
      ├──► ARCHITECT agent   → Design Document (no code)
      │
      ├──► CODER agent       → Code + Tests
      │
      ├──► REVIEWER agent    → APPROVE or REJECT
      │         │
      │    (if REJECT, max 3 loops back to Coder)
      │
      ├──► DOCS agent        → Inline docs + runbook entry + PR description
      │
      └──► GitHub PR         → Branch created, PR opened, ready for human review
```

---

## Requirements

- [Claude Code](https://claude.ai/code) installed and authenticated
- `gh` CLI installed and authenticated (`gh auth login`)
- Git configured in your project

---

## Team Setup (Do This Once)

### Step 1 — Clone this repo

```bash
git clone <this-repo-url>
cd agentic-rig
```

### Step 2 — Set up your project context

Open `CLAUDE.md` and fill in the `## Project-Specific Context` section at the bottom. This tells the agents about your tech stack, conventions, and constraints.

```bash
# Edit CLAUDE.md — fill in the Project-Specific Context section
# Then commit it so the whole team gets it
git add CLAUDE.md
git commit -m "Add project-specific context"
git push
```

Every team member who clones this repo gets the same agent behaviour automatically.

### Step 3 — Use this rig from your project

**Option A — Run Claude Code from this directory**

Open Claude Code in the `agentic-rig/` folder. Point it at your actual project via the `codebase_context` paths in the task spec.

**Option B — Copy the config files into your project root**

```bash
cp CLAUDE.md /path/to/your/project/
cp -r prompts/ /path/to/your/project/
cp -r templates/ /path/to/your/project/
cp -r docs/ /path/to/your/project/
```

Then run Claude Code from your project root. It will find `CLAUDE.md` automatically.

> **Team account note:** If your team uses a shared Claude Code account or organisation, share this repo's URL. Everyone clones it, fills in the same `## Project-Specific Context` in `CLAUDE.md`, and runs Claude Code from there. The agent prompts in `prompts/` are the shared config — any change committed there is picked up by everyone on next pull.

---

## Giving Claude a Task

### Option A — Fill in the task spec template

```bash
cp templates/task-spec.md task-spec.md
# Edit task-spec.md with your task details
```

Then open Claude Code and say:

```
Run the pipeline on task-spec.md
```

### Option B — Paste a URL

```
Run the pipeline on this GitHub issue: https://github.com/org/repo/issues/123
```

Claude will fetch the issue and extract the task details automatically.

### Option C — Plain description

```
Run the pipeline: add rate limiting to the /api/search endpoint, max 60 req/min per user
```

Claude will ask you to confirm the objective and acceptance criteria before starting.

---

## File Reference

| File                     | Purpose                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `CLAUDE.md`              | Orchestration rules + project-specific context — loaded automatically by Claude Code |
| `prompts/architect.md`   | System prompt for the Architect agent (design only, no code)                         |
| `prompts/coder.md`       | System prompt for the Coder agent (implementation + tests)                           |
| `prompts/reviewer.md`    | System prompt for the Reviewer agent (APPROVE / REJECT)                              |
| `prompts/docs.md`        | System prompt for the Docs agent (inline docs + PR summary)                          |
| `templates/task-spec.md` | Blank task input template — copy and fill in per task                                |
| `docs/runbook.md`        | Auto-maintained runbook — Docs agent appends an entry after each approved task       |

---

## Customising Agent Behaviour

All agent behaviour is controlled by the prompt files in `prompts/`. Edit them, commit, and everyone on the team picks up the change on next pull.

| What you want to change          | Where to change it                                |
| -------------------------------- | ------------------------------------------------- |
| Quality bar for code review      | `prompts/reviewer.md` — Approval Standard section |
| What tests are required          | `prompts/coder.md` — Quality Bar section          |
| PR description format            | `prompts/docs.md` — PR Summary section            |
| Branch naming convention         | `CLAUDE.md` — Step 5                              |
| Project tech stack / conventions | `CLAUDE.md` — Project-Specific Context section    |

---

## Output

After each successful pipeline run:

- A branch is created: `agent/{owner}/{task-slug}`
- All code changes are committed: `{objective} [agentic-rig]`
- A GitHub PR is opened with a structured description
- `docs/runbook.md` is updated with a runbook entry
- The PR URL is reported back to you

You review the PR. You merge it. Done.
