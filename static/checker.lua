function getName()
	if getexecutorname then
		return getexecutorname()
	end
	if identifyexecutor then
		return identifyexecutor()
	end
	if KRNL_LOADED then
		return 'Krnl'
	end
	if syn then
		return 'Synapse'
	end

	return 'your exploit'
end

local gui = Instance.new('ScreenGui')
local Frame = Instance.new('Frame', gui)
local Header = Instance.new('TextLabel', Frame)
local UIListLayout = Instance.new('UIListLayout', Frame)
local UIPadding = Instance.new('UIPadding', Frame)
local UICorner = Instance.new('UICorner', Frame)
local TextButton = Instance.new('TextButton')
local UIPadding_2 = Instance.new('UIPadding', TextButton)
local UICorner_2 = Instance.new('UICorner', TextButton)
local protect = syn and syn.protect_gui
gui.Name = game:GetService('HttpService'):GenerateGUID()
if gethui then
	gui.Parent = gethui()
else
	if protect then
		protect(gui)
	end

	xpcall(
		function()
			gui.Parent = game:GetService('CoreGui')
		end,
		function()
			gui.Parent =
				game:GetService('Players').LocalPlayer:FindFirstChildOfClass(
					'PlayerGui'
				)
		end
	)
end

function requirement(text)
	local requirement = Instance.new('TextLabel', Frame)
	requirement.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
	requirement.BackgroundTransparency = 1
	requirement.BorderSizePixel = 0
	requirement.Size = UDim2.fromScale(1)
	requirement.AutomaticSize = Enum.AutomaticSize.Y
	requirement.Font = Enum.Font.GothamBold
	requirement.Text = text
	requirement.TextColor3 = Color3.fromRGB(0, 0, 0)
	requirement.TextSize = 14
	requirement.TextXAlignment = Enum.TextXAlignment.Left
	return requirement
end

Frame.AutomaticSize = Enum.AutomaticSize.XY
Frame.Parent = gui
Frame.AnchorPoint = Vector2.new(0.5, 0.5)
Frame.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
Frame.BorderColor3 = Color3.fromRGB(27, 42, 53)
Frame.BorderSizePixel = 0
Frame.Position = UDim2.fromScale(0.5, 0.5)
Frame.Size = UDim2.fromOffset(400)

Header.Parent = Frame
Header.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
Header.BackgroundTransparency = 1
Header.BorderSizePixel = 0
Header.Size = UDim2.new(1, 0, 0, 50)
Header.Font = Enum.Font.GothamBlack
Header.RichText = true
Header.Text = 'Running tests...'
Header.TextColor3 = Color3.fromRGB(0, 0, 0)
Header.TextSize = 14

UIListLayout.Parent = Frame
UIListLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder

local requirements = {
	['getcustomasset/getsynasset'] = function()
		return getcustomasset or getsynasset
	end,
	writefile = function()
		return writefile
	end,
	loadstring = function()
		local success = pcall(function()
			local one, two = loadstring('return ...')(1, 2)
			assert(one == 1 and two == 2)
		end)
		return success
	end,
	['Level 2 or higher'] = function()
		local success = pcall(function()
			type(game:GetService('CoreGui').Name)
		end)
		return success
	end
}

local supported = true
for k, v in next, requirements do
	local result = v()
	if not result then
		supported = false
	end
	requirement((result and '✅ ' or '❎ ') .. k)
end

if supported then
	pcall(gui.Destroy, gui)
	local API =
		loadstring(game:HttpGet'https://mthd.ml/api.lua', 'mollermethod API')()
	API.notify{
		Text = getName() .. ' can run mollermethod',
		App = 'Exploit Health Checker',
		Icon = 'https://mthd.ml/health.png'
	}
	return
else
	Header.Text =
		string.format(
			'<font color="rgb(248, 81, 73)">Sadly,</font> %s cannot run mollermethod.',
			getName()
		)
end

UIPadding.Parent = Frame
UIPadding.PaddingBottom = UDim.new(0, 5)
UIPadding.PaddingLeft = UDim.new(0, 5)
UIPadding.PaddingRight = UDim.new(0, 5)
UIPadding.PaddingTop = UDim.new(0, 5)

UICorner.Parent = Frame

TextButton.AutoButtonColor = true
TextButton.MouseButton1Click:Connect(function()
	pcall(gui.Destroy, gui)
end)
TextButton.AutomaticSize = Enum.AutomaticSize.XY
TextButton.Parent = Frame
TextButton.BackgroundColor3 = Color3.fromRGB(200, 200, 200)
TextButton.BorderColor3 = Color3.fromRGB(27, 42, 53)
TextButton.BorderSizePixel = 0
TextButton.Size = UDim2.new(0.5, 0, 0, 0)
TextButton.Font = Enum.Font.GothamBlack
TextButton.Text = 'Close'
TextButton.TextColor3 = Color3.fromRGB(0, 0, 0)
TextButton.TextSize = 14

UIPadding_2.Parent = TextButton
UIPadding_2.PaddingBottom = UDim.new(0, 5)
UIPadding_2.PaddingTop = UDim.new(0, 5)

UICorner_2.Parent = TextButton
