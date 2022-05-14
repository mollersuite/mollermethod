import Roact from "@rbxts/roact"
import { pure, useContext } from "@rbxts/roact-hooked"
import { Colors } from "util"
import Page from "./Page"
import Placeholder from "./Placeholder"

export = pure(() => {
	const [colors, setColors] = useContext(Colors)
	return (
		<Page>
			<Placeholder Text="this isn't final at all" />
			<textbutton
				AutomaticSize="XY"
				Text="click me!"
				Event={{
					Activated: () =>
						setColors({
							...colors.getValue(),
							BLACK: colors.getValue().WHITE,
							WHITE: colors.getValue().BLACK,
						}),
				}}
			/>
		</Page>
	)
})
