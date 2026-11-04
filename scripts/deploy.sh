#!/usr/bin/env bash
# Builds the site and syncs dist/ to a remote server with rsync.
# Files on the server that are not in dist/ are deleted.
# Usage: npm run deploy -- <ssh-key> <user@host> <remote-path>
set -euo pipefail

if [ "$#" -ne 3 ]; then
  echo "Usage: npm run deploy -- <ssh-key> <user@host> <remote-path>" >&2
  exit 1
fi

KEY="$1"
TARGET="$2"
REMOTE_PATH="${3%/}"

# Check the arguments before building, so a bad call does not leave a stray copy behind
if [ ! -f "$KEY" ]; then
  echo "SSH key not found: $KEY" >&2
  exit 1
fi

cd "$(dirname "$0")/.."

npm run build
rsync -avz --delete -e "ssh -i $KEY" dist/ "$TARGET:$REMOTE_PATH/"
echo "Deployed to $TARGET:$REMOTE_PATH"
