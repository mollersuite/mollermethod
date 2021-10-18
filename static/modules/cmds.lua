--[[
	Commands
	This was written by Auxnos.
	Do NOT expect this to be good.
]]
local API = {}
API.Cmds = {}
function API.Command(Name, Function)
	if not API.Cmds[Name] then
		API.Cmds[Name] = Function
	end
end
function API.Run(Name, Arguments)
	API.Cmds[Name](Arguments)
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
	for msg in pairs(API.Cmds) do
		StarterGui:SetCore('ChatMakeSystemMessage', {
			Text = msg,
			Font = Enum.Font.SourceSansBold,
			Color = Color3.fromRGB(155, 155, 155),
			FontSize = Enum.FontSize.Size18
		})
	end
end)
Players.LocalPlayer.Chatted:Connect(function(cmd)
	if cmd:match('^-/') then
		local msg = cmd:sub(prefix:len() + 1)
		API.Run(msg, {})
	end
end)
