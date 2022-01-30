local ctx, API = ...
local remote = ctx.remote

-- maybe we should attach metatables to everything so we can detect when you change props like Enabled

return {
	Name = 'assholesuite',
	Version = '1.0',
	Author = 'Mr. Hase',
	Description = 'be an asshole to your friends',
	Actions = { -- actions are both playerlist and commands
	{
		Display = 'Kick', -- on playerlist
		Command = 'kick', -- on bracket
		Enabled = ctx.remote,
		Function = function(player)
			player:Kick('You have been kicked by mollermethod')
		end
	}, {
		Display = 'Harpoon', -- on playerlist
		Command = 'harpoon', -- on bracket
		Enabled = game.PlaceId == 537413528,
		Function = function(player)
			-- idk
		end
	} },
	Tags = function(plr)
		-- nil or {} = no tags
		if plr.Name == 'Jack_Hase2' then
			return { 'asshole' }
		else
			return nil
		end
	end
}
