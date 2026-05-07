# Backup options

What to back up, where to back it up, and what each option costs and protects against. The kit ships configs for three paths; pick one or more per project.

## What to back up (and what not to)

Worth backing up:

- `code/` (covered by git remote — that's a real backup, not an afterthought).
- `data/` — if the project produces or curates non-trivial data, this is what real money would go to recover. Cloud object storage is the right answer.
- `logs/decisions/` — institutional memory. Cheap. Just commit it.
- `briefs/archive/` — the historical investor briefs. Often more valuable than people realize.

Not worth backing up:

- `node_modules/`, `.venv/`, `.next/`, build artifacts. Reproducible from `package.json` / `requirements.txt`. Backing them up wastes money and slows sync.
- `~/.openclaw` agent runtime cwd's — never put these in any sync engine. Don't ask why; the workspace learned the hard way.
- `.env`. Back up secrets through a real secrets manager (1Password, Bitwarden) or a sealed file you decrypt locally. Plain backup is a leak waiting to happen.

## Path 1: Local git + GitHub remote

**What it protects against:** machine loss, accidental deletion, reverting a bad change, sharing with collaborators.

**Setup:**

```bash
pm github-init
# Wraps:
#   git init  (if not already)
#   gh repo create <name> --private --source=. --remote=origin --push
```

If `gh` (GitHub CLI) is not installed, the script prints platform-specific install commands and exits. The kit never creates GitHub accounts on the user's behalf.

**Cost:** GitHub private repos free for individuals; enterprise tier as needed.

**What it doesn't protect:** the contents of `data/` if it's gitignored (which it usually is and should be — git is wrong for binary data). For `data/`, use Path 2 or 3.

## Path 2: Backblaze B2 (cheapest at scale)

**What it protects against:** local data loss, machine failure, wanting historical snapshots of a directory.

**Cost:** ~$6 per TB-month for storage. Egress is $0.01/GB. Very cheap if you mostly write and rarely read back.

**Setup:**

```bash
pm backup b2
# Writes:
#   .pm/backup/rclone.conf.template
#   bin/backup-data.sh
# Prints exact instructions for:
#   1. Create a B2 account at backblaze.com (you do this — kit does not).
#   2. Create a bucket. Note the bucket name.
#   3. Create an Application Key with read/write scoped to the bucket.
#   4. Copy the keyId and applicationKey into ~/.config/rclone/rclone.conf.
#   5. Run bin/backup-data.sh manually to verify.
#   6. Schedule it (Cowork scheduled task / cron / Windows Task Scheduler).
```

The backup script does:

```bash
rclone sync \
  ./data b2:<bucket>/<project>/data \
  --transfers=4 \
  --crypt-remote-name=<crypt-name>  # if encryption is configured
```

Encryption is recommended; the script writes a config that wraps the bucket in `rclone crypt` so files are encrypted client-side before upload. The encryption password lives in your password manager, not in the kit.

## Path 3: Cloudflare R2 (best when egress is heavy)

**What it protects against:** same as B2.

**Cost:** Storage is comparable to B2 (~$15/TB-month). **Zero egress fees.** First 10 GB free. Better when the project pulls data back out frequently (e.g., for training runs, repeated analysis).

**Setup:** Symmetric to B2 — `pm backup r2` writes a config template and instructions. R2 is S3-compatible, so the same rclone idiom works with a different remote.

## Path 4: OneDrive / iCloud / Dropbox

**Honest assessment.** This is the path of least resistance and the most failure-prone for working software projects.

**What it does well:** quick, automatic, the user already has it.

**What it does badly:**

- **Sync engines corrupt working files.** OneDrive's file-on-demand sync caused webpack cache corruption (`UNKNOWN errno -4094`) and `~/.openclaw` session-lock contention severe enough to make a single agent turn take 5+ minutes in this very workspace. (See `CLAUDE.md` "Canonical workspace location" note.)
- **Two machines editing the same file at the same time → conflicted copies.** Manageable for documents, painful for source code.
- **Binary data (`data/`) eats your sync quota and slows everything down.**

**If you must use it:**

- Put only **`docs/`, `briefs/`, `logs/decisions/`, `MASTER-PLAN.md`, `PROJECT.md`** in the synced folder.
- Keep `code/`, `data/`, `node_modules/`, `.next/`, and any agent runtime cwd's *off* the sync path.
- Don't open the synced project from two machines at the same time.

For most projects, **Path 1 + Path 2 (or 3)** is the right combination.

## What the kit explicitly does *not* do

- The kit never creates accounts (GitHub, Backblaze, Cloudflare) on the user's behalf. The user does that.
- The kit never asks for credentials in chat. Credentials go directly into `~/.config/rclone/rclone.conf` (kit prints the path) or `.env` (which is gitignored).
- The kit never runs `git push` automatically without explicit user invocation.
- The kit never enables sync engines on directories — that's a Finder/Explorer setting the user makes.

These are deliberate boundaries. The kit's job is to make backup configuration *easy*, not to take over the user's accounts.
