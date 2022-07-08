import Roact from "@rbxts/roact"
import { pure, useContext, useEffect, useState } from "@rbxts/roact-hooked"
import { useSingleMotor } from "@rbxts/roact-hooked-plus"
import { toggle as bracket_shown } from "Bracket"
import { Colors, Kill } from "util"
import { Spring } from "@rbxts/flipper"
// import { rejoin, respawn } from "Bracket/commands"

// let count = 0

import Mollybdos from "Mollybdos"
import Button from "components/Button"
import LocalBar from "pages/LocalPlayer"
import PlaceholderPage from "components/PlaceholderPage"
import Snippets from "pages/Snippets"
import Settings from "pages/Settings"
import mollerpotence from "mollerpotence"
import CloudScripts from "pages/CloudScripts"

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
	const [colors] = useContext(Colors)

	function page_to(component: typeof Page) {
		if (Page.component === component.component) {
			setPage(<></>)
		} else {
			setPage(component)
		}
	}

	return (
		<frame
			BorderSizePixel={0}
			BackgroundColor3={colors.map(colors => colors.BLACK)}
			Position={closed.map(n => new UDim2(0, 60, 0.5, 0).Lerp(new UDim2(0, -205, 0.5, 0), n))}
			Rotation={closed.map(n => n * 90)}
			Size={UDim2.fromOffset(50, 500)}
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
					Image="rbxassetid://9399201426"
					Size={UDim2.fromOffset(30, 30)}
					ScaleType="Fit"
					BackgroundTransparency={1}>
					<textlabel
						TextScaled
						Font="RobotoMono"
						Text={PKG_VERSION}
						TextColor3={colors.map(colors => colors.WHITE)}
						BackgroundTransparency={1}
						Size={UDim2.fromScale(1, 1)}
						TextXAlignment="Right"
						TextYAlignment="Bottom"
					/>
				</imagebutton>
			</Div>
			<imagelabel
				Visible={mollerpotence.enabled}
				Size={UDim2.fromOffset(20, 20)}
				BackgroundTransparency={1}
				ScaleType="Fit"
				ImageColor3={colors.map(colors => colors.WHITE)}
				Image="rbxassetid://9693083838"
				LayoutOrder={2}
			/>
			<Button
				Text="Bracket"
				LayoutOrder={3}
				Image="rbxassetid://9370028870"
				Activated={() => bracket_shown.Fire(true)}
			/>
			<Kill.Consumer
				render={kill => (
					<Button
						LayoutOrder={4}
						Text="Close"
						Image="rbxassetid://9370045727"
						Activated={kill}
					/>
				)}
			/>
			<Button
				Text="You"
				Image="rbxassetid://9417608010"
				LayoutOrder={5}
				Activated={() => page_to(<LocalBar />)}
				Accent={Page.component === LocalBar}
			/>
			<Button
				Text="Players"
				Image="rbxassetid://9370016791"
				LayoutOrder={6}
				Activated={() => page_to(<Mollybdos />)}
				Accent={Page.component === Mollybdos}
			/>
			<Button
				Text="Snippets"
				Image="rbxassetid://9620224527"
				LayoutOrder={7}
				Activated={() => page_to(<Snippets holder={notif} />)}
				Accent={Page.component === Snippets}
			/>
			<Button
				Text="Luau.ml"
				Image="rbxassetid://9369994718"
				LayoutOrder={8}
				Activated={() => page_to(<CloudScripts />)}
				Accent={Page.component === CloudScripts}
			/>
			<Button
				Text="Settings"
				Image="rbxassetid://9369994833"
				LayoutOrder={9}
				Activated={() => page_to(<Settings />)}
				Accent={Page.component === Settings}
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
