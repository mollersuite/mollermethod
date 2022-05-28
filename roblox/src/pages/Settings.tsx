import Roact from "@rbxts/roact"
import { pure, useContext } from "@rbxts/roact-hooked"
import { Colors } from "util"
import Page from "../components/Page"
import Placeholder from "../components/Placeholder"

export = pure(() => {
	const [colors, setColors] = useContext(Colors)
	return (
		<Page>
			<Placeholder Text="Settings is not implemented." />
			<textbutton
				AutomaticSize="XY"
				Text="Toggle Light Theme"
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
