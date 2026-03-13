---
# Task Spec — fill this in and hand it to Claude Code

objective: >
  # One sentence: what should exist when this task is done?
  # Example: Add subscriber email notification when a podcast episode is published

acceptance_criteria:
  # List the specific, testable outcomes that define "done".
  # Be precise — the Reviewer agent will check each one against the code.
  1.
  2.
  3.
  # add more as needed

# ─── Ticket / Branch Identity ─────────────────────────────────────────────────
ticket_id: >
  # The ticket or issue number from your project tracker.
  # This becomes the branch name prefix: {PROJECT}-122-fix-habits-reset
  # Examples: PROJ-122  |  GH-45  |  LIN-9  |  TTH-7
  # Leave blank if there is no ticket — branch will use owner/task-slug instead.

owner: >
  # Your name or team handle.
  # Used in branch name when no ticket_id is set.
  # Example: dev-1  |  talha  |  backend-team

source_url: >
  # Link to the GitHub issue, JIRA ticket, Linear task, etc.
  # If provided, Claude will fetch it for additional context.
  # Example: https://yourproject.atlassian.net/browse/PROJ-122
# ──────────────────────────────────────────────────────────────────────────────

# ─── Project Setup ────────────────────────────────────────────────────────────
# Fill in ONE of the two sections below, then delete the other.

# Option A — NEW project (agents scaffold everything from scratch)
project_setup:
  type: new
  stack:
    framework:        # nextjs-15 | nextjs-14 | react-vite | express | fastapi | django | ...
    language:         # typescript | javascript | python | go
    styling:          # tailwindcss-v4 | tailwindcss-v3 | css-modules | styled-components | none
    package_manager:  # npm | yarn | pnpm | pip | go mod
    runtime:          # node-20 | node-22 | python-3.12 | go-1.22
  output_directory: >
    # Where to create the project, relative to the repo root.
    # Example: projects/my-app
  run_command: >
    # Command to start the app locally after install.
    # Example: cd projects/my-app && npm run dev
    # The Coder agent will document this in the project README.

# Option B — EXISTING project (agents add to / modify existing code)
# project_setup:
#   type: existing
#   root: projects/my-app    # path to project root relative to repo root
#   codebase_context:
#     - src/path/to/file.ts
#     - src/path/to/another.ts
# ──────────────────────────────────────────────────────────────────────────────

# ─── Access & Credentials ─────────────────────────────────────────────────────
# List anything the human must provide for the project to run locally.
# Claude will pause and ask before starting if this section is filled in.
# Leave blank if the project needs no external services or secrets.
required_access:
  # - name: SENDGRID_API_KEY
  #   why: Needed to send emails from the contact form
  #   where_to_get: https://app.sendgrid.com/settings/api_keys
  #
  # - name: DATABASE_URL
  #   why: PostgreSQL connection string for local dev
  #   where_to_get: Run `docker compose up db` — URL is postgres://user:pass@localhost:5432/mydb
  #
  # - name: STRIPE_SECRET_KEY
  #   why: Payment processing
  #   where_to_get: https://dashboard.stripe.com/test/apikeys
# ──────────────────────────────────────────────────────────────────────────────

constraints:
  # Hard rules the implementation must not break.
  # Example: Do not modify the existing database schema
  # Example: Secrets via environment variables only — never hardcoded
  -

output_format: >
  # What files should exist at the end?
  # For a new project, list ALL required files including config, layout, README, .env.example
  # For an existing project, list only the files modified/created.

priority: medium  # low | medium | high

notes: >
  # Anything else the agents should know.
  # Edge cases, known gotchas, related PRs, deployment notes, etc.

---
