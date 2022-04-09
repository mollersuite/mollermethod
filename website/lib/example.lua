local util = ...

return {
	Name = "mollermethod+",
	Description = "mollermethod, but better.",
	Author = "SunRaysEffect", -- maybe use a Discord ID instead?
	-- Runs on every player
	Tags = function(Player, tag)
		if Player.Name == "SunRaysEffect" or Player.Name == "UIPadding" then
			tag"Roblox Instance"
		end
	end,
	-- actions are like commands but are used on a player and display in bracket and mollybdos at the same time
	Actions = {
		-- key = command name
		shatter = {
			description = "star glitcher funny!",
			-- display = 'Shatter!' -- display is what it would say on Mollybdos, defaults to the command name but with the first letter uppercase
			-- enabled = function () return math.random() > 0.5 end, -- if this returns false then it doesnt display in mollybdos and is grayed out in bracket, defaults to always true
			execute = function(player)
				print("get shattered", player)
			end,
		},
	},
	-- maybe custom commands?
}