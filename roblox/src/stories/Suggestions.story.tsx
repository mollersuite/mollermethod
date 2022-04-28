import Roact from "@rbxts/roact"
import { Plugins } from "util"
import Suggestions from "Bracket/Suggestions"
import { Export } from "types"
const mock = (cmds: [name: string, description: string][]): Export[] =>
	cmds.map(([name, description]) => ({
		Arguments: {},
		Description: description,
		Name: name,
		Run: print,
	}))
export = (target: Frame) => {
	const tree = Roact.mount(
		<Plugins.Provider
			value={[
				{
					Author: "mollersuite",
					Name: "mock plugin",
					Exports: mock([
						["moller", "cute"],
						["mollersuite", "cool"],
						["mollybdenum", "awesome"],
					])
				},
			]}>
			<uilistlayout
				SortOrder="Name"
				HorizontalAlignment="Center"
				VerticalAlignment="Top"
				Padding={new UDim(0, 10)}
			/>
			<Suggestions Text="mo" />
		</Plugins.Provider>,
		target
	)
	return () => Roact.unmount(tree)
}
