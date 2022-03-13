import Roact from "@rbxts/roact"
import { pure, useEffect, useState } from "@rbxts/roact-hooked"
import { BLACK, WHITE } from "colors"
import { useSpring } from "hooks/common/use-spring"
import { play } from "util"

const Notification = ({
	Duration = 5,
	Text,
	Icon = "rbxassetid://7554747376",
	App = "mollermethod",
}: {
	Text: string
	Icon?: string
	Duration?: number
	App?: string
}) => {
	const ref = Roact.createRef<Frame>()
	const [shown, setShown] = useState(false)

	useEffect(() => {
		play("rbxassetid://8183296024")
		setShown(true)
		task.delay(Duration, setShown, false)
	}, [])

	return (
		<frame
			Ref={ref}
			AnchorPoint={new Vector2(1, 1)}
			BackgroundColor3={BLACK}
			Position={useSpring(shown ? new UDim2(1, -15, 1, -15) : new UDim2(1, -15, 1, 125), {
				frequency: 2,
				dampingRatio: 0.8,
			})}
			Size={UDim2.fromOffset(362, 100)}>
			<uicorner CornerRadius={new UDim(0, 12)} />
			<uistroke
				ApplyStrokeMode="Contextual"
				Color={Color3.fromHex("#2A2E2E")}
				LineJoinMode="Round"
				Thickness={5}
				Transparency={0}
			/>
			<imagelabel
				Size={UDim2.fromOffset(50, 50)}
				Position={new UDim2(0, 5, 0.5, 0)}
				AnchorPoint={new Vector2(0, 0.5)}
				Image={Icon}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScaleType="Fit"
			/>
			<textlabel
				Text={App}
				Font="GothamBlack"
				TextSize={24}
				TextColor3={WHITE}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={UDim2.fromOffset(70, 5)}
				Size={new UDim2(1, -70, 0, 25)}
				AutomaticSize="Y"
				BackgroundTransparency={1}
				BorderSizePixel={0}
			/>
			<textlabel
				Text={Text}
				Font="Gotham"
				RichText
				TextSize={11}
				TextColor3={WHITE}
				TextXAlignment="Left"
				TextYAlignment="Top"
				Position={UDim2.fromOffset(70, 30)}
				Size={new UDim2(1, -70, 1, -30)}
				TextWrapped
				BackgroundTransparency={1}
				BorderSizePixel={0}
			/>
		</frame>
	)
}

export = pure(Notification)
