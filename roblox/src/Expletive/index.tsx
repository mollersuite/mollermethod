import Roact from "@rbxts/roact"
import { pure, useEffect, useState } from "@rbxts/roact-hooked"
import { useSingleMotor, useSpring } from "@rbxts/roact-hooked-plus"
import colors from "colors"
import { toggle as bracket_shown } from "Bracket"
import { join_code, Kill } from "util"
import { rejoin, respawn } from "Bracket/commands"
import { Spring } from "@rbxts/flipper"
import Mollybdos from "Mollybdos"
// let count = 0
const Button = pure<{
	Text: string
	Image: string
	LayoutOrder?: number
	Activated?: (rbx: TextButton, input: InputObject, clickCount: number) => unknown
	Accent?: boolean
}>(({ Text, Activated, Image, LayoutOrder, Accent }) => {
	const [hovered, setHovered] = useState(false)
	const [active, setActive] = useState(false)

	return (
		<textbutton
			BackgroundColor3={Accent ? colors.ACCENT : colors.BLACK}
			Text=""
			LayoutOrder={LayoutOrder}
			Event={{
				MouseEnter: () => setHovered(true),
				MouseLeave: () => {
					setHovered(false)
					setActive(false)
				},
				Activated,
				MouseButton1Down: () => setActive(true),
				MouseButton1Up: () => setActive(false),
			}}
			AutomaticSize="X"
			Size={UDim2.fromOffset(30, 30)}>
			<uiscale Scale={useSpring(active ? 1.1 : 1, {})} />
			<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			<uicorner CornerRadius={new UDim(0, 10)} />
			<imagelabel
				Size={UDim2.fromOffset(20, 20)}
				BackgroundTransparency={1}
				AnchorPoint={new Vector2(0, 0.5)}
				Position={UDim2.fromScale(0, 0.5)}
				Image={Image}
				ImageColor3={colors.WHITE}
				ScaleType="Fit"
			/>
			<textlabel
				AutomaticSize="X"
				TextXAlignment="Left"
				BackgroundTransparency={1}
				TextColor3={colors.WHITE}
				Position={useSpring(hovered ? 1 : 0, {
					dampingRatio: 1,
				}).map(n => UDim2.fromScale(0, 0.5).Lerp(new UDim2(0, 25, 0.5, 0), n))}
				AnchorPoint={new Vector2(0, 0.5)}
				Font="GothamBlack"
				Text={Text}
				// for hover
				TextSize={useSpring(hovered ? 11.99 : 1, {
					dampingRatio: 1,
				})}
				TextTransparency={useSpring(hovered ? 0 : 1, {
					dampingRatio: 1,
				})}
			/>
		</textbutton>
	)
})
const spring = (n: number) => new Spring(n, { dampingRatio: 1, frequency: 2 })
export = pure<{ container: Instance }>(({ container }) => {
	const [closed, setOpen] = useSingleMotor(1)
	const [transparency, setTransparency] = useSingleMotor(0.7)
	const [Page, setPage] = useState<Roact.Element>(<></>)

	function page_to(component: typeof Page) {
		if (Page.component === component.component) {
			setPage(<></>)
		} else {
			setPage(component)
		}
	}

	useEffect(() => setOpen(spring(0)), [])

	return (
		<frame
			Event={{
				MouseEnter: () => setTransparency(spring(0.5)),
				MouseLeave: () => setTransparency(spring(0.7)),
			}}
			BackgroundTransparency={transparency}
			BorderSizePixel={0}
			BackgroundColor3={colors.BLACK}
			Position={closed.map(n => new UDim2(0.5, 0, 1, -50).Lerp(new UDim2(0.5, 0, 0, 50), n))}
			Size={closed.map(n => UDim2.fromOffset(960, 50).Lerp(new UDim2(0, 50, 0, 50), n))}
			AnchorPoint={new Vector2(0.5, 1)}
			ClipsDescendants>
			<uicorner CornerRadius={new UDim(0, 10)} />
			<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				HorizontalAlignment={Enum.HorizontalAlignment.Left}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				SortOrder="LayoutOrder"
				Padding={new UDim(0, 10)}
			/>
			<imagebutton
				LayoutOrder={1}
				BorderSizePixel={0}
				Event={{
					Activated: () => setOpen(spring(closed.getValue() === 1 ? 0 : 1)),
				}}
				Image="rbxassetid://9399201426"
				BackgroundColor3={colors.BLACK}
				Size={UDim2.fromOffset(30, 30)}
				ScaleType="Fit"
				BackgroundTransparency={1}>
				<textlabel
					TextSize={5}
					Font="RobotoMono"
					Text={PKG_VERSION}
					TextColor3={colors.WHITE}
					BackgroundTransparency={1}
					Size={UDim2.fromScale(1, 1)}
					TextXAlignment="Right"
					TextYAlignment="Bottom"
				/>
			</imagebutton>
			<Button
				Text="Bracket"
				LayoutOrder={2}
				Image="rbxassetid://9370028870"
				Activated={() => bracket_shown.Fire(true)}
			/>
			<Kill.Consumer
				render={kill => (
					<Button
						LayoutOrder={3}
						Text="Close"
						Image="rbxassetid://9370045727"
						Activated={kill}
					/>
				)}
			/>
			<Button
				Text="Players"
				Image="rbxassetid://9370016791"
				LayoutOrder={4}
				Activated={() => page_to(<Mollybdos />)}
				Accent={Page.component === Mollybdos}
			/>
			<Button Text="Scripts" Image="rbxassetid://9369994718" LayoutOrder={5} />
			{/* START "the ones that will be in localplayer when thats added" section */}
			<Button
				Text="Copy invite"
				LayoutOrder={6}
				Image="rbxassetid://9377140521"
				Activated={() => join_code().then(setclipboard ?? print)}
			/>
			<Button
				Text="Respawn"
				LayoutOrder={7}
				Image="rbxassetid://9380799867"
				Activated={() => respawn.execute([])}
			/>
			<Button
				Text="Rejoin"
				LayoutOrder={8}
				Image="rbxassetid://9380809978"
				Activated={() => rejoin.execute([])}
			/>
			{/* END */}
			<Button Text="Settings" Image="rbxassetid://9369994833" LayoutOrder={9} />
			{/* <textlabel
				Text={`Rendered ${++count} times`}
				LayoutOrder={100}
				BackgroundTransparency={1}
				AutomaticSize="XY"
				TextSize={15}
				Font="RobotoMono"
				TextColor3={colors.WHITE}
			/> */}
			<Roact.Portal target={container}>{Page}</Roact.Portal>
		</frame>
	)
})
