/// <reference types="@rbxts/types/plugin" />
import Roact from '@rbxts/roact'
import Hooks from '@rbxts/roact-hooks'
import { GuiService } from '@rbxts/services'

const Trendsetter: Hooks.FC = (_, { useState, useEffect }) => {
	const [open, setOpen] = useState(GuiService.MenuIsOpen)
	useEffect(() => {
		const backdrop = game
			.GetService('CoreGui')
			?.FindFirstChild('InGameMenu')
			?.FindFirstChild('Overlay')
			?.FindFirstChild('InputCapturer') as GuiObject | undefined
		if (backdrop) backdrop.Visible = false
		GuiService.MenuClosed.Connect(() => setOpen(false))
		GuiService.MenuOpened.Connect(() => setOpen(true))
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
						new ColorSequenceKeypoint(0, Color3.fromHex('#ff4539')),
						new ColorSequenceKeypoint(1, new Color3(0, 0, 0))
					])
				}
				Transparency={
					new NumberSequence([new NumberSequenceKeypoint(0, 0), new NumberSequenceKeypoint(1, 1)])
				}
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
 *
 * it has notable ui elements:
 * - it appears on the pause menu
 * - a gradient bg
 * - top left corner has wigdets like localplayer buttons, playerlist, changelog
 * - middle has a grid of scripts 2 items wide, that loads from Luau.ml & ScriptBlox, with infinite scroll
 * - or a masonry grid if possible
 * - right has settings and shit idk
 **/
export = new Hooks(Roact)(Trendsetter)
