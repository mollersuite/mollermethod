if not game:IsLoaded() then game.Loaded:Wait() end
local Debris = game:GetService("Debris")
local HttpService = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")

local PKG_VERSION = require(script.version)
local Roact = require(script.include.node_modules.roact.src)
local Notification = require(script.Notification) -- From Lunar, we should do this ourselves
local Neo = require(script.Neo)
local Bracket = require(script.Bracket).default

local CONSTANTS = require(script.constants)
local colors = require(script.colors).default
local util = require(script.util)
local iyToBracket = require(script.Bracket.iy)

---@class Theme
---@field background string
---@field foreground string
---@field accent	 string

---@class Config
---@field debug				boolean | nil Enable debug mode. Defaults to false.
---@field gui     			ScreenGui The UI to parent mollermethod to.
---@field plugins			string[] | nil Source code of plugins to load.
---@field theme		 		Theme | nil Background, foreground and accent colors.
---@field volume			number | nil
---@field bracket_toggle	Enum.KeyCode | nil

---mollermethod's loader
---@param passed_config Config
return function(passed_config)
	local config = passed_config or {}

	if writefile and not isfile("mollermethod.json") then
		writefile(
			"mollermethod.json",
			HttpService:JSONEncode({
				config = {
					bracket_toggle = Enum.KeyCode.LeftBracket;
					debug = false;
					volume = 5;
					theme = {
						accent = "#9339ff";
						background = "#1c1c1c";
						foreground = "#ffffff";
					};
				},
			})
		)
	elseif isfile and isfile('mollermethod.json') then
		config = HttpService:JSONDecode(readfile('mollermethod.json')).config or {}
		for k, v in pairs(passed_config) do
			config[k] = v
		end
	else
		config = passed_config
	end


	if config.theme then
		colors.ACCENT = Color3.fromHex(config.theme.accent)
		colors.WHITE = Color3.fromHex(config.theme.foreground)
		colors.BLACK = Color3.fromHex(config.theme.background)
	end

	util.vol(config.volume or 5)

	local notificationHolder = Instance.new("Frame", passed_config.gui)
	notificationHolder.AnchorPoint = Vector2.new(1, 0)
	notificationHolder.BackgroundColor3 = Color3.new(1, 1, 1)
	notificationHolder.BackgroundTransparency = 1
	notificationHolder.Position = UDim2.fromScale(1, 0)
	notificationHolder.Size = UDim2.fromScale(1, 1)

	local padding = Instance.new("UIPadding", notificationHolder)
	padding.PaddingBottom = UDim.new(0, 15)
	padding.PaddingRight = UDim.new(0, 15)

	local uIListLayout = Instance.new("UIListLayout", notificationHolder)
	uIListLayout.Padding = UDim.new(0, 10)
	uIListLayout.HorizontalAlignment = Enum.HorizontalAlignment.Right
	uIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
	uIListLayout.VerticalAlignment = Enum.VerticalAlignment.Bottom

	util.play("rbxassetid://9064208547") -- Startup sound

	local colorsBinding = { Roact.createBinding(colors) }
	-- Load plugins
	local plugins = {}
	local pluginUtil = {
		notify = function(name, description, icon, duration, callback)
			return Notification.new(name, description, icon, duration, notificationHolder, callback)
		end,
		GUI = config.gui,
		colors = colorsBinding[1],
		Snapdragon = require(script.include.node_modules.snapdragon.src),
		Roact = Roact
	}

	-- Load user plugins
	if config.plugins then
		for _, source in pairs(config.plugins) do
			task.defer(pcall, function()
				local plugin, err = loadstring(source)
				assert(plugin, err)
				table.insert(plugins, plugin(pluginUtil))
			end)
		end
	end

	-- Load default plugins
	for _, module in pairs(script.plugins:GetDescendants()) do
		if module:IsA("ModuleScript") then
			task.defer(pcall, function()
				local plugin = require(module)
				table.insert(plugins, plugin(pluginUtil))
			end)
		end
	end

	-- Load IY plugins
	if isfile and isfile("IY_FE.iy") then
		local iyConfig = HttpService:JSONDecode(readfile("IY_FE.iy")) -- All exploits with isfile also have readfile
		for _, plugin_path in pairs(iyConfig.PluginsTable) do
			task.defer(iyToBracket, readfile(plugin_path), notificationHolder, plugins)
		end
	end

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
			"rbxassetid://10131036449",
			"rbxassetid://10131153286"
		}

	-- Mount UI
	local tree
	tree = Roact.mount(
		Roact.createElement(
			util.Colors.Provider,
			{ value = colorsBinding },
			{ Roact.createElement(
				util.Plugins.Provider,
				{ value = plugins },
				{ Roact.createElement(
					util.Kill.Provider,
					{ value = function()
						Roact.unmount(tree)
							for i = 0,50 do
								local particle = Instance.new("ImageLabel", config.gui)
								particle.Size = UDim2.new()
								particle.Image = ids[math.random(#ids)]
								particle.BackgroundTransparency = 1
								particle.ScaleType = Enum.ScaleType.Fit
								particle.ZIndex = 100
								particle.AnchorPoint = Vector2.new(1,0.5)
								particle.Position = UDim2.new(0,0,0.5,0)
								TweenService:Create(particle, TweenInfo.new(.1, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, 0,false,.7), {
									ImageTransparency = 1
								}):Play()
								TweenService:Create(particle, TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out), {
									Position = UDim2.new(math.random(), 0, math.random(), 0),
									Size = UDim2.new(0,150,0,150)
								}):Play()
								Debris:AddItem(particle, 1.5)
								game:GetService('RunService').Heartbeat:Wait()
							end
							game:GetService('Debris'):AddItem(config.gui, 1.5)
					end },
					{
						Taskbar = Roact.createElement(Neo, {
							container = config.gui,
							notif = notificationHolder,
						}),
						Bracket = Roact.createElement(Bracket, {
							button = config.bracket_toggle or Enum.KeyCode.LeftBracket,
						}),
					}
				) }
			) }
		),
		config.gui
	)

	for i=1, 5 do
		local border = Instance.new("Frame", config.gui)
		Debris:AddItem(border, .5)
		border.Size = UDim2.fromScale(2, 2)
		border.AnchorPoint = Vector2.new(0.5, 0.5)
		border.Position = UDim2.fromScale(0.5, 0.5)
		border.BackgroundTransparency = 1
		Instance.new('UIAspectRatioConstraint', border)
		local stroke = Instance.new("UIStroke", border)
		stroke.Thickness = 5
		stroke.Color = colors.ACCENT
		TweenService:Create(
			border,
			TweenInfo.new(.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
			{ 
				Size = UDim2.new(),
				Position = UDim2.fromScale(math.random(), math.random()),
			}
		):Play()
		task.wait(math.random() * .1)
	end

	Notification.new(
		"Welcome to mollermethod " .. PKG_VERSION,
		util.random(CONSTANTS.QUOTES),
		"Success",
		5,
		notificationHolder
	)
	local queue_on_teleport = queue_on_teleport or (syn and syn.queue_on_teleport)
	if not passed_config.debug and queue_on_teleport then
		queue_on_teleport([[
			loadstring(game:HttpGetAsync 'https://mollermethod.pages.dev') {}
		]])
	end
end
