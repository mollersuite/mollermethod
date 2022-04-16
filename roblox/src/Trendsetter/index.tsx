import Roact from "@rbxts/roact"
import { GuiService } from "@rbxts/services"
import { useEffect, useBinding, pure } from "@rbxts/roact-hooked"
import colors from "colors"
import Mollybdos from "Mollybdos"
import { QUOTES } from "strings"
import { random } from "util"

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
			<Mollybdos />

			<textbutton
				Position={UDim2.fromOffset(10, 84 + 300 + 10)}
				Size={UDim2.fromOffset(400, 100)}
				TextSize={14}
				Font="Arial"
				BackgroundColor3={colors.ACCENT}
				TextColor3={colors.WHITE}
				Text={random(QUOTES).split(" - ").join("\n- ")}
				Event={{
					MouseButton1Click: rbx => {
						rbx.Text = random(QUOTES).split(" - ").join("\n- ")
					},
				}}
				TextWrapped
				BorderSizePixel={0}>
				<uicorner CornerRadius={new UDim(0, 16)} />
			</textbutton>
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
