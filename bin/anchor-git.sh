#!/usr/bin/env bash
# anchor-git.sh -- sandbox-safe version control for the Anchor curriculum.
# Keeps the git database in a sandbox-local /tmp dir (git works there) while the
# work-tree is the mounted project folder; persists history as a single-file
# bundle inside .project-manager/ so it survives across sessions. No host access,
# no bridge, no delete permission required. See header docs in the repo copy.
set -uo pipefail

cmd="${1:-}"; proj="${2:-}"; msg="${3:-}"
[ -z "$cmd" ]  && { echo "usage: anchor-git.sh {init|commit|log|status|gitdir} <project-dir> [msg]"; exit 2; }
[ -z "$proj" ] && { echo "error: <project-dir> required"; exit 2; }
mkdir -p "$proj"
proj="$(cd "$proj" && pwd)"
pm="$proj/.project-manager"
bundle="$pm/history.bundle"

key="$(printf '%s' "$proj" | sha1sum | cut -c1-16)"
gdroot="${ANCHOR_GIT_HOME:-/tmp/anchor-git}"
gd="$gdroot/$key.git"
mkdir -p "$gdroot"

g() { git --git-dir="$gd" --work-tree="$proj" -c safe.directory='*' "$@"; }

ensure_repo() {
  if [ ! -d "$gd" ]; then
    if [ -f "$bundle" ]; then
      if git clone -q --bare "$bundle" "$gd" 2>/dev/null; then
        git --git-dir="$gd" config core.bare false
        git --git-dir="$gd" config core.worktree "$proj"
        g reset -q 2>/dev/null || true
      else
        g init -q
      fi
    else
      g init -q
    fi
  fi
  g config user.email >/dev/null 2>&1 || g config user.email "anchor-student@example.com"
  g config user.name  >/dev/null 2>&1 || g config user.name  "Anchor Student"
  return 0
}

refresh_bundle() {
  mkdir -p "$pm"
  local tmp="/tmp/anchor-$key.bundle"
  if g bundle create "$tmp" --all >/dev/null 2>&1; then
    cp "$tmp" "$bundle"
    rm -f "$tmp"
  fi
  return 0
}

case "$cmd" in
  init)
    ensure_repo
    echo "anchor-git: repo ready (git-dir=$gd, work-tree=$proj)"
    if [ -f "$bundle" ]; then echo "anchor-git: history present at $bundle"; fi
    exit 0
    ;;
  commit)
    [ -z "$msg" ] && { echo "error: commit message required"; exit 2; }
    ensure_repo
    g add -A
    if g diff --cached --quiet; then
      echo "anchor-git: nothing to commit (working tree clean)"
      exit 0
    fi
    g commit -q -m "$msg"
    refresh_bundle
    echo "anchor-git: committed $(g rev-parse --short HEAD) \"$msg\""
    exit 0
    ;;
  log)    ensure_repo; g log --oneline --decorate; exit 0 ;;
  status) ensure_repo; g status -sb; exit 0 ;;
  gitdir) echo "$gd"; exit 0 ;;
  *) echo "unknown command: $cmd"; exit 2 ;;
esac
