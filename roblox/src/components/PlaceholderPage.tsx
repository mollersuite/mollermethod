import Roact from "@rbxts/roact"
import { useBinding, useEffect, withHooksPure } from "@rbxts/roact-hooked"
import { RunService } from "@rbxts/services"
import useColor from "hooks/useColor"
import Page from "./Page"
import Placeholder from "./Placeholder"

const Hourglass = withHooksPure<{ Position: Roact.Binding<UDim2> }>(props => (
	<imagelabel
		Image="rbxassetid://10834699866"
		AnchorPoint={new Vector2(0.5, 0.5)}
		Size={UDim2.fromOffset(16, 26)}
		BackgroundTransparency={1}
		ImageColor3={useColor("fg")}
		Position={props.Position}
	/>
))

export = withHooksPure(() => {
	const [frame, setFrame] = useBinding(0)
	useEffect(() => {
		const heartbeat = RunService.Heartbeat.Connect(delta => {
			setFrame(frame.getValue() + delta)
		})
		return () => heartbeat.Disconnect()
	}, [])

	return (
		<Page>
			<Placeholder Text="Coming soon." />
			<Hourglass
				Position={frame.map(frame =>
					UDim2.fromScale(0.5 + math.sin(frame) / 2.1, 0.5 + math.cos(frame) / 2.1)
				)}
			/>
			<Hourglass
				Position={frame.map(frame =>
					UDim2.fromScale(0.5 + math.cos(frame) / 2.1, 0.5 + math.sin(frame) / 2.1)
				)}
			/>
			<Hourglass
				Position={frame.map(frame =>
					UDim2.fromScale(0.5 - math.sin(frame) / 2.1, 0.5 + math.cos(frame) / 2.1)
				)}
			/>
			<Hourglass
				Position={frame.map(frame =>
					UDim2.fromScale(0.5 - math.cos(frame) / 2.1, 0.5 + math.sin(frame) / 2.1)
				)}
			/>
		</Page>
	)
})
