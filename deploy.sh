curl -L https://github.com/Roblox/foreman/releases/download/v1.0.3/foreman-1.0.3-linux.zip | zcat >> foreman
chmod +x foreman
./foreman install
export PATH=~/.foreman/bin:$PATH
echo "[moller] Installing packages"
npx pnpm install
echo "[moller] Building roblox"
npx pnpm run build --filter ./roblox
echo "[moller] Building website"
npx pnpm run build --filter ./website
