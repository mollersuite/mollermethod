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
	if getexecutorname and getexecutorname() == 'ScriptWare' then
		writefile('mollermethod_' .. name, data, true)
		return 'rbxasset://mollermethod_' .. name
	else
		writefile('mollermethod_' .. name, data)
		return (getcustomasset or getsynasset)('mollermethod_' .. name)
	end
end

--[[
    Play a Sound undetectably
]]
function API.play(id, vol)
	local sound = Instance.new('Sound')
	sound.SoundId = id
	sound.Volume = vol or 5
	game:GetService('SoundService'):PlayLocalSound(sound)
end

local notifySound = API.asset('https://mthd.ml/sounds/notif.mp3')

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
	local NOTIF = Instance.new('Frame')
	local UICorner = Instance.new('UICorner')
	local Frame = Instance.new('Frame')
	local UIListLayout = Instance.new('UIListLayout')
	local ic = Instance.new('ImageLabel')
	local TextLabel = Instance.new('TextLabel')
	local UIListLayout_2 = Instance.new('UIListLayout')
	local TextLabel_2 = Instance.new('TextLabel')
	NOTIF.Name = 'NOTIF'
	NOTIF.Parent = notifGUI
	NOTIF.AnchorPoint = Vector2.new(1, 1)
	NOTIF.BackgroundColor3 = Color3.fromRGB(28, 28, 28)
	NOTIF.Position = UDim2.new(1, -15, 3, -15)
	NOTIF.Size = UDim2.fromOffset(362, 148)
	UICorner.CornerRadius = UDim.new(0, 12)
	UICorner.Parent = NOTIF
	Frame.Parent = NOTIF
	Frame.BackgroundColor3 = Color3.new(1, 1, 1)
	Frame.BackgroundTransparency = 1.000
	Frame.Size = UDim2.new(1, 0, 0, 40)
	UIListLayout.Parent = Frame
	UIListLayout.FillDirection = Enum.FillDirection.Horizontal
	UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
	UIListLayout.VerticalAlignment = Enum.VerticalAlignment.Center
	UIListLayout.Padding = UDim.new(0, 5)
	ic.Name = 'icon'
	ic.Parent = Frame
	ic.BackgroundColor3 = Color3.new(1, 1, 1)
	ic.BackgroundTransparency = 1.000
	ic.Size = UDim2.fromOffset(25, 25)
	ic.Image = icon
	ic.ScaleType = Enum.ScaleType.Fit
	TextLabel.Parent = Frame
	TextLabel.BackgroundColor3 = Color3.new(1, 1, 1)
	TextLabel.BackgroundTransparency = 1.000
	TextLabel.Size = UDim2.fromOffset(0, 25)
	TextLabel.Position = UDim2.fromOffset(30, 0)
	TextLabel.AutomaticSize = Enum.AutomaticSize.X
	TextLabel.Font = Enum.Font.JosefinSans
	TextLabel.Text = app
	TextLabel.TextColor3 = Color3.new(1, 1, 1)
	TextLabel.TextSize = 20.000
	local uistroke = Instance.new('UIStroke')
	uistroke.ApplyStrokeMode = Enum.ApplyStrokeMode.Contextual
	uistroke.Color = Color3.fromRGB(42, 46, 46)
	uistroke.LineJoinMode = 'Round'
	uistroke.Thickness = 5
	uistroke.Transparency = 0
	uistroke.Parent = NOTIF
	UIListLayout_2.Parent = NOTIF
	UIListLayout_2.SortOrder = Enum.SortOrder.LayoutOrder
	TextLabel_2.Parent = NOTIF
	TextLabel_2.BackgroundColor3 = Color3.new(1, 1, 1)
	TextLabel_2.BackgroundTransparency = 1.000
	TextLabel_2.Size = UDim2.new(1, 0, 1, -40)
	TextLabel_2.Font = Enum.Font.SourceSans
	TextLabel_2.Text = text
	TextLabel_2.TextColor3 = Color3.new(1, 1, 1)
	TextLabel_2.TextSize = 14.000
	TextLabel_2.TextWrapped = true
	TextLabel_2.TextXAlignment = Enum.TextXAlignment.Left
	TextLabel_2.TextYAlignment = Enum.TextYAlignment.Top
	NOTIF:TweenPosition(UDim2.new(1, -15, 1, -15))
	task.spawn(function()
		task.wait(duration)
		NOTIF:TweenPosition(UDim2.new(1, -15, 3, -15))
		for i, v in pairs(gui:GetDescendants()) do
			if v:IsA('TextLabel') then
				game:GetService('TweenService'):Create(v, TweenInfo.new(0.5), {
					TextTransparency = 1
				})
			elseif v:IsA('ImageLabel') then
				game:GetService('TweenService'):Create(v, TweenInfo.new(0.5), {
					ImageTransparency = 1
				})
			elseif v:IsA('Frame') then
				game:GetService('TweenService'):Create(v, TweenInfo.new(0.5), {
					BackgroundTransparency = 1
				})
			end
		end
		task.wait(0.5)
		NOTIF:ClearAllChildren()
		NOTIF:Destroy()
	end)
	API.play(notifySound)
end
--[[
	Scripts API
]]

API.Scripts = {}
API.Cmds = {}
function API.Command(Name, Function)
	if not API.Scripts[Name] then
		API.Scripts[Name] = Function
		table.insert(API.Cmds, Name)
	end
end
function API.Run(Name, Arguments)
	API.Scripts[Name](Arguments)
end

local Players = game:GetService('Players')
local StarterGui = game:GetService('StarterGui')
local prefix = '-/'
local fpdh = workspace.FallenPartsDestroyHeight
-- what do i press to fix jack?
API.Command('refresh', function(frame)
	local rp = Players.LocalPlayer.Character.HumanoidRootPart
	local cframe = rp.CFrame
	task.delay(0.1, function()
		pcall(function()
			workspace.FallenPartsDestroyHeight = -1e9
		end)
		rp.CFrame = CFrame.new(0, -(1e9 - 2), 0)
		task.spawn(function()
			Players.LocalPlayer.CharacterAdded:Wait()
			task.wait(0.07)
			pcall(function()
				workspace.FallenPartsDestroyHeight = fpdh
			end)
			local rp = Players.LocalPlayer.Character.HumanoidRootPart
			rp.CFrame = cframe
		end)
	end)
end)
API.Command('void', function(frame)
	for i, v in pairs(Players:GetPlayers()) do
		local thr = Instance.new('BodyThrust')
		thr.Parent = Players.LocalPlayer.Character
		thr.Force = Vector3.new(1200, 0, 1200)
		thr.Location = v.Character.HumanoidRootPart.CFrame
		task.wait(1)
		thr:Destroy()
	end
end)
API.Command('help', function(frame)
	table.foreach(API.Cmds, function(msg)
		StarterGui:SetCore('ChatMakeSystemMessage', {
			Text = msg,
			Font = Enum.Font.SourceSansBold,
			Color = Color3.fromRGB(155, 155, 155),
			FontSize = Enum.FontSize.Size18
		})
	end)
end)
Players.LocalPlayer.Chatted:Connect(function(cmd)
	if cmd:match('^-/') then
		local msg = cmd:sub(prefix:len() + 1)
		API.Run(msg, {})
	end
end)
return API
