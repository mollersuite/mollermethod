-- model 2 script output
local soundS = game:GetService("SoundService")
local main = Instance.new("Frame")
local UICorner = Instance.new("UICorner")
local d = Instance.new("Frame")
local c = Instance.new("ImageLabel")
local b = Instance.new("ImageLabel")
local a = Instance.new("ImageLabel")
local logo = Instance.new("ImageLabel")
local div = Instance.new("Frame")
local title = Instance.new("TextLabel")
local cus = Instance.new("TextLabel")
local var = Instance.new("TextLabel")
local checker = Instance.new("ScreenGui")
local exit = Instance.new("TextButton")
main.Name = "main"
main.Parent = checker
main.AnchorPoint = Vector2.new(0.5, 0)
main.BackgroundColor3 = Color3.new(0.164706, 0.164706, 0.164706)
main.BackgroundTransparency = 0.10000000149011612
main.Position = UDim2.new(0.5, 0, 0, -100)
main.Size = UDim2.new(0, 0, 0, 0)
main.ZIndex = 2
UICorner.Parent = main
UICorner.CornerRadius = UDim.new(0, 3)
exit.Name = "exit"
exit.Parent = main
exit.BackgroundColor3 = Color3.new(1, 1, 1)
exit.BackgroundTransparency = 1
exit.Position = UDim2.new(0, 305, 0, 5)
exit.Size = UDim2.new(0, 10, 0, 10)
exit.ZIndex = 2
exit.Font = Enum.Font.Ubuntu
exit.Text = "X"
exit.TextColor3 = Color3.new(1, 1, 1)
exit.TextSize = 12
exit.TextWrapped = true
d.Name = "d"
d.Parent = checker
d.BackgroundTransparency = 1
d.Size = UDim2.new(0, 0, 0, 0)
d.Position = UDim2.new(0.5, 0, 0, -100)
d.AnchorPoint = Vector2.new(0.5, 0)
c.Name = "c"
c.Parent = d
c.AnchorPoint = Vector2.new(0.5, 0.5)
c.BackgroundTransparency = 1
c.Position = UDim2.new(0.5, 0, 0.5, 4)
c.Size = UDim2.new(1, 10, 1, 10)
c.Image = "rbxassetid://1316045217"
c.ImageColor3 = Color3.new(0, 0, 0)
c.ImageTransparency = 0.8600000143051147
c.ScaleType = Enum.ScaleType.Slice
c.SliceCenter = Rect.new(Vector2.new(10, 10), Vector2.new(118, 118))
b.Name = "b"
b.Parent = d
b.AnchorPoint = Vector2.new(0.5, 0.5)
b.BackgroundTransparency = 1
b.Position = UDim2.new(0.5, 0, 0.5, 4)
b.Size = UDim2.new(1, 10, 1, 10)
b.Image = "rbxassetid://1316045217"
b.ImageColor3 = Color3.new(0, 0, 0)
b.ImageTransparency = 0.8799999952316284
b.ScaleType = Enum.ScaleType.Slice
b.SliceCenter = Rect.new(Vector2.new(10, 10), Vector2.new(118, 118))
a.Name = "a"
a.Parent = d
a.AnchorPoint = Vector2.new(0.5, 0.5)
a.BackgroundTransparency = 1
a.Position = UDim2.new(0.5, 0, 0.5, 4)
a.Size = UDim2.new(1, 10, 1, 10)
a.Image = "rbxassetid://1316045217"
a.ImageColor3 = Color3.new(0, 0, 0)
a.ImageTransparency = 0.8799999952316284
a.ScaleType = Enum.ScaleType.Slice
a.SliceCenter = Rect.new(Vector2.new(10, 10), Vector2.new(118, 118))
logo.Name = "logo"
logo.Parent = main
logo.BackgroundColor3 = Color3.new(1, 1, 1)
logo.BackgroundTransparency = 1
logo.Position = UDim2.new(0, 10, 0, 10)
logo.Size = UDim2.new(0, 20, 0, 20)
logo.ZIndex = 2
logo.Image = "rbxassetid://11183425047"
logo.ScaleType = Enum.ScaleType.Fit
div.Name = "div"
div.Parent = main
div.BackgroundColor3 = Color3.new(1, 1, 1)
div.Position = UDim2.new(0, 35, 0, 13)
div.Size = UDim2.new(0, 1, 0, 13)
div.ZIndex = 2
title.Name = "title"
title.Parent = main
title.BackgroundColor3 = Color3.new(1, 1, 1)
title.BackgroundTransparency = 1
title.Position = UDim2.new(0, 45, 0, 9)
title.Size = UDim2.new(0, 200, 0, 20)
title.ZIndex = 2
title.Font = Enum.Font.Ubuntu
title.TextColor3 = Color3.new(1, 1, 1)
title.TextSize = 15
title.TextXAlignment = Enum.TextXAlignment.Left
cus.Name = "cus"
cus.Parent = main
cus.BackgroundColor3 = Color3.new(1, 1, 1)
cus.BackgroundTransparency = 1
cus.Position = UDim2.new(0, 12, 0, 55)
cus.Size = UDim2.new(0, 200, 0, 20)
cus.ZIndex = 2
cus.Font = Enum.Font.Ubuntu
cus.RichText = true
cus.TextColor3 = Color3.new(1, 1, 1)
cus.TextSize = 11
cus.TextXAlignment = Enum.TextXAlignment.Left
var.Name = "var"
var.Parent = main
var.BackgroundColor3 = Color3.new(1, 1, 1)
var.BackgroundTransparency = 1
var.Position = UDim2.new(0, 12, 0, 35)
var.Size = UDim2.new(0, 200, 0, 20)
var.ZIndex = 2
var.Font = Enum.Font.Ubuntu
var.RichText = true
var.TextColor3 = Color3.new(1, 1, 1)
var.TextSize = 11
var.TextXAlignment = Enum.TextXAlignment.Left
main.ClipsDescendants = true
checker.Name = "\0"
-- model 2 script output end

