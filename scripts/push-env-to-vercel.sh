#!/usr/bin/env bash
# Push the NEXT_PUBLIC_FIREBASE_* values from .env.local into Vercel.
#
# Prerequisites (both are interactive, so run them yourself first):
#   npx vercel login
#   npx vercel link          # pick the existing kroue-dev project
#
# Then:
#   bash scripts/push-env-to-vercel.sh
#
# Values are piped straight into the Vercel CLI and are never printed.

set -euo pipefail

ENV_FILE=".env.local"
# NEXT_PUBLIC_* vars are inlined at build time, so they must exist in every
# environment you actually build for.
TARGETS=(production preview development)

KEYS=(
  NEXT_PUBLIC_FIREBASE_API_KEY
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  NEXT_PUBLIC_FIREBASE_PROJECT_ID
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  NEXT_PUBLIC_FIREBASE_APP_ID
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
)

if [ ! -f "$ENV_FILE" ]; then
  echo "error: $ENV_FILE not found. Run this from the project root." >&2
  exit 1
fi

if [ ! -d ".vercel" ]; then
  echo "error: this folder isn't linked to a Vercel project yet." >&2
  echo "       run 'npx vercel login' then 'npx vercel link' first." >&2
  exit 1
fi

for key in "${KEYS[@]}"; do
  # Take everything after the first '=' so values containing '=' survive.
  value="$(grep -m1 "^${key}=" "$ENV_FILE" | cut -d= -f2-)"

  if [ -z "$value" ]; then
    echo "skip  $key (empty in $ENV_FILE)"
    continue
  fi

  for target in "${TARGETS[@]}"; do
    # Remove any existing value first so re-running this is safe.
    npx vercel env rm "$key" "$target" --yes >/dev/null 2>&1 || true
    printf '%s' "$value" | npx vercel env add "$key" "$target" >/dev/null 2>&1
  done

  echo "set   $key  (${#value} chars) -> ${TARGETS[*]}"
done

echo
echo "Done. Now trigger a fresh build so the values get inlined:"
echo "  npx vercel --prod --force"
