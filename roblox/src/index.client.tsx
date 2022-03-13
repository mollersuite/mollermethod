import { ACCENT } from "colors"
import { Debris, HttpService, Players, TweenService, UserInputService } from "@rbxts/services"
import { Kill, play, random } from "util"
import { QUOTES } from "strings"
import Roact from "@rbxts/roact"
import Bracket from "Bracket" // Bracket is the admin commands
import Notification from "Notification"
import Trendsetter from "Trendsetter" // Trendsetter is the pause menu

/**
 * @see https://mthd.ml
 * @name mollermethod
 * @description Scripting, unleashed.
 * @author Jack W.
 * @example
 * ```lua
 * loadstring (game:HttpGet "mthd.ml") {
 *
 * }
 * ```
 */
const GUI = new Instance("ScreenGui")
GUI.Name = HttpService.GenerateGUID()
GUI.IgnoreGuiInset = true
GUI.ResetOnSpawn = false
GUI.DisplayOrder = 7
GUI.Parent =
	gethui?.() ?? game.GetService("CoreGui") ?? Players.LocalPlayer.FindFirstChildOfClass("PlayerGui")
play("rbxassetid://8192419115")

/*
	  so here we are detecting IY and giving them ads for Bracket
	  of course IY_LOADED isn't in roblox api
	  but in Lua if you access a variable that doesn't exist it will return nil
	  in typescript it will error
	  so we have to use ambient.d.ts to trick typescript into thinking it exists
	  which then compiles to Lua
	  which can check properly for IY_LOADED
	*/
Roact.mount(
	<Notification
		Text={`<b>Pause</b> to open mollermethod.\n<i>${random(QUOTES)}</i>${
			IY_LOADED
				? `\n<b>Did you know that mollermethod has its own IY alternative? Press ${UserInputService.GetStringForKeyCode(
						Enum.KeyCode.LeftBracket
				  )} to open it.</b>`
				: ""
		}`}
	/>,
	GUI,
	"Notification"
)

const tree = Roact.mount(
	<Kill.Provider
		value={() => {
			Roact.unmount(tree)
			GUI.Destroy()
		}}>
		<Bracket Key="Bracket" button={Enum.KeyCode.LeftBracket} />
		<Trendsetter Key="Menu" />
	</Kill.Provider>,
	GUI
)

/*
		Google Assistant-style startup animation
	 */
const border = new Instance("Frame", GUI)
Debris.AddItem(border, 1)
border.Size = UDim2.fromScale(1, 1)
border.AnchorPoint = new Vector2(0.5, 0.5)
border.Position = UDim2.fromScale(0.5, 0.5)
border.BackgroundTransparency = 1
const stroke = new Instance("UIStroke", border)
stroke.Thickness = 15
stroke.Color = ACCENT
TweenService.Create(
	border,
	new TweenInfo(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, true),
	{
		Size: new UDim2(1, -10, 1, -10),
	}
).Play()
