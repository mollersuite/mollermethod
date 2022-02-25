import Roact from "@rbxts/roact"
import { pure } from "@rbxts/roact-hooked"
import { ACCENT, WHITE } from "colors"
import LocalBar from "./LocalBar"
import Mollybdos from "Mollybdos"
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
			TextSize={11}
			Font="Gotham"
			TextColor3={WHITE}
			Text={`v${PKG_VERSION}`}
			BorderSizePixel={0}
		>
			<uicorner CornerRadius={new UDim(0, 16)} />
			<uipadding PaddingLeft={new UDim(0, 16)} PaddingRight={new UDim(0, 16)} />
		</textlabel>
	</>
))
