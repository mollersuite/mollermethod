local CONFIG = ... or { debug = true }
local Tween = game:GetService("TweenService")
local Debris = game:GetService("Debris")

local ids =
	{
		"rbxassetid://7037264869",
		"rbxassetid://7037156897",
		"rbxassetid://7043731194",
		"rbxassetid://7037269561",
		"rbxassetid://7037272153",
		"rbxassetid://7037339934",
		"rbxassetid://7037356929",
		"rbxassetid://7044042331",
		"rbxassetid://7044088926",
		"rbxassetid://7046289590",
	}

local GUI = Instance.new("ScreenGui")
CONFIG.gui = GUI
GUI.Name = game:GetService("HttpService"):GenerateGUID()
GUI.IgnoreGuiInset = true
GUI.ResetOnSpawn = false
GUI.DisplayOrder = 7
if gethui then
	GUI.Parent = gethui()
else
	xpcall(
		function()
			GUI.Parent = game:GetService("CoreGui")
		end,
		function()
			GUI.Parent = game:GetService("Players").LocalPlayer:WaitForChild("PlayerGui")
		end
	)
end
local loading = true
task.spawn(function()
	local text = Instance.new("TextLabel", GUI)
	text.TextTransparency = 1
	text.BackgroundTransparency = 1
	Instance.new("UICorner", text).CornerRadius = UDim.new(0, 10)
	text.BackgroundColor3 = Color3.new(1, 1, 1)
	text.TextColor3 = Color3.new(0, 0, 0)
	text.Size = UDim2.new(0, 200, 0, 20)
	text.Position = UDim2.new(0.5, 0, 0.5, 0)
	text.Font = Enum.Font.Gotham
	text.ZIndex = 120
	text.AnchorPoint = Vector2.new(0.5, 0.5)
	text.Text = "mollermethod is loading..."
	text.TextSize = 14
	text.TextWrapped = true
	game:GetService("TweenService"):Create(
		text,
		TweenInfo.new(.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, true),
		{
			TextTransparency = 0,
			BackgroundTransparency = 0,
		}
	):Play()

	while loading do
		local particle = Instance.new("ImageLabel", GUI)
		particle.ImageTransparency = 1
		particle.Size = UDim2.new(0, 150, 0, 150)
		particle.Image = ids[math.random(#ids)]
		particle.BackgroundTransparency = 1
		particle.ScaleType = Enum.ScaleType.Fit
		particle.ZIndex = 100
		particle.Position = UDim2.new(math.random(), 0, math.random(), 0)
		Tween:Create(particle, TweenInfo.new(.1), { ImageTransparency = 0 }):Play()
		Tween:Create(
			particle,
			TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.In),
			{
				Position = UDim2.new(),
				Size = UDim2.new(),
			}
		):Play()
		Debris:AddItem(particle, 1.5)
		task.wait(1 / 60)
	end
	game:GetService("Debris"):AddItem(text, .5)
	game:GetService("TweenService"):Create(
		text,
		TweenInfo.new(.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, true),
		{
			TextTransparency = 1,
			BackgroundTransparency = 1,
		}
	):Play()
end)
xpcall(
	function()
		if not CONFIG.debug then
			writefile("mollermethod.rbxm", game:HttpGetAsync("https://mthd.ml/mollermethod.rbxm"))
		end

		local rbxmSuite =
			loadstring(
				game:HttpGetAsync(
					"https://github.com/richie0866/rbxm-suite/releases/download/v2.0.2/rbxm-suite.lua"
				)
			)()
		local project = rbxmSuite.launch("mollermethod.rbxm", {
			debug = true, --CONFIG.Debug, -- Oddly, debug mode is 2x faster than release mode.
			verbose = CONFIG.debug,
			runscripts = false,
		})
		rbxmSuite.require(project)(CONFIG)
		loading = false
	end,
	function(err)
		local text = Instance.new("TextButton", GUI)
		Instance.new("UICorner", text).CornerRadius = UDim.new(0, 10)
		text.BackgroundColor3 = Color3.new(1, 0, 0)
		text.TextColor3 = Color3.new(1, 1, 1)
		text.Size = UDim2.new(0, 250, 0, 20)
		text.Position = UDim2.new(0.5, 0, 0.5, 0)
		text.Font = Enum.Font.GothamBlack
		text.ZIndex = 120
		text.AnchorPoint = Vector2.new(0.5, 0.5)
		text.Text = "mollermethod was unable to load"
		text.TextSize = 14
		text.TextWrapped = true
		text.Activated:Connect(function()
			GUI:Destroy()
		end)
		loading = false
		warn(err)
	end
)