import Roact from "@rbxts/roact"
import { GuiService } from "@rbxts/services"
import Left from "./Left"
import { useEffect, useBinding, pure } from "@rbxts/roact-hooked"

const Trendsetter = () => {
	const [open, setOpen] = useBinding(GuiService.MenuIsOpen)
	useEffect(() => {
		const closed = GuiService.MenuClosed.Connect(() => setOpen(false))
		const opened = GuiService.MenuOpened.Connect(() => setOpen(true))
		return () => {
			opened.Disconnect()
			closed.Disconnect()
		}
	}, [])

	return (
		<frame
			Visible={open}
			Position={UDim2.fromOffset(0, 36)}
			Size={new UDim2(1, 0, 1, -36)}
			BorderSizePixel={0}
			BackgroundTransparency={1}>
			{/* in-house features */}
			<Left />
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
