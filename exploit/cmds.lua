-- trollsmile, by Auxnos
local API = loadstring(game:HttpGetAsync('https://mthd.ml/api'), 'mollermethod API')()
local GUI = Instance.new('ScreenGui')
GUI.Name = game:GetService('HttpService'):GenerateGUID()
GUI.IgnoreGuiInset = true
GUI.ResetOnSpawn = false
GUI.DisplayOrder = (2 ^ 31) - 1
API.parent(GUI)


local Services = setmetatable({}, {
    __index = function(self, t)
        assert(t)
        local _, service = pcall(function()
            return game:GetService(t)
        end)
        if typeof(service) == "string" then
            warn(service)
            return workspace
        end
        return service
    end,
})

local Players = Services.Players

local Prefix = "["
local OpenKey = Enum.KeyCode.LeftBracket
local Commands = {Functions = {}}
Commands.Index = {}
function Commands:Add(Aliases, Function)
    assert(Aliases, "Missing argument #1 or missing")
    assert(Function, "Missing argument #2 or missing")
    Commands.Index[#Commands.Index+1] = typeof(Aliases) == "table" and Aliases or table.pack(Aliases)
    for _,Alias in pairs(typeof(Aliases) == "table" and Aliases or table.pack(Aliases)) do
        Commands.Functions[Alias] = Function
    end
end

function Commands:Run(Message)
    if Message:sub(1,#Prefix) == Prefix then
        local New = Message:sub(#Prefix + 1)
        local Split = string.split(New, " ")
        local Function = Commands.Functions[Split[1]]
        if Function then
            table.remove(Split, 1)
            Function(unpack(Split))
        end
    end
end

Commands:Add({"mute"}, function()
    local Mute = true
    for i,v in pairs(workspace:GetDescendants()) do
        if v:IsA("Sound") then
            v.Playing = false
            v:GetPropertyChangedSignal("Playing"):Connect(function()
                if Mute then
                    if v.Playing ~= false then
                        v.Playing = false
                    end
                end
            end)
        end
    end
end)

Commands:Add({"rj", "rejoin"}, function()
    game:GetService('TeleportService'):TeleportToPlaceInstance(game.PlaceId, game.JobId, Players.LocalPlayer)
end)

Commands:Add({"nolimbs", "clearlimbs", "removelimbs", "climbs", "rlimbs"}, function()
    for i,v in pairs(Players.LocalPlayer.Character:GetChildren()) do
        if v:IsA("BasePart") and
            v.Name == "Right Leg" or
            v.Name == "Left Leg" or
            v.Name == "Right Arm" or
            v.Name == "Left Arm" or
            v.Name == "RightUpperLeg" or
            v.Name == "LeftUpperLeg" or
            v.Name == "RightUpperArm" or
            v.Name == "LeftUpperArm" then
            v:Destroy()
        end
    end
end)

local a_stroke = Instance.new("UIStroke")
a_stroke.Name = "stroke"
a_stroke.Thickness = 5
a_stroke.Color = Color3.fromRGB(32, 35, 35)

function newstroke(parent,color)
    local stroke = a_stroke:Clone()
    stroke.Parent, stroke.Color = parent, color
    return stroke
end

local cmds = GUI
local main = Instance.new("Frame")
local corner = Instance.new("UICorner")
local holder = Instance.new("ScrollingFrame")
local base = Instance.new("Frame")
local size = Instance.new("UISizeConstraint")
local header = Instance.new("TextLabel")
local gradient = Instance.new("UIGradient")
local corner_2 = Instance.new("UICorner")
local desc = Instance.new("TextLabel")
local UIListLayout = Instance.new("UIListLayout")
local LayoutOrder = Instance.new("UIListLayout")
local moller = Instance.new("ImageLabel")
local gradient_2 = Instance.new("UIGradient")
cmds.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
main.Name = "main"
main.Parent = cmds
main.AnchorPoint = Vector2.new(0.5, 0.5)
main.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
main.Position = UDim2.new(0.5, 0, 0.5, 0)
main.Size = UDim2.new(0.100000001, 0, 0.349999994, 0)
newstroke(main, Color3.fromRGB(42, 46, 46))
corner.CornerRadius = UDim.new(0.150000006, 0)
corner.Name = "corner"
corner.Parent = main
holder.Name = "holder"
holder.Parent = main
holder.AnchorPoint = Vector2.new(0.5, 0.5)
holder.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
holder.BackgroundTransparency = 1.000
holder.BorderSizePixel = 0
holder.Position = UDim2.new(0.499999881, 0, 0.525453389, 0)
holder.Size = UDim2.new(0.800000012, 0, 0.749093235, 0)
holder.CanvasSize = UDim2.new(0, 0, 0, 0)
holder.HorizontalScrollBarInset = Enum.ScrollBarInset.ScrollBar
holder.ScrollBarThickness = 5
do
    base.Name = "base"
    base.Parent = holder
    base.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    base.BackgroundTransparency = 0.100
    base.BorderSizePixel = 0
    base.Size = UDim2.new(0.899999976, 0, 0.449999988, 0)
    base.SizeConstraint = Enum.SizeConstraint.RelativeXX
    size.Name = "size"
    size.Parent = base
    header.Name = "header"
    header.Parent = base
    header.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    header.BackgroundTransparency = 1.000
    header.BorderSizePixel = 0
    header.Size = UDim2.new(1, 0, 0.5, 0)
    header.Font = Enum.Font.GothamBlack
    header.Text = "omg"
    header.TextColor3 = Color3.fromRGB(255, 255, 255)
    header.TextSize = 25.000
    header.TextWrapped = true
    gradient.Color = ColorSequence.new{ColorSequenceKeypoint.new(0.00, Color3.fromRGB(20, 20, 20)), ColorSequenceKeypoint.new(1.00, Color3.fromRGB(79, 79, 79))}
    gradient.Rotation = 180
    gradient.Name = "gradient"
    gradient.Parent = base
    corner_2.CornerRadius = UDim.new(0, 5)
    corner_2.Name = "corner"
    corner_2.Parent = base
    desc.Name = "desc"
    desc.Parent = base
    desc.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    desc.BackgroundTransparency = 1.000
    desc.BorderSizePixel = 0
    desc.Position = UDim2.new(0, 0, 0.5, 0)
    desc.Size = UDim2.new(1, 0, 0.5, 0)
    desc.Font = Enum.Font.GothamBlack
    desc.Text = "omg"
    desc.TextColor3 = Color3.fromRGB(255, 255, 255)
    desc.TextSize = 21.000
    desc.TextWrapped = true
    UIListLayout.Parent = holder
    UIListLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
    UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
    UIListLayout.Padding = UDim.new(0, 5)
    LayoutOrder.Name = "LayoutOrder"
    LayoutOrder.Parent = holder
end
moller.Name = "moller"
moller.Parent = main
moller.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
moller.BackgroundTransparency = 1.000
moller.BorderSizePixel = 0
moller.Position = UDim2.new(0.349999994, 0, 0, 0)
moller.Size = UDim2.new(0.25, 0, 0.150000006, 0)
moller.Image = "rbxassetid://7554747376"
moller.ScaleType = Enum.ScaleType.Fit
gradient_2.Color = ColorSequence.new{ColorSequenceKeypoint.new(0.00, Color3.fromRGB(20, 20, 20)), ColorSequenceKeypoint.new(1.00, Color3.fromRGB(79, 79, 79))}
gradient_2.Name = "gradient"
gradient_2.Parent = main
cmds.Parent = nil
base.Parent = nil

local function updateGuiPos(input, gui, startPos, dragStart)
    local delta = input.Position - dragStart
    gui.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
end
local UserInputService = game:GetService("UserInputService")


function startDragging(gui)
    local dragging
    local dragInput
    local dragStart
    local startPos
    local inputChanged

    gui.InputBegan:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
            dragging = true
            dragStart = input.Position
            startPos = gui.Position

            inputChanged = input.Changed:Connect(function()
                if input.UserInputState == Enum.UserInputState.End then
                    dragging = false
                    inputChanged:Disconnect()
                end
            end)
        end
    end)

    gui.InputChanged:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then
            dragInput = input
        end
    end)

    UserInputService.InputChanged:Connect(function(input)
        if input == dragInput and dragging then
            updateGuiPos(input, gui, startPos, dragStart)
        end
    end)
end

startDragging(holder)

local Bar = Instance.new("ScreenGui")
local Entry = Instance.new("Frame")
local Entry_2 = Instance.new("TextBox")
local gradient = Instance.new("UIGradient")
local AutoComplete = Instance.new("Frame")
local gradient_2 = Instance.new("UIGradient")
local Hidden = Instance.new("Frame")
local Logo = Instance.new("ImageLabel")
Bar.Name = "Bar"
API.parent(Bar)
Bar.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
Bar.Enabled = false
Entry.Name = "Entry"
Entry.Parent = Bar
Entry.AnchorPoint = Vector2.new(0.5, 0.5)
Entry.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
Entry.BorderSizePixel = 0
Entry.Position = UDim2.new(0.5, 0, 0.5, 0)
Entry.Size = UDim2.new(1, 0, 0, 35)
Entry_2.Name = "Entry"
Entry_2.Parent = Entry
Entry_2.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
Entry_2.BackgroundTransparency = 1.000
Entry_2.BorderSizePixel = 0
Entry_2.Size = UDim2.new(1, 0, 1, 0)
Entry_2.Font = Enum.Font.SourceSans
Entry_2.PlaceholderColor3 = Color3.fromRGB(178, 178, 178)
Entry_2.TextColor3 = Color3.fromRGB(178, 178, 178)
Entry_2.TextSize = 14.000
Entry_2.TextWrapped = true
newstroke(Entry, Color3.fromRGB(32, 35, 35))
newstroke(Entry_2, Color3.fromRGB(32, 35, 35))
gradient.Color = ColorSequence.new{ColorSequenceKeypoint.new(0.00, Color3.fromRGB(20, 20, 20)), ColorSequenceKeypoint.new(1.00, Color3.fromRGB(79, 79, 79))}
gradient.Name = "gradient"
gradient.Parent = Entry
Logo.Name = "Logo"
Logo.Parent = Bar
Logo.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
Logo.BackgroundTransparency = 1.000
Logo.BorderSizePixel = 0
Logo.Position = UDim2.new(-0.0134486258, 0, 0.379732728, 0)
Logo.Size = UDim2.new(0.100000001, 0, 0.100000001, 0)
Logo.Image = "rbxassetid://7554747376"
Logo.ScaleType = Enum.ScaleType.Fit
local Add = 0

game:GetService('RunService'):BindToRenderStep("commandBar", 199, function()
    Add += 0.1
    if Add >= 3600000 then
        Add = 0
    end
    Logo.Rotation = 5*math.cos(Add / 3)
    --Logo.Size = UDim2.new(0.1, 0, 0.1, 0) * (1 + 0.1*math.cos(Add / 3))
end)

local Entrys = {
    [1] = Entry,
    [2] = Entry_2,
}

Entry = Entrys[2]
Entry_2 = Entrys[1]


Entry.FocusLost:Connect(function(ep)
    if ep then
        local Text = Entry.Text
        local New = Text
        if Text:sub(#Prefix + 1) == Prefix then
            New = Text:sub(#Prefix + 1)
        end
        local Split = string.split(New, " ")
        local Function = Commands.Functions[Split[1]]
        if Function then
            table.remove(Split, 1)
            Function(unpack(Split))
        end
    end
end)

local function check(value, type)
    return value ~= nil and (typeof(value) == type or false) or false
end
local Load = {}

Load.Defaulted = {
    Prefix = Prefix,
    ActivationKey = OpenKey
}

function Load.Saves()
    if check(writefile, "function") and check(readfile, "function") then
        if pcall(function() readfile("moller.json") end) then
            if readfile("moller.json") ~= nil then
                if not pcall(function()
                        local decoded = game:GetService("HttpService"):JSONDecode(readfile("IY_FE.iy"))
                        if decoded.Prefix then
                            Prefix = decoded.Prefix
                        else
                            Prefix = Load.Defaulted.Prefix
                        end
                        if decoded.ActivationKey then
                            OpenKey = decoded.ActivationKey
                        else
                            OpenKey = Load.Defaulted.ActivationKey
                        end
                    end) then
                    writefile("moller.json", game:GetService("HttpService"):JSONEncode(Load.Defaulted))
                    wait()
                    Load.Saves()
                end
            else
                writefile("moller.json", game:GetService("HttpService"):JSONEncode(Load.Defaulted))
                task.wait()
                Load.Saves()
            end
        else
            writefile("moller.json", game:GetService("HttpService"):JSONEncode(Load.Defaulted))
            task.wait()
            if pcall(function() readfile("moller.json") end) then
                Load.Saves()
            end
        end
    end
end

UIListLayout.Parent = AutoComplete
UIListLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
UIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
UIListLayout.Padding = UDim.new(0, 5)

if check(writefile, "function") and check(readfile, "function") then
    Load.Saves()
else
    game:GetService('StarterGui'):SetCore("SendNotification", {
        Title = "moler warning,",
        Text = "Your exploit doesn't support writefile or readfile!",
        Icon = "rbxassetid://7037264869",
        Duration = 15,
        Button1 = "Close."
    })
end


function Load:SetActivationKey(ActivationKey)
    return UserInputService.InputBegan:Connect(function(InputObject, TextBoxEnabled)
        if TextBoxEnabled then return end
        local Key = InputObject.KeyCode
        if Key == ActivationKey then
            Bar.Enabled = not Bar.Enabled
        end
    end)
end


Load:SetActivationKey(OpenKey)

Players.LocalPlayer.Chatted:Connect(function(Text)
    Commands:Run(Text)
end)
