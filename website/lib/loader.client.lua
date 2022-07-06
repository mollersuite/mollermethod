local rbxmSuite = (function()
	local a = {}
	local b = "rbxm-suite"
	local c = "_rbxm-suite-v2"
	local d = "__rbxm_suite_context"
	local e = getsynasset or getcustomasset or error("File -> Content API not found")
	local f = syn and syn.request or request or error("HTTP request API not found")
	local g = getgenv()[d]
	if not getgenv()[d] then
		g = {
			options = nil,
			currentId = 0,
			idToInstance = {},
			instanceToId = {},
			moduleToData = {},
			modules = {},
		}
		getgenv()[d] = g
	end
	local function h(...)
		if g.options.verbose then
			print(...)
		end
	end
	local i = {}
	do
		local j = game:GetService("HttpService")
		function i.init()
			makefolder(c)
			makefolder(c .. "\\models")
			writefile(c .. "\\latest.json", "{}")
		end
		function i.repair()
			delfolder(c)
			i.init()
		end
		function i.updateVersions(k)
			local l = readfile(c .. "\\latest.json")
			local m = j:JSONDecode(l)
			k(m)
			writefile(c .. "\\latest.json", j:JSONEncode(m))
		end
		function i.currentVersion(n)
			local l = readfile(c .. "\\latest.json")
			return j:JSONDecode(l)[n]
		end
		function i.id(o, p, q, r)
			return o .. "-" .. p .. "-" .. q .. "-" .. r
		end
		function i.path(n)
			return c .. "\\models\\" .. n
		end
		function i.url(o, p, q, r)
			return "https://github.com/" .. o .. "/" .. p .. "/releases/download/" .. q .. "/" .. r
		end
		function i.latestTag(o, p)
			local s = "https://api.github.com/repos/" .. o .. "/" .. p .. "/releases/latest"
			local t = f({
				Url = s,
				Method = "GET",
			})
			assert(t.Success, "Version check failed: " .. t.StatusCode .. " " .. t.StatusMessage)
			local m = j:JSONDecode(t.Body)
			return m.tag_name
		end
		function i.downloadLatest(o, p, r)
			local u = i.latestTag(o, p)
			local n = i.id(o, p, "latest", r)
			local v = i.path(n)
			if isfile(v) and i.currentVersion(n) == u then
				return v
			end
			local t = f({
				Url = i.url(o, p, u, r),
				Method = "GET",
			})
			assert(t.Success, "Download failed: " .. t.StatusCode .. " " .. t.StatusMessage)
			writefile(v, t.Body)
			i.updateVersions(function(m)
				m[n] = u
			end)
			return v
		end
		function i.download(o, p, q, r)
			local n = i.id(o, p, q, r)
			local v = i.path(n)
			if isfile(v) then
				if q == "latest" then
					task.defer(i.downloadLatest, o, p, r)
				end
				return v
			elseif q == "latest" then
				return i.downloadLatest(o, p, r)
			else
				local t = f({
					Url = i.url(o, p, q, r),
					Method = "GET",
				})
				assert(t.Success, "Download failed: " .. t.StatusCode .. " " .. t.StatusMessage)
				writefile(v, t.Body)
				return v
			end
		end
	end
	local w = {}
	local function x(y, z)
		w[z] = y
		local A = y
		local B = 0
		if not g.moduleToData[y] then
			while A do
				B = B + 1
				A = w[A]
				if A == y then
					local C = A.Name
					for D = 1, B do
						A = w[A]
						C = C .. "  ⇒ " .. A.Name
					end
					error("Failed to load '" .. y.Name .. "'; Detected a circular dependency chain: " .. C, 2)
				end
			end
		end
		return function()
			if w[z] == y then
				w[z] = nil
			end
		end
	end
	local function E(y, F)
		local G = F and x(y, F)
		if g.moduleToData[y] then
			if G then
				G()
			end
			return g.moduleToData[y].data
		else
			local m = g.modules[g.instanceToId[y]]()
			g.moduleToData[y] = { data = m }
			if G then
				G()
			end
			return m
		end
	end
	local function H(y, F)
		if g.instanceToId[y] and y:IsA("ModuleScript") then
			return E(y, F)
		else
			return require(y)
		end
	end
	local function I(n, J)
		return setmetatable(
			{
				script = g.idToInstance[n],
				require = function(y)
					if J then
						return H(y, g.idToInstance[n])
					else
						return H(y)
					end
				end,
			},
			{
				__index = getfenv(0),
				__metatable = "This metatable is locked",
			}
		)
	end
	local function K(L, v, M)
		g.currentId = g.currentId + 1
		g.idToInstance[g.currentId] = L
		g.instanceToId[L] = g.currentId
		local n = g.currentId
		local J = tostring(g.options.nocirculardeps)
		local N = string.format("%q", v)
		if g.options.debug then
			local O =
				table.concat(
					{
						"context.modules[" .. n .. "] = function()",
						"local fn = assert(loadstring(context.idToInstance[" .. n .. "].Source, '@'.." .. N .. "))",
						"setfenv(fn, createModuleEnvironment(" .. n .. ", " .. J .. "))",
						"return fn()",
						"end\n\n",
					},
					"\n"
				)
			table.insert(M, O)
		else
			local O =
				table.concat(
					{
						"context.modules[" .. n .. "] = function()",
						L.Source,
						"end",
						"setfenv(context.modules[" .. n .. "], createModuleEnvironment(" .. n .. ", " .. J .. "))\n\n",
					},
					"\n"
				)
			table.insert(M, O)
		end
	end
	local function P(Q, M)
		local R = g.currentId + 1
		if Q:IsA("LocalScript") or Q:IsA("ModuleScript") then
			K(Q, b .. "." .. Q:GetFullName(), M)
		end
		for D, L in ipairs(Q:GetDescendants()) do
			if L:IsA("LocalScript") or L:IsA("ModuleScript") then
				K(L, b .. "." .. L:GetFullName(), M)
			end
		end
		return R
	end
	local function S(M)
		local T = setmetatable(
			{
				context = g,
				createModuleEnvironment = I,
			},
			{ __index = getfenv(0) }
		)
		local U = assert(loadstring(table.concat(M, ""), "@" .. b))
		setfenv(U, T)()
	end
	function a.download(V, r)
		local o, p, q = string.match(V, "([^/]+)/([^@]+)@?(.*)")
		assert(o and p, "Invalid repository: " .. V)
		return i.download(o, p, q or "latest", r)
	end
	function a.repair()
		i.repair()
	end
	function a.require(W)
		assert(typeof(W) == "Instance", "Script expected")
		assert(W:IsA("LuaSourceContainer"), "Script expected")
		assert(g.instanceToId[W], "Script " .. W:GetFullName() .. " is not registered by this session")
		return E(W)
	end
	function a.launch(X, Y)
		Y = Y or {}
		g.options = Y
		do
			if Y.debug == nil then
				Y.debug = false
			end
			if Y.runscripts == nil then
				Y.runscripts = true
			end
			if Y.verbose == nil then
				Y.verbose = false
			end
			if Y.nocirculardeps == nil then
				Y.nocirculardeps = true
			end
		end
		h("Launching file '" .. X .. "'")
		for Z, _ in pairs(Y) do
			local a0 = string.rep(" ", 11 - #Z)
			h('  "' .. Z .. '"', a0, "=", _)
		end
		local a1 = os.clock()
		local a2 = game:GetObjects(e(X))
		assert(type(a2) == "table", a2 or "Failed to load model at " .. X)
		assert(typeof(a2[1]) == "Instance", "Model must contain at least one instance")
		local a3 = {}
		local R = P(a2[1], a3)
		S(a3)
		h("Compiled", g.currentId - R + 1, "modules")
		if Y.runscripts then
			h("Scanning objects for LocalScripts")
			for a4 = R, g.currentId do
				local L = g.idToInstance[a4]
				if L:IsA("LocalScript") and not L.Disabled then
					task.defer(E, L)
					h(a4 - R + 1, "/", g.currentId - R + 1, ":", L:GetFullName())
				end
			end
		end
		h("Done in", (os.clock() - a1) * 1000, "milliseconds")
		g.options = nil
		return table.unpack(a2)
	end
	if isfolder(c) then
		i.init()
	end
	return a
end)()

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
if sethiddenproperty then
	sethiddenproperty(GUI, "OnTopOfCoreBlur", true)
end
if syn and syn.protect_gui then
	syn.protect_gui(GUI)
end
GUI.Name = game:GetService("HttpService"):GenerateGUID()
GUI.IgnoreGuiInset = true
GUI.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
GUI.ResetOnSpawn = false
GUI.DisplayOrder = 2 ^ 31 - 1
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
function bez(a, b, c, t)
	return a.lerp(a:lerp(b, t), b:lerp(c, t), t)
end
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
		particle.AnchorPoint = Vector2.new(1,0.5)
		particle.Position = UDim2.new(math.random(), 0, math.random(), 0)
		Tween:Create(particle, TweenInfo.new(.1), { ImageTransparency = 0 }):Play()
		Tween:Create(
			particle,
			TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.In),
			{
				Size = UDim2.new(),
				Position = UDim2.fromScale(0,0.5)--UDim2.new(0,0,1,0)
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
			writefile(
				"mollermethod.rbxm",
				game:HttpGetAsync("https://mollermethod.pages.dev/mollermethod.rbxm")
			)
		end
		if CONFIG.debug then
			warn("parsing rbxm")
		end
		local project = rbxmSuite.launch("mollermethod.rbxm", {
			debug = CONFIG.debug,
			verbose = CONFIG.debug,
			runscripts = false,
		})
		if CONFIG.debug then
			warn("requiring rbxm")
		end
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
