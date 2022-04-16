import Roact from "@rbxts/roact"
import colors from "colors"
import Mollybdos from "Mollybdos"
import { QUOTES } from "strings"
import { random } from "util"

/**
 * the top left corner has a couple widgets, like the playerlist, changelog, and localplayer buttons
 **/
export = () => (
	<>
		<Mollybdos />

		<textbutton
			Position={UDim2.fromOffset(10, 84 + 300 + 10)}
			Size={UDim2.fromOffset(400, 100)}
			TextSize={14}
			Font="Arial"
			BackgroundColor3={colors.ACCENT}
			TextColor3={colors.WHITE}
			Text={random(QUOTES).split(" - ").join("\n- ")}
			Event={{
				MouseButton1Click: rbx => {
					rbx.Text = random(QUOTES).split(" - ").join("\n- ")
				},
			}}
			TextWrapped
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 16)} />
		</textbutton>
	</>
)