local varS = loadstring("return ...")(true) == true -- varargs supported?
local cusS = not not (getcustomasset or getsynasset) -- custom assets supported?
local supported = varS and cusS -- return false if either one or both are false (varargs, custom assets)

-- setting text & playing sound

var.Text = varS and "<font color=\"rgb(0,200,0)\">✓</font>  Varargs supported." or "<font color=\"rgb(200,0,0)\">X</font>  Varargs not supported."
cus.Text = cusS and "<font color=\"rgb(0,200,0)\">✓</font>  Custom assets supported." or "<font color=\"rgb(200,0,0)\">X</font>  Custom assets not supported."
title.Text = supported and "mollermethod is supported." or "mollermethod is not supported."

local tween = game:GetService("TweenService")
local info = TweenInfo.new(.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
local original = {}
local sound = Instance.new("Sound")
sound.Volume = 0.5
sound.SoundId = "rbxassetid://8458409341"

if not supported then
	sound.SoundId = "rbxassetid://8458408918" -- not supported? change the sound to an error message
end

soundS:PlayLocalSound(sound)

exit.MouseButton1Click:Connect(function() -- do the same but backwards for the exit button
	d:TweenSizeAndPosition(UDim2.new(0, 0, 0, 0), UDim2.new(0.5, 0, 0, -100), Enum.EasingDirection.Out, Enum.EasingStyle.Quad, .5)
	main:TweenSizeAndPosition(UDim2.new(0, 0, 0, 0), UDim2.new(0.5, 0, 0, -100), Enum.EasingDirection.Out, Enum.EasingStyle.Quad, .5)
	for k, v in next, d:GetChildren() do 
		tween:Create(v, info, {
			ImageTransparency = 1
		}):Play()
	end
	for k, v in next, main:GetChildren() do 
		if v:IsA("TextLabel") or v:IsA("TextButton") then
			tween:Create(v, info, {
				TextTransparency = 1
			}):Play()
		elseif v:IsA("ImageLabel") then
			tween:Create(v, info, {
				ImageTransparency = 1
			}):Play()
		elseif v:IsA("Frame") then
			tween:Create(v, info, {
				BackgroundTransparency = 1
			}):Play()
		end
	end
	tween:Create(main, info, {
		BackgroundTransparency = 1
	}):Play()
	task.delay(.7, game.Destroy, checker)
end)

-- setting transparencies and parent

for k, v in next, main:GetChildren() do 
	if v:IsA("TextLabel") or v:IsA("TextButton") then
		original[v] = v.TextTransparency
		v.TextTransparency = 1
	elseif v:IsA("ImageLabel") then
		original[v] = v.ImageTransparency
		v.ImageTransparency = 1
	elseif v:IsA("Frame") then
		original[v] = v.BackgroundTransparency
		v.BackgroundTransparency = 1
	end
end

for k, v in next, d:GetChildren() do 
	original[v] = v.ImageTransparency
	v.ImageTransparency = 1
end

original[main] = main.BackgroundTransparency 
main.BackgroundTransparency = 1
checker.IgnoreGuiInset = true

if syn and syn.protect_gui then
	pcall(syn.protect_gui, checker)
end

checker.Parent = gethui and gethui() or game:GetService("CoreGui")

-- tweening

main:TweenSizeAndPosition(UDim2.new(0, 320, 0, 85), UDim2.new(0.5, 0, 0, 20), Enum.EasingDirection.Out, Enum.EasingStyle.Quad, .5)
d:TweenSizeAndPosition(UDim2.new(0, 320, 0, 85), UDim2.new(0.5, 0, 0, 20), Enum.EasingDirection.Out, Enum.EasingStyle.Quad, .5)

tween:Create(main, info, {
	BackgroundTransparency = .1
}):Play()

for k, v in next, d:GetChildren() do 
	tween:Create(v, info, {
		ImageTransparency = original[v]
	}):Play()
end

for k, v in next, main:GetChildren() do 
	if v:IsA("TextLabel") or v:IsA("TextButton") then
		tween:Create(v, info, {
			TextTransparency = original[v]
		}):Play()
	elseif v:IsA("ImageLabel") then
		tween:Create(v, info, {
			ImageTransparency = original[v]
		}):Play()
	elseif v:IsA("Frame") then
		tween:Create(v, info, {
			BackgroundTransparency = original[v]
		}):Play()
	end
end
