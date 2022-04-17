local GUI = Instance.new("ScreenGui", game:GetService('Players').LocalPlayer:FindFirstChildOfClass('PlayerGui'))
GUI.Name = game:GetService("HttpService"):GenerateGUID()
GUI.IgnoreGuiInset = true
GUI.ResetOnSpawn = false
GUI.DisplayOrder = 7

-- Generate a random theme with accent, background, and foreground colors, all in hex
local function generateTheme()
	local theme = {}
	theme.accent = string.format("%x", math.random(0, 0xFFFFFF))
	theme.background = string.format("%x", math.random(0, 0xFFFFFF))
	theme.foreground = string.format("%x", math.random(0, 0xFFFFFF))
	return theme
end
local theme
while true do
	local worked = pcall(function ()
		theme = generateTheme()
		Color3.fromHex(theme.accent)
		Color3.fromHex(theme.background)
		Color3.fromHex(theme.foreground)
	end)
	if worked then
		break
	end
end
require(game:GetService('ReplicatedStorage').mollermethod) {
	debug = true,
	gui = GUI,
	theme = generateTheme()
}
