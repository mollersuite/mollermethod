import { $git } from "rbxts-transform-debug"
import { ACCENT, WHITE } from "colors"
import { pure } from "@rbxts/roact-hooked"
import LocalBar from "./LocalBar"
import Mollybdos from "Mollybdos"
import Roact from "@rbxts/roact"
import { play, random } from "util"
const { Branch } = $git()

const tips = [
	"mollermethod has a built in admin? Press [ to open.",
	"mollermethod is written in roblox-ts?",
	"we have a twitter? @mollersuite",
	"you're using the 4th rewrite of mollermethod?",
	"if you triple-click this button, it will play LuaQuack's vouch?",
]

/**
 * the top left corner has a couple widgets, like the playerlist, changelog, and localplayer buttons
 **/
export = pure(() => (
	<>
		<LocalBar />
		<Mollybdos />
		<textlabel
			Position={UDim2.fromOffset(320, 10)}
			Size={UDim2.fromOffset(90, 22)}
			BackgroundColor3={ACCENT}
			TextSize={14}
			Font="RobotoCondensed"
			AutomaticSize="X"
			TextColor3={WHITE}
			Text={`v${PKG_VERSION}${!['main','HEAD'].includes(Branch) ? ` (${Branch})` : ""}`}
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 16)} />
		</textlabel>
		<textbutton
			Position={UDim2.fromOffset(10, 84 + 300 + 10)}
			Size={UDim2.fromOffset(400, 100)}
			TextSize={14}
			Font="Gotham"
			BackgroundColor3={ACCENT}
			TextColor3={WHITE}
			Text={`Did you know...\n${random(tips)}`}
			Event={{
				Activated: (rbx, _, count) => {
					if (count === 2) {
						play("rbxassetid://6345755361")
					} else rbx.Text = `Did you know that...\n${random(tips)}`
				},
			}}
			TextWrapped
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 16)} />
		</textbutton>
	</>
))
