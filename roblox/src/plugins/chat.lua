local util = ...
local Players = game:GetService("Players")
local events = {}
local container = util.GUI

events['Destroying'] = container.Destroying:Connect(function() -- disconnects events when gui deathed
	for _, event in pairs(events) do
		event:Disconnect()
	end
end)

return {
  Name = 'Chat Logger',
  Description = 'Adds a chat logger command to mollermethod',
  Author = 'trollar',
  Commands = {
    chatlogger = {
      description = 'makes a chat logger gui pop up. Lo!',
      execute = function (args)
		local frame = Instance.new('Frame', container)
		frame.Name = 'ChatLogger'
		frame.Size = UDim2.new(0.3,0,0.3,0)
		frame.Position = UDim2.new(0.5,0,0.5,0)
		frame.AnchorPoint = Vector2.new(0.5,0.5)
		frame.BackgroundColor3 = util.colors.BLACK
		local UICorner = Instance.new('UICorner', frame)
		UICorner.CornerRadius = UDim.new(0,18)
		local chat = Instance.new('ScrollingFrame', frame)
		chat.Name = 'Chat'
		chat.Size = UDim2.new(1, 0, 0.8, 0)
		chat.BackgroundColor3 = util.colors.GRAY[9]
		chat.BackgroundTransparency = 0
		chat.BorderSizePixel = 0
		chat.AutomaticCanvasSize = Enum.AutomaticSize.Y
		chat.CanvasSize = UDim2.new(0,0,0,0)
		local UIListLayout = Instance.new('UIListLayout', chat)
		UIListLayout.Padding = UDim.new()
		UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
		local ChatMessageTemplate = Instance.new('TextLabel')
		ChatMessageTemplate.Name = 'ChatMessageTemplate'
		ChatMessageTemplate.Size = UDim2.new(1, 0, 0.05, 0)
		ChatMessageTemplate.BackgroundColor3 = util.colors.WHITE
		ChatMessageTemplate.BackgroundTransparency = 0.9
		ChatMessageTemplate.Text = '[trollar] this is an example message wow!!!'
		ChatMessageTemplate.TextSize = 12
		ChatMessageTemplate.Font = Enum.Font.Gotham
		ChatMessageTemplate.TextWrapped = true
		ChatMessageTemplate.TextXAlignment = Enum.TextXAlignment.Left
		ChatMessageTemplate.TextColor3 = util.colors.WHITE

		local function chatted (player, message)
			local Label = ChatMessageTemplate:Clone()
			Label.Name = player.Name
			if player.Name ~= player.DisplayName then
				Label.Text = player.DisplayName .. ' (@' .. player.Name .. ') : ' .. message
			else
				Label.Text = '@' .. player.Name .. ' : ' .. message
			end
			Label.Parent = chat
		end

		for _, player in pairs(Players:GetPlayers()) do
			events[player.UserId] = player.Chatted:Connect(function(message)
				chatted(player, message)
			end)
		end
      end
    }
  }
}