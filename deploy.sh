set -euo pipefail # See https://chaos.social/@tamtararam/108653282099480851
curl -L https://github.com/rojo-rbx/rojo/releases/download/v7.0.0/rojo-7.0.0-linux.zip | zcat >> rojo
chmod +x rojo
mkdir jojo
mv ./rojo ./jojo/rojo
export PATH=$PWD/jojo:$PATH
echo "[moller] Building roblox"
cd roblox
npm run build
cd ../website
echo "[moller] Building website"
npm run build
node overwrite.mjs # to get polylgot
