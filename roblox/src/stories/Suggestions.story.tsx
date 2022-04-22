import Roact from "@rbxts/roact"
import { Plugins } from "util"
import Suggestions from "Bracket/Suggestions"

export = (target: Frame) => {
	const tree = Roact.mount(
		<Plugins.Provider
			value={[
				{
					Author: "mollersuite",
					Name: "mock plugin",
					Commands: {
						moller: {
							description: "cute",
							execute: print,
						},
						mollersuite: {
							description: "cool",
							execute: warn,
						},
						mollybdenum: {
							description: "awesome",
							execute: print,
						},
					},
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
