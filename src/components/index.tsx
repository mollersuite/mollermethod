/// <reference types="@rbxts/types/plugin" />
import Roact from '@rbxts/roact'
import Hooks from '@rbxts/roact-hooks'
import TopLeft from 'components/TopLeft'
import { GuiService } from '@rbxts/services'
import { ACCENT } from 'colors'
import IconButton from './IconButton'

const Trendsetter: Hooks.FC<{
	Kill: () => void
}> = ({ Kill }, { useState, useEffect }) => {
	const [open, setOpen] = useState(GuiService.MenuIsOpen)
	const [enabled, setEnabled] = useState(true)
	useEffect(() => {
		const backdrop = game
			.GetService('CoreGui')
			?.FindFirstChild('InGameMenu')
			?.FindFirstChild('Overlay')
			?.FindFirstChild('InputCapturer') as GuiObject | undefined
		if (backdrop) backdrop.Visible = false
		const closed = GuiService.MenuClosed.Connect(() => setOpen(false))
		const opened = GuiService.MenuOpened.Connect(() => setOpen(true))
		return () => {
			opened.Disconnect()
			closed.Disconnect()
		}
	}, [])

	return enabled ? (
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
						new ColorSequenceKeypoint(1, new Color3(0, 0, 0))
					])
				}
				Transparency={
					new NumberSequence([new NumberSequenceKeypoint(0, 0), new NumberSequenceKeypoint(1, 1)])
				}
			/>
			<TopLeft />
			{/* close */}
			<IconButton
				Position={new UDim2(1, -32, 0, 0)}
				Clicked={Kill}
				Image="rbxassetid://3926305904"
				ImageRectOffset={new Vector2(284, 4)}
				ImageRectSize={new Vector2(24, 24)}
			/>
		</frame>
	) : (
		<></>
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
