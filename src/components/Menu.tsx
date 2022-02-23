/// <reference types="@rbxts/types/plugin" />
import Roact from '@rbxts/roact'
import Hooks from '@rbxts/roact-hooks'
import { GuiService } from '@rbxts/services'

const Menu: Hooks.FC = (_, { useState, useEffect }) => {
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

export = new Hooks(Roact)(Menu)
