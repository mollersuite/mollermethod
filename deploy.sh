curl -L https://github.com/Roblox/foreman/releases/download/v1.0.3/foreman-1.0.3-linux.zip | zcat >> foreman
chmod +x foreman
./foreman install
export PATH=~/.foreman/bin:$PATH
echo "[moller] Building roblox"
cd roblox
npm run build
cd ../website
echo "[moller] Building website"
npm run build
