# Sharing the kit with collaborators

Concrete step-by-step. Most steps you do once; after that sharing with a new collaborator takes about 30 seconds.

## The mental model in one paragraph

The `project-manager-kit/` folder lives at `C:\dev\Agentic-Home\project-manager-kit\`. That path on your laptop is where you make changes. Separately, you push that same folder to a GitHub repo (its own repo, not the GWL workspace's repo) — that's the *internet copy* collaborators clone. When a collaborator clones, they get the kit on their own machine; what they do with it stays on their machine unless they push back to GitHub. There is no automatic syncing — you push when you've made changes worth sharing, they pull when they want updates.

## Step 1 — Decide public vs private

You have to pick one before creating the repo. Switching later is possible but a small chore.

| | Public | Private |
|---|---|---|
| Who can see the code | Anyone on the internet | Only you + people you invite |
| Who can clone | Anyone | Only invitees |
| Cost | Free | Free for individuals (unlimited collaborators on free tier as of 2026) |
| Discoverability | Indexed by GitHub search and Google | Invisible to the outside world |
| Best for | Tools you want others to find and use freely | Work-in-progress kit you want to control distribution of |

Recommendation for this kit, today: **private**. You can flip it to public later when you're ready for it to be findable. Going private → public is one click in repo settings; going public → private erases the public history of forks, which is rarely what you want.

## Step 2 — Make sure GitHub CLI is installed and authenticated

The kit's `pm github-init` command wraps GitHub CLI (`gh`). You need it once.

```powershell
# Install (Windows)
winget install --id GitHub.cli
# (mac:    brew install gh)
# (linux:  see https://github.com/cli/cli/blob/trunk/docs/install_linux.md)

# Authenticate (opens a browser, you log into github.com once)
gh auth login

