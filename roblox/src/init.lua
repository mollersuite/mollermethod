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
---@field gui     			ScreenGui The UI to parent catay to.
---@field plugins			string[] | nil Source code of plugins to load.
---@field theme		 		Theme | nil Background, foreground and accent colors.
---@field volume			number | nil
---@field bracket_toggle	Enum.KeyCode | nil

---catay's loader
---@param passed_config Config
return function(passed_config)
	local config = passed_config

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

	util.play("rbxassetid://6366788549") -- Startup sound

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
						game:GetService('Debris'):AddItem(config.gui, 0)
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

	local quote = util.random(CONSTANTS.QUOTES)
	Notification.new(
		"Welcome to catay " .. PKG_VERSION,
		quote.type == "quote" and string.format("%s - %s, %d", quote.text, quote.author, quote.year) or (quote.text .."™️"),
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
