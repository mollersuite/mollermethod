return function(util)
	local Players = game:GetService("Players")
	local events = {}
	local container = util.GUI
	local logs = {}
	local frame
	events["Destroying"] = container.Destroying:Connect(function() -- disconnects events when gui deathed
		for _, event in pairs(events) do
			event:Disconnect()
		end
	end)

	return {
		Name = "Chat Logger",
		Description = "Adds a chat logger command to mollermethod",
		Author = "trollar",
		Commands = {
			chatlogger = {
				description = "toggles a chat logger gui. Lo! [chatlogger",
				execute = function()
					if frame then 
						for _, event in pairs(events) do
							event:Disconnect()
						end
						table.clear(events)
						frame:Destroy()
						frame = nil
					else
					frame = Instance.new("Frame", container)
					frame.Name = "ChatLogger"
					frame.Size = UDim2.new(0.3, 0, 0.3, 0)
					frame.Position = UDim2.new(0.5, 0, 0.5, 0)
					frame.AnchorPoint = Vector2.new(0.5, 0.5)
					frame.BackgroundColor3 = util.colors.BLACK
					events["Controller"] = util.Snapdragon.createDragController(frame, { SnapEnabled = true })
					events["Controller"]:Connect()
					local UICorner = Instance.new("UICorner", frame)
					UICorner.CornerRadius = UDim.new(0, 18)
					local chat = Instance.new("ScrollingFrame", frame)
					chat.Name = "Chat"
					chat.Size = UDim2.new(1, 0, 0.9, 0)
					chat.BackgroundColor3 = util.colors.GRAY[9]
					chat.BackgroundTransparency = 0
					chat.BorderSizePixel = 0
					chat.AutomaticCanvasSize = Enum.AutomaticSize.Y
					chat.CanvasSize = UDim2.new(0, 0, 0, 0)
					local UIListLayout = Instance.new("UIListLayout", chat)
					UIListLayout.Padding = UDim.new()
					UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
					local WriteLogsToFile = Instance.new("TextButton", frame)
					WriteLogsToFile.Name = "WriteLogsToFile"
					WriteLogsToFile.Size = UDim2.new(1, 0, 0.1, 0)
					WriteLogsToFile.Position = UDim2.new(0, 0, 1, 0)
					WriteLogsToFile.AnchorPoint = Vector2.new(0, 1)
					WriteLogsToFile.TextColor3 = util.colors.WHITE
					WriteLogsToFile.BackgroundTransparency = 1
					WriteLogsToFile.Font = Enum.Font.Gotham
					WriteLogsToFile.Text = "Write Logs To File"
					WriteLogsToFile.TextSize = 18
					WriteLogsToFile.MouseButton1Click:Connect(function()
						if writedialog then
							writedialog(
								"Save chat logs to file",
								"Text documents (*.txt)",
								table.concat(logs, "\n")
							)
						elseif writefile then
							writefile("chat-logs.txt", table.concat(logs, "\n"))
						else
							util.notify(
								'Chat Logger',
								"Your exploit does not support writing files",
								'Error',
								5
								
							)
						end
					end)
					local ChatMessageTemplate = Instance.new("TextLabel")
					ChatMessageTemplate.Name = "ChatMessageTemplate"
					ChatMessageTemplate.Size = UDim2.new(1, 0, 0.05, 0)
					ChatMessageTemplate.BackgroundColor3 = util.colors.WHITE
					ChatMessageTemplate.BackgroundTransparency = 0.9
					ChatMessageTemplate.Text = "[trollar] this is an example message wow!!!"
					ChatMessageTemplate.TextSize = 12
					ChatMessageTemplate.Font = Enum.Font.Gotham
					ChatMessageTemplate.TextWrapped = true
					ChatMessageTemplate.TextXAlignment = Enum.TextXAlignment.Left
					ChatMessageTemplate.TextColor3 = util.colors.WHITE
					local function chatted(player, message)
						local formatted
						if player.Name ~= player.DisplayName then
							formatted = player.DisplayName .. " (@" .. player.Name .. "): " .. message
						else
							formatted = "@" .. player.Name .. ": " .. message
						end
						logs[#logs + 1] = formatted
						local Label = ChatMessageTemplate:Clone()
						Label.Name = player.Name
						Label.Text = formatted
						Label.Parent = chat
					end

					for _, player in pairs(Players:GetPlayers()) do
						events[player.UserId] = player.Chatted:Connect(function(message)
							chatted(player, message)
						end)
					end
					end
				end,
			},
		},
	}
end
