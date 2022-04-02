import { Debris, TweenService, UserInputService } from "@rbxts/services"
import { Kill, play, random, Plugins, Plugin } from "util"
import { QUOTES } from "strings"
import Roact from "@rbxts/roact"
import Bracket from "Bracket"
import BracketExternal from "Bracket/external"
import Notification from "Notification"
import Trendsetter from "Trendsetter"
import colors from "colors"

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
export = async function (options: {
	debug?: true
	gui: ScreenGui
	bracket_toggle?: Enum.KeyCode
	bracket_external?: boolean
	plugins?: string[]
	theme?: {
		background: string
		foreground: string
		accent: string
	}
}) {
	const GUI = options.gui
	if (options.theme) {
		colors.ACCENT = Color3.fromHex(options.theme.accent)
		colors.WHITE = Color3.fromHex(options.theme.foreground)
		colors.BLACK = Color3.fromHex(options.theme.background)
	}
	play("rbxassetid://9064208547")

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
							options.bracket_toggle ?? Enum.KeyCode.LeftBracket
					  )} to open it.</b>`
					: ""
			}`}
		/>,
		GUI,
		"Notification"
	)

	const plugins: Plugin[] = []

	if (options.plugins) {
		await Promise.allSettled(
			options.plugins.map(async source => {
				const [plugin, err] = loadstring(source)
				if (err) {
					warn(err)
					return
				} else if (plugin) {
					plugins.push(
						plugin({
							notify: (args: Parameters<typeof Notification>[0]) =>
								Roact.mount(<Notification {...args} />, GUI, "Notification"),
						})
					)
				}
			})
		)
	}

	const tree = Roact.mount(
		<Plugins.Provider value={plugins}>
			<Kill.Provider
				value={() => {
					Roact.unmount(tree)
					GUI.Destroy()
				}}>
				{options.bracket_external ? (
					<BracketExternal />
				) : (
					<Bracket Key="Bracket" button={options.bracket_toggle ?? Enum.KeyCode.LeftBracket} />
				)}
				<Trendsetter Key="Menu" />
			</Kill.Provider>
		</Plugins.Provider>,
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
	stroke.Color = colors.ACCENT
	TweenService.Create(
		border,
		new TweenInfo(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, true),
		{
			Size: new UDim2(1, -10, 1, -10),
		}
	).Play()
}
