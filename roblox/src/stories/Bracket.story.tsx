import Roact from "@rbxts/roact"
import Bracket, { toggle } from "Bracket"
import { Plugins } from "util"
export = (target: Frame) => {
	const tree = Roact.mount(
		<Plugins.Provider value={[]}>
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
