import Roact from "@rbxts/roact"
import { Plugins } from "util"
import Suggestions from "./Suggestions"

export = (target: Frame) => {
	const tree = Roact.mount(
		<Plugins.Provider value={[]}>
			<uilistlayout
				SortOrder="Name"
				HorizontalAlignment="Center"
				VerticalAlignment="Top"
				Padding={new UDim(0, 10)}
			/>
			<Suggestions Text="re" KeyCode={Enum.KeyCode.LeftBracket} />
		</Plugins.Provider>,
		target
	)
	return () => Roact.unmount(tree)
}
