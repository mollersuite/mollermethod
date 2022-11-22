import Roact from "@rbxts/roact"
import { useEffect, withHooksPure } from "@rbxts/roact-hooked"
import { RunService } from "@rbxts/services"
import useColor from "hooks/useColor"

export = withHooksPure(() => {
	useEffect(() => {
		RunService.Set3dRenderingEnabled(false)
		return () => RunService.Set3dRenderingEnabled(true)
	}, [])

	return (
		<frame
			Size={UDim2.fromScale(1, 1)}
			BorderSizePixel={0}
			BackgroundColor3={useColor("content_bg")}>
			<textlabel
				Text="AFK"
				FontFace={
					new Font("rbxasset://fonts/families/Ubuntu.json", Enum.FontWeight.ExtraBold)
				}
				TextColor3={useColor("fg")}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(50, 50)}
				AutomaticSize="XY"
				TextSize={100}
			/>
			<textlabel
				Text="have fun autofarming i guess"
				FontFace={
					new Font("rbxasset://fonts/families/Ubuntu.json", Enum.FontWeight.Regular)
				}
				TextColor3={useColor("fg")}
				BackgroundTransparency={1}
				Position={UDim2.fromOffset(50, 150)}
				AutomaticSize="XY"
				TextSize={20}
			/>
		</frame>
	)
})
