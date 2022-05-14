local Debris = game:GetService("Debris")
local HttpService = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")

local PKG_VERSION = require(script.version)
local Roact = require(script.include.node_modules.roact.src)
local Notification = require(script.Notification) -- From Lunar, we should do this ourselves
local Expletive = require(script.Expletive)
local Bracket = require(script.Bracket).default
local BracketExternal = require(script.services.bracket_external)

local CONSTANTS = require(script.constants)
local colors = require(script.colors).default
local util = require(script.util)
local iyToBracket = require(script.Bracket.iy)
local content = getcustomasset or getsynasset

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
---@field bracket_external	boolean | nil

---mollermethod's loader
---@param config Config
return function(config)
	if isfile and not isfile("mollermethod.json") then
		writefile(
			"mollermethod.json",
			HttpService:JSONEncode({
				snippets = {},
				config = config,
			})
		)
	end
	if config.theme then
		colors.ACCENT = Color3.fromHex(config.theme.accent)
		colors.WHITE = Color3.fromHex(config.theme.foreground)
		colors.BLACK = Color3.fromHex(config.theme.background)
	end
	util.set_volume(config.volume or 5)

	local notificationHolder = Instance.new("Frame", config.gui)
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

	-- Startup sound
	if content then
		task.defer(function() -- All exploits with getcustomasset or getsynasset also have isfile
			if isfile("mollermethod_Blog-Sound-1.ogg") then
				util.play(content("mollermethod_Blog-Sound-1.ogg"))
			else
				util.play(
					util.asset("https://ubuntu.com/wp-content/uploads/2012/02/Blog-Sound-1.ogg")
				)
			end
		end)
	else
		util.play("rbxassetid://9344041257")
	end

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
			iyToBracket(readfile(plugin_path), notificationHolder, plugins)
		end
	end

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
						config.gui:Destroy()
					end },
					{
						Taskbar = Roact.createElement(Expletive, {
							container = config.gui,
							notif = notificationHolder,
						}),
						Bracket = config.bracket_external and Roact.createElement(
							BracketExternal
						) or Roact.createElement(Bracket, {
							button = config.bracket_toggle or Enum.KeyCode.LeftBracket,
						}),
					}
				) }
			) }
		),
		config.gui
	)

	local border = Instance.new("Frame", config.gui)
	Debris:AddItem(border, 1)
	border.Size = UDim2.fromScale(1, 1)
	border.AnchorPoint = Vector2.new(0.5, 0.5)
	border.Position = UDim2.fromScale(0.5, 0.5)
	border.BackgroundTransparency = 1
	local stroke = Instance.new("UIStroke", border)
	stroke.Thickness = 15
	stroke.Color = colors.ACCENT
	TweenService:Create(
		border,
		TweenInfo.new(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, true),
		{ Size = UDim2.new(1, -10, 1, -10) }
	):Play()

	Notification.new(
		"Welcome to mollermethod " .. PKG_VERSION,
		util.random(CONSTANTS.QUOTES),
		"Success",
		5,
		notificationHolder
	)
end
