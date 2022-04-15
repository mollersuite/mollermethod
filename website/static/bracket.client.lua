-- Bracket - from mollersuite by Etcetera
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

local Bracket = rbxmSuite.require(project.Bracket.external)
local util = rbxmSuite.require(project.util)
local Roact = rbxmSuite.require(project.include.node_modules.roact.src) -- Maybe use Roact from CorePackages?

Roact.mount(
	Roact.createElement(util.Plugins.Provider, {
		value = {} -- TODO: load built-in plugins
	}, {
		Roact.createElement(Bracket)
	})
)
