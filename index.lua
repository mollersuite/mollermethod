local function asset (url)
	local name = url:match( "([^/]+)$" )
	local data = game:HttpGet(url)
	writefile('mollermethod_' .. name, data)
	return (getcustomasset or getsynasset)('mollermethod_' .. name)
end
local function play (id)
	local sound = Instance.new('Sound')
	sound.SoundId = id
	sound.Volume = 10
	game:GetService('SoundService'):PlayLocalSound(sound)
end
play(asset('https://method.9701.ml/startup.mp3'))
game:GetService('UserInputService').InputBegan:Connect(function (i)
	print(i.KeyCode)
	if i.KeyCode == Enum.KeyCode.Delete and i:IsModifierKeyDown(Enum.ModifierKey.Meta) then
		print('pressed')
	end
end)
print('Press Win+Delete to toggle mollermethod')
