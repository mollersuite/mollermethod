/// <reference types="@rbxts/types/plugin" />
import Roact from '@rbxts/roact'
import { BLACK } from 'colors'

/**
 * as close to IconButton from fluent-svelte as possible
 **/
export = ({
	Clicked = () => {},
	Position,
	ImageRectOffset,
	ImageRectSize,
	Image,
}: Partial<InstanceProperties<ImageLabel>> & {
	Clicked?: () => void
	Position?: UDim2
}) => {
	return (
		<textbutton
			Size={UDim2.fromOffset(32, 32)}
			Text=""
			BackgroundColor3={BLACK}
			Position={Position}
			Event={{
				Activated: Clicked
			}}>
			<uilistlayout HorizontalAlignment="Center" VerticalAlignment="Center" />
			<imagelabel
				ImageRectOffset={ImageRectOffset}
				ImageRectSize={ImageRectSize}
				Image={Image}
				Size={UDim2.fromOffset(16, 16)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScaleType="Fit"
			/>
			<uicorner CornerRadius={new UDim(0, 4)} />
		</textbutton>
	)
}
