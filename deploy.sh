set -euo pipefail
cd ../website
echo "[moller] Building website"
npm run build
node overwrite.mjs # to get polylgot
