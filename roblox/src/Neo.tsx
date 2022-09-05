import Roact from "@rbxts/roact"
import { withHooksPure, useEffect, useState } from "@rbxts/roact-hooked"
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
import About from "pages/About"

// `display: contents` for Roblox, use to workaround things like not being able to change Rotation in a UIListLayout
const Div: Roact.FunctionComponent = props => (
	<frame BackgroundTransparency={1} AutomaticSize="XY">
		{props[Roact.Children]}
	</frame>
)

const spring = (n: number) => new Spring(n, { dampingRatio: 1, frequency: 2 })
export = withHooksPure<{ container: Instance; notif: Frame }>(({ container, notif }) => {
	const [closed, setOpen] = useSingleMotor(1)
	const [Page, setPage] = useState<Roact.Element>(<></>)
	const white = useColor("fg")

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
			BackgroundColor3={useColor("header_bg")}
			Position={closed.map(n => new UDim2(0, 60, 0.5, 0).Lerp(new UDim2(0.5, 0, 0, -100), n))}
			Rotation={closed.map(n => n * 180)}
			Size={UDim2.fromOffset(50, 300)}
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
					Rotation={closed.map(n => n * -180)}
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
			<Button
				Text="Bracket"
				LayoutOrder={3}
				Image="rbxassetid://10821975942"
				Activated={() => bracket_shown.Fire(true)}
			/>
			<Kill.Consumer
				render={kill => (
					<Button
						LayoutOrder={4}
						Text="Close"
						Image="rbxassetid://10822002501"
						Activated={kill}
					/>
				)}
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
			<Button
				Text="About"
				Image="rbxassetid://10832217708"
				LayoutOrder={10}
				Activated={() => page_to(<About />)}
				Accent={Page.component === About}
			/>
			<Roact.Portal target={container}>{Page}</Roact.Portal>
		</frame>
	)
})
