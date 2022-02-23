import Roact from '@rbxts/roact'
import Hooks from '@rbxts/roact-hooks'
import { Debris, TweenService } from '@rbxts/services'
import { play } from 'util'

const Notification: Hooks.FC<{
	Text: string
	Icon?: string
	Duration?: number
	App?: string
}> = (
	{ Duration = 5, Text, Icon = 'rbxassetid://7554747376', App = 'mollermethod' },
	{ useEffect }
) => {
	const ref = Roact.createRef<Frame>()

	useEffect(() => {
		play('rbxassetid://8183296024')
		Debris.AddItem(ref.getValue()!, Duration + 0.6)
		const tween = TweenService.Create(
			ref.getValue()!,
			new TweenInfo(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
			{ Position: new UDim2(1, -15, 1, -15) }
		)
		tween.Play()
		tween.Completed.Connect(() => {
			TweenService.Create(
				ref.getValue()!,
				new TweenInfo(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.In, 0, false, Duration),
				{ Position: new UDim2(1, -15, 3, -15) }
			).Play()
		})
	}, [])

	return (
		<frame
			Ref={ref}
			AnchorPoint={new Vector2(1, 1)}
			BackgroundColor3={Color3.fromHex('#1C1C1C')}
			Position={new UDim2(1, -15, 3, -15)}
			Size={UDim2.fromOffset(362, 148)}>
			<uicorner CornerRadius={new UDim(0, 12)} />
			<uistroke
				ApplyStrokeMode="Contextual"
				Color={Color3.fromHex('#2A2E2E')}
				LineJoinMode="Round"
				Thickness={5}
				Transparency={0}
			/>
			
		</frame>
	)
}

export = new Hooks(Roact)(Notification)