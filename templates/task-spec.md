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

codebase_context:
  # List the files that are relevant to this task.
  # The Architect and Coder agents will read these.
  - src/path/to/file.py
  - src/path/to/another.py
  - tests/test_something.py

constraints:
  # Hard rules the implementation must not break.
  # Example: Do not modify the existing database schema
  # Example: Use the existing email client — do not introduce a new dependency
  -

output_format: >
  # What files should exist / be modified at the end?
  # Example: modified routes.py, updated service.py, new tests in test_notifications.py

owner: >
  # Your name or team handle — used for the git branch name
  # Example: dev-1  or  talha  or  backend-team

# Optional fields — fill in if you have them
source_url: >
  # Link to the GitHub issue, JIRA ticket, Linear task, etc. (optional)
  # If provided, Claude will fetch it for additional context

priority: medium  # low | medium | high

notes: >
  # Anything else the agents should know.
  # Edge cases, known gotchas, related PRs, etc.

---
