import Roact from "@rbxts/roact"
import { pure, useEffect, useState } from "@rbxts/roact-hooked"
import { useSingleMotor } from "@rbxts/roact-hooked-plus"
import { toggle as bracket_shown } from "Bracket"
import { Kill } from "util"
import { Spring } from "@rbxts/flipper"
// import { rejoin, respawn } from "Bracket/commands"

// let count = 0

import Mollybdos from "Mollybdos"
import Button from "components/Button"
import LocalBar from "pages/LocalPlayer"
import Settings from "pages/Settings"
import mollerpotence from "mollerpotence"
import CloudScripts from "pages/CloudScripts"
import useColor from "hooks/useColor"

// `display: contents` for Roblox, use to workaround things like not being able to change Rotation in a UIListLayout
const Div: Roact.FunctionComponent = props => (
	<frame BackgroundTransparency={1} AutomaticSize="XY">
		{props[Roact.Children]}
	</frame>
)

const spring = (n: number) => new Spring(n, { dampingRatio: 1, frequency: 2 })
export = pure<{ container: Instance; notif: Frame }>(({ container, notif }) => {
	const [closed, setOpen] = useSingleMotor(1)
	const [Page, setPage] = useState<Roact.Element>(<></>)
	const white = useColor("WHITE")
	const black = useColor("BLACK")

	function page_to(component: typeof Page) {
		if (Page.component === component.component) {
			setPage(<></>)
		} else {
			setPage(component)
		}
	}

	useEffect(() => {
		setOpen(spring(0))
	}, [])

	return (
		<frame
			BorderSizePixel={0}
			BackgroundColor3={black}
			Position={closed.map(n => new UDim2(0, 60, 0.5, 0).Lerp(new UDim2(0, -125, 1, -50), n))}
			Rotation={closed.map(n => n * 90)}
			Size={UDim2.fromOffset(50, 350)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			ZIndex={5}
			ClipsDescendants={false}>
			<uicorner CornerRadius={new UDim(0, 10)} />
			<uipadding PaddingTop={new UDim(0, 10)} PaddingBottom={new UDim(0, 10)} />
			<uilistlayout
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Top}
				SortOrder="LayoutOrder"
				Padding={new UDim(0, 10)}
			/>
			<Div>
				<imagebutton
					LayoutOrder={1}
					BorderSizePixel={0}
					Rotation={closed.map(n => n * -90)}
					Event={{
						Activated: () => setOpen(spring(closed.getValue() === 1 ? 0 : 1)),
					}}
					Image="rbxassetid://10694413123"
					Size={UDim2.fromOffset(25, 25)}
					ScaleType="Fit"
					BackgroundTransparency={1}
				/>
			</Div>
			<imagelabel
				Visible={mollerpotence.enabled}
				Size={UDim2.fromOffset(20, 20)}
				BackgroundTransparency={1}
				ScaleType="Fit"
				ImageColor3={white}
				Image="rbxassetid://9693083838"
				LayoutOrder={2}
			/>
			<Kill.Consumer
				render={kill => (
					<Button
						LayoutOrder={3}
						Text="Close"
						Image="rbxassetid://10821974701"
						Activated={kill}
					/>
				)}
			/>
			<Button
				Text="Bracket"
				LayoutOrder={4}
				Image="rbxassetid://10821975942"
				Activated={() => bracket_shown.Fire(true)}
			/>
			<Button
				Text="You"
				Image="rbxassetid://10821933493"
				LayoutOrder={5}
				Activated={() => page_to(<LocalBar />)}
				Accent={Page.component === LocalBar}
			/>
			<Button
				Text="Players"
				Image="rbxassetid://10821933655"
				LayoutOrder={6}
				Activated={() => page_to(<Mollybdos />)}
				Accent={Page.component === Mollybdos}
			/>
			<Button
				Text="Luau.ml"
				Image="rbxassetid://10821933254"
				LayoutOrder={8}
				Activated={() => page_to(<CloudScripts />)}
				Accent={Page.component === CloudScripts}
			/>
			<Button
				Text="Settings"
				Image="rbxassetid://10821933004"
				LayoutOrder={9}
				Activated={() => page_to(<Settings />)}
				Accent={Page.component === Settings}
			/>
			<textlabel
				AutomaticSize="XY"
				Font="RobotoMono"
				Text={PKG_VERSION}
				TextSize={12}
				TextColor3={white}
				BackgroundTransparency={1}
				LayoutOrder={10}
				TextXAlignment="Center"
				TextYAlignment="Top"
			/>
			{/* <textlabel
				Text={`Rendered ${++count} times`}
				LayoutOrder={100}
				BackgroundTransparency={1}
				AutomaticSize="XY"
				TextSize={15}
				Font="RobotoMono"
				TextColor3={colors.map(colors => colors.WHITE)}
			/> */}
			<Roact.Portal target={container}>{Page}</Roact.Portal>
		</frame>
	)
})
