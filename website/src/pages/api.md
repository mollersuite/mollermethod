---
title: "catay API docs"
description: "Make catay plugins."
layout: ../layouts/Layout.astro
---

Catay has three types of exports: **Methods**, **Tags**, and **Providers.**

## Methods

Methods are the main type of export you will use. They are best compared to Discord's
[Application Commands.](https://discord.com/developers/docs/interactions/application-commands)

Let's take a look at a simple plugin with one method:

```lua
local api = ... -- Every plugin should have this line at the top - it's how you access Catay's API.
local Method = api.Method

-- This is a Method!
local spawn_part = Method{
	Name = "Part",
	Description = "Spawns a part on people",
	Replicated = false,
	Disabled = false,
	Run = function(args)
		for _, player in pairs(args.People) do
			Instance.new("Part", workspace):PivotTo(player.Character:GetPivot())
		end
	end,
	Arguments = {
		People = {
			Required = true,
			Type = "players",
		},
	},
}

-- This is where plugin metadata and your exports are.
return {
	Name = "My first plugin!",
	Version = "v1.0.0",
	-- Simply add your methods and tags here, without a key.
	spawn_part,
}
```

### Arguments

Arguments are how your Method can get input from the player.

```lua
Arguments = {
	People = {
		Type = "players",
		Required = true,
	},
}
```

`Arguments` is a table where the keys are the argument names, and the values are tables with the
type, and a boolean saying if it's required.

#### Types

Here's a quick map of our type names to Luau types:

- **players**: `{Player}`
  - The user will be able to access an autocomplete where they can select players and tags. For
        example, the user could invoke a `kill` method with the Furries tag, and a player named
        SunRaysEffect. Catay handles all of this for you, so you will simply get the list of
        players.
- **player**: `Player`
  - Like previous, but the user can only select one player. They will be able to select a tag,
        but it will pick the player in the tag with the most score.
- **string**: `string`
  - Unlike other command systems, this can contain spaces.
- **number**: `number`

### Run

This is where the magic happens!

```lua
Run = function(args)
	for _, player in pairs(args.People) do
		Instance.new("Part", workspace):PivotTo(player.Character:GetPivot())
	end
end
```

`args` is a table with your [Arguments](#arguments) from before.

Say your Method was invoked on player SunRaysEffect. You'd get a table like this:

```lua
{
	People = {
		(game:service "Players"):FindFirstChild "SunRaysEffect"
	}
}
```

You can also run your Methods from other parts of your code. This may be useful for reducing code
complexity.

```lua
spawn_part{
	People = { game:service"Players":FindFirstChild"SunRaysEffect" },
}
```

If you yield for more than 5 seconds, Catay will display a notification to the user when your Method
completes.

### Properties

Besides `Run` and `Arguments`, your Method has other properties:

```lua
Name = "Part", -- Required
```

This is what your Method will be called in Commander, the player list, and others. It can contain
spaces! Autocomplete is not case sensitive.

```lua
Replicated = false, -- Optional
```

With the power of Catay's serverside integration, you can use `Replicated` to effectively disable FE
for your Methods.

Of course, the user will need to be in a backdoored game; you can use [Providers.Serverside](#providersserverside) to add
support for your backdoor.

```lua
Disabled = false, -- Optional
```

If set to true, your Method will not show up in autocomplete.

Properties can be modified at runtime! This can be useful when using `Disabled`.

```lua
spawn_part.Disabled = true
```

## Tags

Tags allow you to group players for the user to use in autocomplete, for them to see in the player
list, and for you to add filters in your [Methods.](#methods)

You can also give a score for your tags, for use when sorting: For example, a "Furry" tag could be
scored based on how many accessories and groups a player is in.

Let's amend the previous plugin to add a Tag:

```lua
local api = ... -- Every plugin should have this line at the top - it's how you access Catay's API.
local Method = api.Method
local Tag = api.Tag

-- This is a Method!
local spawn_part = Method{
	Name = "Part",
	Description = "Spawns a part on people",
	Replicated = false,
	Disabled = false,
	Run = function(args)
		for _, player in pairs(args.People) do
			Instance.new("Part", workspace):PivotTo(player.Character:GetPivot())
		end
	end,
	Arguments = {
		People = {
			Required = true,
			Type = "players",
		},
	},
}

-- This is a tag!
local account_age = Tag{
	Name = "Veteran",
	Filter = function(player)
		return math.floor(player.AccountAge / 365.25)
	end,
}

-- This is where plugin metadata and your exports are.
return {
	Name = "My first plugin!",
	Version = "v1.0.0",
	-- Simply add your methods and tags here, without a key.
	spawn_part,
	account_age,
}
```

You return a number in your Filter function.

If it's 0, your tag will not be displayed. If it's 1, your tag will be displayed, without a score.
If it's 2 or larger, your tag will be displayed along with your score.

## Providers

Providers allow you to do two things:

1. Give Catay game statistics for use in Autofarm Mode, and webhooks.
2. Tell Catay how to run serverside code in a backdoored game.

The API is currently quite a bit different from the previous two:

```lua
-- Our code from before ...
return {
	-- Our metadata and exports...

	Providers = {
		Serverside = function(code)
			if game.PlaceId == "a backdoored game with a really dumb remote" then
				game.ReplicatedStorage.SS:FireServer(code)
			end
		end,
		Screensaver = {
			Gold = function()
			if game.PlaceId ~= 537413528 then return end
				return game.Players.LocalPlayer.Variables.Gold.Value
			end
		},
	},
}
```

### Providers.Serverside

...is where Catay gives you code and you run it on the server.

### Providers.Screensaver

This is where you can provide game stats for Autofarm Mode.

It's a table where keys are the name of the stat, and the value is a function where you return that stat's value. If you return `nil`, Catay will not display it.
