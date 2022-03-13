-- Runtime module

---@class Module
---@field fn function
---@field isLoaded boolean
---@field value any

---@type table<string, Instance>
local instanceFromId = {}

---@type table<Instance, string>
local idFromInstance = {}

---@type table<Instance, Module>
local modules = {}

---Stores currently loading modules.
---@type table<LocalScript | ModuleScript, ModuleScript>
local currentlyLoading = {}

-- Module resolution

---@param module LocalScript | ModuleScript
---@param caller? LocalScript | ModuleScript
---@return function | nil cleanup
local function validateRequire(module, caller)
	currentlyLoading[caller] = module

	local currentModule = module
	local depth = 0

	-- If the module is loaded, requiring it will not cause a circular dependency.
	if not modules[module] then
		while currentModule do
			depth = depth + 1
			currentModule = currentlyLoading[currentModule]

			if currentModule == module then
				local str = currentModule.Name -- Get the string traceback

				for _ = 1, depth do
					currentModule = currentlyLoading[currentModule]
					str = str .. "  ⇒ " .. currentModule.Name
				end

				error("Failed to load '" .. module.Name .. "'; Detected a circular dependency chain: " .. str, 2)
			end
		end
	end

	return function ()
		if currentlyLoading[caller] == module then -- Thread-safe cleanup!
			currentlyLoading[caller] = nil
		end
	end
end

---@param obj LocalScript | ModuleScript
---@param this? LocalScript | ModuleScript
---@return any
local function loadModule(obj, this)
	local cleanup = this and validateRequire(obj, this)
	local module = modules[obj]

	if module.isLoaded then
		if cleanup then
			cleanup()
		end
		return module.value
	else
		local data = module.fn()
		module.value = data
		module.isLoaded = true
		if cleanup then
			cleanup()
		end
		return data
	end
end

---@param target ModuleScript
---@param this? LocalScript | ModuleScript
---@return any
local function requireModuleInternal(target, this)
	if modules[target] and target:IsA("ModuleScript") then
		return loadModule(target, this)
	else
		return require(target)
	end
end

-- Instance creation

---@param id string
---@return table<string, any> environment
local function newEnv(id)
	return setmetatable({
		script = instanceFromId[id],
		require = function (module)
			return requireModuleInternal(module, instanceFromId[id])
		end,
	}, {
		__index = getfenv(0),
		__metatable = "This metatable is locked",
	})
end

---@param name string
---@param className string
---@param path string
---@param parent string | nil
---@param fn function
local function newModule(name, className, path, parent, fn)
	local instance = Instance.new(className)
	instance.Name = name
	instance.Parent = instanceFromId[parent]

	instanceFromId[path] = instance
	idFromInstance[instance] = path

	modules[instance] = {
		fn = fn,
		isLoaded = false,
		value = nil,
	}
end

---@param name string
---@param className string
---@param path string
---@param parent string | nil
local function newInstance(name, className, path, parent)
	local instance = Instance.new(className)
	instance.Name = name
	instance.Parent = instanceFromId[parent]

	instanceFromId[path] = instance
	idFromInstance[instance] = path
end

-- Runtime

local function init()
	if not game:IsLoaded() then
		game.Loaded:Wait()
	end
	for object in pairs(modules) do
		if object:IsA("LocalScript") and not object.Disabled then
			task.spawn(loadModule, object)
		end
	end
end
