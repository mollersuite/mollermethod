local types = { Button = function(parent, name, change, i)
	local btn = Instance.new('TextButton', parent)
	btn.Text = name
	btn.LayoutOrder = i
	btn.Size = UDim2.new(0, 100, 0, 10)
	btn.Font = Enum.Font.GothamBold
	Instance.new('UICorner', frame).CornerRadius = UDim.new(0, 5)
	btn.TextSize = 15
	btn.BackgroundColor3 = Color3.new(0, 0, 0)
	btn.TextColor3 = Color3.new(1, 1, 1)
	btn.AutomaticSize = Enum.AutomaticSize.X
	btn.MouseButton1Click:Connect(change)
end }
return function(options)
	local lib_return = options.Script
	local gui = options.Parent
	local btn = options.btn
	local API = options.API
	local root = options.ROOT or 'https://mthd.ml'
	local frame = Instance.new('Frame', gui)
	frame.BackgroundColor3 = Color3.fromRGB(34, 68, 45)
	frame.AnchorPoint = Vector2.new(0.5, 0.5)
	frame.Size = UDim2.fromScale(0.5, 0.5)
	frame.Position = UDim2.fromScale(0.5, 0.5)
	frame.Visible = false
	Instance.new('UICorner', frame).CornerRadius = UDim.new(0, 10)
	Instance.new('UIListLayout', frame).SortOrder = Enum.SortOrder.LayoutOrder
	btn('Game', API.asset(root .. '/icons/game.png'), function()
		frame.Visible = not frame.Visible
	end)
	for i, thing_in_lib in pairs(lib_return) do
		if typeof(thing_in_lib) == 'string' then -- it is a header
			local header = Instance.new('TextLabel', frame)
			header.LayoutOrder = i
			header.Text = thing_in_lib
			header.Size = UDim2.new(1, 0, 0, 20)
			header.TextColor3 = Color3.new(1, 1, 1)
			header.Font = Enum.Font.GothamBlack
			header.BackgroundTransparency = 1
			header.TextXAlignment = Enum.TextXAlignment.Left
			header.TextSize = 20
		elseif typeof(thing_in_lib) == 'table' then
			local row = Instance.new('Frame', frame)
			row.Size = UDim2.new(1, 0, 0, 20)
			row.LayoutOrder = i
			row.BackgroundTransparency = 1
			row.AutomaticSize = Enum.AutomaticSize.Y
			local list = Instance.new('UIListLayout', row)
			list.SortOrder = Enum.SortOrder.LayoutOrder
			list.FillDirection = Enum.FillDirection.Horizontal
			for i, variable in next, thing_in_lib do
				types[variable.Type](row, variable.Name, variable.Change, i)
			end
		end
	end
end
