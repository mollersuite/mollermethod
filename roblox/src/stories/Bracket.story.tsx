import Roact from "@rbxts/roact"
import Snapdragon from "@rbxts/snapdragon"
import Bracket, { toggle } from "Bracket"
import colors from "colors"
import commands from "plugins/commands"
import { Plugins } from "util"

export = (target: Frame) => {
	const tree = Roact.mount(
		<Plugins.Provider
			value={[
				commands({
					GUI: target,
					Snapdragon,
					notify: () => {},
					colors: Roact.createBinding(colors)[0],
					Roact,
				}),
			]}>
			<textbutton
				Text="open bracket"
				AutomaticSize="XY"
				Event={{
					Activated: () => toggle.Fire(true),
				}}
			/>
			<Bracket button={Enum.KeyCode.LeftBracket} test />
		</Plugins.Provider>,
		target
	)
	return () => Roact.unmount(tree)
}
