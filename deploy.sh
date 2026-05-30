#!/usr/bin/env bash
# ============================================================
# deploy.sh – Galli's & Co. – VPS deployment script
#
# Assumptions:
#   • Repo cloned to  /home/Gallisandco/
#   • Node >=20, pnpm, PM2 installed globally
#   • nginx running and configured
#
# First-time setup:
#   chmod +x deploy.sh
#   ./deploy.sh
#
# Subsequent deploys:
#   git pull && ./deploy.sh
# ============================================================

set -euo pipefail

APP_DIR="/home/Gallisandco"
STANDALONE_DIR="$APP_DIR/.next/standalone"

echo "▶  [1/5] Pulling latest code..."
cd /home/Gallisandco
git pull origin main

echo "▶  [2/5] Installing dependencies..."
cd "$APP_DIR"
pnpm install --frozen-lockfile

echo "▶  [3/5] Building Next.js (production)..."
NODE_ENV=production pnpm build

# With output:'standalone', Next.js creates .next/standalone but does NOT
# automatically copy the static assets.  We copy them manually:
echo "▶  [4/5] Copying static assets into standalone bundle..."
cp -r "$APP_DIR/.next/static"  "$STANDALONE_DIR/.next/static"
cp -r "$APP_DIR/public"         "$STANDALONE_DIR/public"

echo "▶  [5/5] Reloading PM2 process..."
if pm2 describe gallisandco-front > /dev/null 2>&1; then
    pm2 reload ecosystem.config.js --env production
else
    pm2 start  ecosystem.config.js --env production
fi
pm2 save

echo ""
echo "✅  Deploy complete!  Site running at https://gallisandco.com"
