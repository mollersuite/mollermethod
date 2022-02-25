import Roact from "@rbxts/roact"
import { useEffect, useState, pure } from "@rbxts/roact-hooked"
import { BLACK } from "colors"
import Details from "./Details"
import PlayerList from "./Players"

export = pure(() => {
	const [selected, setSelected] = useState<Player | void>(undefined)
	// handling selected player leaving
	useEffect(() => {
		const connection = selected?.AncestryChanged.Connect(() => {
			setSelected(undefined)
		})

		return () => connection?.Disconnect()
	}, [selected])

	return (
		<frame
			Position={UDim2.fromOffset(10, 84)}
			Size={UDim2.fromOffset(400, 300)}
			BackgroundColor3={BLACK}
			BorderSizePixel={0}
		>
			<uicorner CornerRadius={new UDim(0, 16)} />
			<uilistlayout FillDirection="Horizontal" />
			<PlayerList selected={selected} setSelected={setSelected} />
			<Details selected={selected} />
		</frame>
	)
})
