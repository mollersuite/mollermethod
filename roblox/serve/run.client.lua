local GUI = Instance.new("ScreenGui", game:GetService('Players').LocalPlayer:FindFirstChildOfClass('PlayerGui'))
GUI.Name = game:GetService("HttpService"):GenerateGUID()
GUI.IgnoreGuiInset = true
GUI.ResetOnSpawn = false
GUI.DisplayOrder = 7

require(game:GetService('ReplicatedStorage').catay) {
	debug = true,
	gui = GUI
}