# Verify
gh auth status
```

If `gh auth login` opens a browser and asks "What account do you want to log into?" pick **GitHub.com**. Pick HTTPS as the protocol. Pick "Login with a web browser" — it gives you a one-time code, paste it, and you're done. The token is stored on your machine; you don't see it.

## Step 3 — Wire the kit up to GitHub

There are two paths depending on whether the repo already exists.

### Path A — You haven't created the repo yet (default)

From inside the kit folder:

```powershell
cd C:\dev\Agentic-Home\project-manager-kit
pm github-init
```

That runs `gh repo create <name> --private --source=. --remote=origin --push`. It creates a private repo under your GitHub account with the same name as the folder (`project-manager-kit`) and pushes everything. If you want it public, add `--public` (it asks you to confirm).

### Path B — You already created the repo on github.com

If you went to github.com first and clicked "New repository" there (so the repo URL exists but it's empty or has only a README), use the `--remote-url` flag instead. This skips the create step and just wires the local kit up to that existing remote.

```powershell
cd C:\dev\Agentic-Home\project-manager-kit
pm github-init --remote-url https://github.com/<your-username>/<your-repo>.git
```

For this kit's actual repo, that means:

```powershell
pm github-init --remote-url https://github.com/johncliechty/Project-Manager-Package.git
```

The script:

1. Makes an initial commit if the kit folder doesn't have one yet.
2. Renames the branch to `main` (GitHub's default).
3. Sets `origin` to the URL you gave.
4. Tries `git push -u origin main`.
5. If the push is rejected because the github.com repo already has commits (typically a README from when you created it), the script automatically does `git pull --allow-unrelated-histories` and re-pushes.

Path B works without `gh` installed. You only need git, which Windows usually has from the installer (`winget install Git.Git` if not).

After this command, you have:

- A GitHub repo at the URL you provided, populated with the kit's contents.
- Your local clone (`C:\dev\Agentic-Home\project-manager-kit\`) wired to it as `origin`.
- A `main` branch pushed and tracked.

## Step 4 — Invite collaborators

For a private repo, each person you want to share with needs:

1. A GitHub account (free; `github.com/signup`).
2. Their GitHub username (you ask them; they tell you).

Then on **github.com**:

1. Go to your repo: `https://github.com/<your-username>/project-manager-kit`.
2. Click **Settings** (top right tab of the repo).
3. Left sidebar → **Collaborators**.
4. Click **Add people**.
5. Enter their GitHub username or email and pick **Read** (they can clone but can't push) or **Write** (they can push back). Default to Read; you can promote later.
6. Click **Add to this repository**.

GitHub emails them an invitation. They have to click "Accept" in the email or on github.com. After they accept, they can `git clone` your repo.

For a public repo, **you don't invite anyone** — anyone can clone it without permission. Skip step 4 entirely.

## Step 5 — Send your collaborator the cloning instructions

Email or message them this (substituting your actual repo URL):

> Here's the project-manager-kit. To use it:
>
> ```bash
> git clone https://github.com/johncliechty/Project-Manager-Package.git
> cd Project-Manager-Package
> npm link    # makes `pm` available globally on your machine (optional but nice)
> ```
>
> The README.md walks through the rest. Run `pm --help` to see what it can do. It works in any AI tool you use — Claude Code, Cursor, Codex, Gemini CLI, Cowork — or with no AI at all. The quickstart is `pm init` inside an empty folder where you want a new project.

That's it. You're done.

## Pushing updates after they clone

When you make changes to the kit on your machine:

```powershell
cd C:\dev\Agentic-Home\project-manager-kit
git add -A
git commit -m "describe the change"
git push
```

Collaborators pull updates with:

```bash
cd path-to-their-clone/project-manager-kit
git pull
```

If you want to be polite, ping them in chat that there's a new version — `git pull` doesn't auto-run for them.

## A subtle thing: the kit's git is *not* the GWL workspace's git

The GWL workspace at `C:\dev\Agentic-Home\` is itself a git repo (you can see this with `git -C C:\dev\Agentic-Home log`). When the kit lives inside that workspace, you have two git repos overlapping at the same path level:

- `C:\dev\Agentic-Home\.git\` — the GWL workspace repo (already exists).
- `C:\dev\Agentic-Home\project-manager-kit\.git\` — the kit's own repo (created by `pm github-init`).

This is fine — git handles it correctly. When you `git status` in the kit folder it only sees the kit's files; when you `git status` in the workspace root, the kit's `.git/` folder makes git treat the kit as an opaque blob (it won't show every kit file as "untracked"). The workspace's `.gitignore` should already ignore `project-manager-kit/` so the workspace doesn't try to track the kit's contents — verify with:

```powershell
cd C:\dev\Agentic-Home
git status project-manager-kit
```

If it shows files inside the kit as "untracked" or "modified", add `project-manager-kit/` to the workspace's `.gitignore`. (Or use a git submodule — but that's overkill for a small kit, and submodules have ergonomic costs that aren't worth paying here.)

## What collaborators can and cannot do with the kit alone

**Can do** (on their own machine, no GWL access needed):

- Run `pm init` to bootstrap a new project from scratch or absorb an existing folder.
- Run all the operating-loop commands: `pm status`, `pm what-now`, `pm log`, `pm brief`, `pm critique`.
- Connect their projects to GitHub (`pm github-init` from inside their project).
- Set up Backblaze B2 / Cloudflare R2 backups for their project's data folder.
- Use the kit with any AI tool they prefer (Claude Code, Cursor, Codex, Gemini CLI, Cowork) — or no AI at all.

**Cannot do** without separate setup:

- Use the GWL Agentic Sandbox (that's your private workspace; the kit is shareable, the sandbox is not).
- Push to *your* GitHub repo (unless you gave them Write access in step 4).
- Spend on your API budgets — when their projects dispatch to AI agents, that's *their* API budget.

## If they want to contribute back

They fork your repo on github.com (one click), make changes on their fork, and open a Pull Request. You see the PR on your repo, review the changes, and either merge or comment. This is GitHub's standard contribution workflow — works the same as any open-source repo.

If you don't want contributions, leave the repo private and don't accept PRs. The kit on a private repo is usable but not contributable; that's a fine equilibrium for a tool you want to control.

## Summary — the absolute minimum to share

### If you already created the repo on github.com (the current case):

```powershell
cd C:\dev\Agentic-Home\project-manager-kit
pm github-init --remote-url https://github.com/johncliechty/Project-Manager-Package.git
```

That's it. No `gh` install needed. The script handles "remote has a README, local doesn't" automatically.

### If you haven't created the repo yet:

```powershell
# One time:
winget install --id GitHub.cli
gh auth login

# Once per repo:
cd C:\dev\Agentic-Home\project-manager-kit
pm github-init
```

Either way, after the push: add collaborators on github.com under Settings → Collaborators, and send them the clone command. That's the whole story.
