curl -L https://github.com/Roblox/foreman/releases/download/v1.0.3/foreman-1.0.3-linux.zip | zcat >> foreman
chmod +x foreman
./foreman install
export PATH=~/.foreman/bin:$PATH
npx pnpm run build --filter ./roblox
remodel run scripts/bundle.lua ./website/lib/loader.client.lua
npx pnpm run build --filter ./website
