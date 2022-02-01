local Players = game:GetService'Players'
local me = Players.LocalPlayer

function accessory_check(accessories, target)
	for _, v in next, accessories do
		if table.find(target, v.AssetId) then
			return true
		end
	end
end

local accessories_based = {
	Furry = {
		5410481915,
		3860144255,
		4319676598,
		5064417624,
		5064418572,
		4436864392,
		5509213450,
		4904727066,
		4545298365,
		8087490807,
		4772333114,
		4684937821,
		7793343203,
		8087502591,
		4708710111,
		8087499688,
		6069121093,
		6069116135,
		6069109016
	},
	-- useless tag imo
	Emotimask = {
		4904153006,
		5131962127,
		6007988173,
		4904142545,
		5314008248,
		5131965801,
		5314012935,
		5314009328,
		4904151381,
		6342613541,
		5131956780,
		6007988855,
		4904148450,
		6524481730,
		5131959287,
		6342617790,
		4904139880,
		5314010695,
		5356228327,
		4904137145
	}
}

local body_based = {
	["mom's credit card"] = { 139607718, 134082579, 139607673 } -- hi shlex
}

return {
	Name = 'Tags',
	Version = '0.1.0',
	Author = 'Jack W.',
	Description = 'Tags provide extra information to players in the playerlist. This plugin contains the core tags of mollermethod.',
	-- tags table will have __newindex setup so that tags can get added at any time
	Tags = function(plr, tags)
		if plr.AccountAge <= 30 then -- i checked, it really does replicate
			table.insert(tags, 'Alt') -- maybe this should be in gray text like 30d next to the name/display name
		end
		if plr:IsFriendsWith(me.UserId) then
			table.insert(tags, 'Friend')
		end

		local description = game:GetService('Players'):GetHumanoidDescriptionFromUserId(plr.UserId)

		if description.BodyTypeScale == 1 and description.HeightScale >= 1.0499999523162842 then -- roblox is drunk today
			table.insert(tags, 'Slender')
		end

		-- warning: ass code ahead
		for name, assets in pairs(body_based) do
			if table.find(assets, description.Head) or table.find(
				assets,
				description.Torso
			) or table.find(assets, description.LeftArm) or table.find(
				assets,
				description.RightArm
			) or table.find(assets, description.LeftLeg) or table.find(assets, description.RightLeg) then
				table.insert(tags, name)
			end
		end

		local accessories = description:GetAccessories(true)
		for name, assets in pairs(accessories_based) do
			if accessory_check(accessories, assets) then
				table.insert(tags, name)
			end
		end
	end
}
