# mollermethod

## Usage

### Without API

```lua
loadstring(game:HttpGet 'https://mthd.ml') {
  -- config will be here soon™️
}
```

### With API

```lua
_G.mollermethod = loadstring(game:HttpGet 'https://mthd.ml') {
  -- config will be here soon™️
}
_G.mollermethod.notify {
  -- Defaults
  Text = 'Press Shift+Delete to open mollermethod',
  App = 'mollermethod',
  Icon = 'https://mthd.ml/icon.png'
}
```

### Testing locally

```lua
loadstring(game:HttpGet 'http://localhost:3000/static/init.lua') {
  root = 'http://localhost:3000/static'
}
```

## API

```lua
API.notify({
  App = string?,
  Text = string,
  Icon = string?
}) -> Frame
-- Parent a GUI
API.parent(gui: ScreenGui) -> ScreenGui
-- URL in, Roblox ID out. (Useful for notify and play)
API.asset(url: string) -> Content
-- Play a sound, without triggering any anti-cheat
API.play(id: Content, volume: number?) -> void
```
