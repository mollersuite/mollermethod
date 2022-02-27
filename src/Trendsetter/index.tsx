import Roact from "@rbxts/roact"
import { GuiService } from "@rbxts/services"
import { ACCENT, WHITE } from "colors"
import Left from "./Left"
import { useEffect, useState, pure } from "@rbxts/roact-hooked"
import { play } from "util"

const Trendsetter = ({ Kill }: { Kill: () => void }) => {
	const [open, setOpen] = useState(GuiService.MenuIsOpen)

	useEffect(() => {
		const backdrop = game
			.GetService("CoreGui")
			?.FindFirstChild("InGameMenu")
			?.FindFirstChild("Overlay")
			?.FindFirstChild("InputCapturer") as GuiObject | undefined
		if (backdrop) backdrop.Visible = false
		const closed = GuiService.MenuClosed.Connect(() => setOpen(false))
		const opened = GuiService.MenuOpened.Connect(() => setOpen(true))
		return () => {
			opened.Disconnect()
			closed.Disconnect()
			if (backdrop) backdrop.Visible = true
		}
	}, [])

	return (
		<frame
			Visible={open}
			Position={UDim2.fromOffset(464)}
			Size={new UDim2(1, -464, 1, 0)}
			BorderSizePixel={0}>
			<uigradient
				Rotation={15}
				Color={
					new ColorSequence([
						new ColorSequenceKeypoint(0, ACCENT),
						new ColorSequenceKeypoint(1, new Color3(0, 0, 0)),
					])
				}
				Transparency={
					new NumberSequence([new NumberSequenceKeypoint(0, 0), new NumberSequenceKeypoint(1, 1)])
				}
			/>
			{/* in-house features */}
			<Left Kill={Kill} />
			{/* 🕯️ */}
			<textbutton
				Event={{
					MouseButton1Click: () => play("rbxassetid://6881833667", 10),
				}}
				AutomaticSize="XY"
				TextColor3={WHITE}
				TextTransparency={0.5}
				Text="🕯️ Dedicated to Molly the Beagle, who was put down on January 31st, 2022."
				AnchorPoint={new Vector2(0.5, 1)}
				Position={UDim2.fromScale(0.5, 1)}
				BackgroundTransparency={1}
			/>
		</frame>
	)
}

/**
 * # trendsetter
 *
 * mollermethod's UI.
 *
 * named trendsetter because it will suffer from shlex syndrome upon release
 **/
export = pure(Trendsetter)
