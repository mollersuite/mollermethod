import { ACCENT } from "colors"
import { Debris, TweenService, UserInputService } from "@rbxts/services"
import { play, random } from "util"
import Roact from "@rbxts/roact"
import Bracket from "Bracket" // Bracket is the admin commands
import Notification from "Notification"
import Trendsetter from "Trendsetter" // Trendsetter is the pause menu

/**
 * mollermethod chooses a random quote from this list on startup
 */
const quotes = [
	'"I guess my favourite concept of money laundering is just money to gold bars to money" - Charlie, 2022',
	'"i wrote a whole ass lua bytecode builder in a day" - Mlemix, 2022',
	'"RETIRER VOTRE ANTIVIRUS" - 404coddy404, 2022, trying to cookie grab me',
	'"https://tenor.com/view/همم-gif-21570043" - Bongo, 2022, after I told him Molly was put down',
	'"wait no dont said no furry porn" - Bongo, 2022 (right before Amourousity sent furry porn)',
	`"I'd get report bottled [sic]" - Jack, 2022`,
	'"I like snake venom is because of its UI/UX effects [...] I dont have anywehre [sic] near the skill to recreate it" - Sp3ct3r3, 2022',
	'"bruh im having so much trouble with ca-tay ui" - Bongo, 2022',
	'"I know how to bypass https encryption" - tact, 2022',
	'"why would mau skid from anything" - Exruw, 2021',
	'"trollsmile [not] winning" - Amourousity, 2021',
	'"[I want you to make a] grab knife script but its a meme knife for mobile and pc" - k9#7062, 2021',
	'"WHAT THE FUCK IS MOLY MOLER [sic] DOING" - DeadBoris, 2021',
	'"i fuking hat you ashole ill fuck find you [...] tis yor fault" - Vexaria, 2021',
	'"this is why you dont give people stuff that actually works and isnt bad" - Charlie, 2021',
	'"Well listen and listen well, me and Auxnos partnered and fixed the animations, lights, and fixed the guns." - mongrio, 2021',
	'"this is molly moller herself in the oven https://www.youtube.com/watch?v=Ck8o6j4R3HI" - Charlie, 2021',
	'"I decided to edit it [Immortality Lord] and make it have quite a few new features" - Charlie, 2020',
	`"I'ma hack u y'all" - cash_youtwin, 2020`,
]

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
export = function (options: { Debug?: true; GUI: ScreenGui }) {
	const GUI = options.GUI
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
			Text={`<b>Pause</b> to open mollermethod.\n<i>${random(quotes)}</i>${
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

	/*
		We're assigning these trees to variables so we can unmount them
		Why unmount them?
		Because we need to fire the destructors in useEffect
		which does not happen if we just destroy
		you have to unmount for that
	*/
	const bracket_tree = Roact.mount(<Bracket button={Enum.KeyCode.LeftBracket} />, GUI, "Bracket")
	const tree = Roact.mount(
		<Trendsetter
			Kill={() => {
				Roact.unmount(tree)
				Roact.unmount(bracket_tree)
				GUI.Destroy()
			}}
		/>,
		GUI,
		"Menu"
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
}
