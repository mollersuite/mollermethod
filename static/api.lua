local API = {}
local protect = syn and syn.protect_gui

function API.parent(gui)
	gui.Name = game:GetService('HttpService'):GenerateGUID()
	if gethui then
		gui.Parent = gethui()
	else
		if protect then
			protect(gui)
		end

		gui.Parent = game:GetService('CoreGui')
	end
	return gui
end

--[[
    From a URL, return a Content string
    ? Should we let users specify a custom prefix? Should whitelabeling change the prefix?
]]
function API.asset(url)
	if url:match('^rbxasset.*://') then
		return url
	end
	local name = url:match('([^/]+)$')
	local data = game:HttpGet(url)
	writefile('mollermethod_' .. name, data)
	return (getcustomasset or getsynasset)('mollermethod_' .. name)
end

--[[
    Play a Sound undetectably
]]
function API.play(id, vol)
	local sound = Instance.new('Sound')
	sound.SoundId = id
	sound.Volume = vol or 1
	game:GetService('SoundService'):PlayLocalSound(sound)
end

local notifySound = API.asset('https://mthd.ml/notif.mp3')
local notifGUI = Instance.new('ScreenGui')
notifGUI.ResetOnSpawn = false
notifGUI.DisplayOrder = (2 ^ 31) - 1
API.parent(notifGUI)

--[[
    ? How the fuck is this supposed to look?
    Maybe like Windows 11?
    To compare - https://molly.i-like.dog/​‌‌​​​​‌​‌​​‌‌‌‌​‌‌​​​‌‌​‌‌​‌‌‌​​‌‌‌​‌‌​​​‌‌‌​​​​​‌‌​​‌​​‌​​‌​‌‌
]]
function API.notify(options)
	local text = options.Text
	local icon = API.asset(options.Icon or 'https://mthd.ml/icon.png')
	local app = options.App or 'mollermethod'
	local duration = options.Duration or 5
	API.play(notifySound)
end

return API
