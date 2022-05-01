curl -L https://github.com/Roblox/foreman/releases/download/v1.0.3/foreman-1.0.3-linux.zip | zcat >> foreman
chmod +x foreman
./foreman install
export PATH=~/.foreman/bin:$PATH
npx pnpm install
npx pnpm run build --filter ./roblox
npx pnpm run build --filter ./website
