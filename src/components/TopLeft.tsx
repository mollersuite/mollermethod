/// <reference types="@rbxts/types/plugin" />
import Roact from "@rbxts/roact"
import LocalBar from "./LocalBar"
import Mollybdos from "./Mollybdos"

/**
 * the top left corner has a couple widgets, like the playerlist, changelog, and localplayer buttons
 **/
export = () => {
	return (
		<>
			<LocalBar />
			<Mollybdos />
		</>
	)
}
