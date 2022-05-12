return function (util)
	local Autofarm
	if game.PlaceId == 537413528 then
		local Stages=workspace.BoatStages.NormalStages
		local client=game:GetService("Players").LocalPlayer
		local Penguin=workspace.ChangeCharacter
		local function Float()
			while Autofarm.value do
				game:GetService("RunService").RenderStepped:wait()
				if client.Character:FindFirstChild("Humanoid")~=nil then
					client.Character.Humanoid:ChangeState(10)
				end
			end
		end
		local function Farm()
			while Autofarm.value do
				for i=1,10 do
					task.wait(2)
					client.Character.HumanoidRootPart.CFrame=Stages["CaveStage"..i].DarknessPart.CFrame
					task.wait(0.1)
					workspace.ClaimRiverResultsGold:FireServer() end
				task.wait(1)
				Penguin:FireServer("PenguinCharacter")
				repeat task.wait() until client.Character:FindFirstChild("HumanoidRootPart")
			end
		end

		Autofarm = {
			description = "Tux Autofarm, by Avalon",
			on = function()
				busy = true
				task.spawn(Farm)
				task.spawn(Float)
			end,
			off = function()
				busy = false
			end
		}
	end
	return {
		Name = "Build A Boat For Treasure",
		Author = "Avalon",
		Toggles = {
			autofarm = Autofarm,
		}
	}
end
