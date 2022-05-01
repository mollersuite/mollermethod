curl -L https://github.com/Roblox/foreman/releases/download/v1.0.3/foreman-1.0.3-linux.zip | zcat >> foreman
chmod +x foreman
./foreman install
export PATH=~/.foreman/bin:$PATH
echo "[moller] Installing packages"
pnpm install
echo "[moller] Building roblox"
pnpm run build --filter ./roblox
echo "[moller] Building website"
pnpm run build --filter ./website
ls website
ls website/build
