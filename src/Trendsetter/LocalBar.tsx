import Roact from "@rbxts/roact"
import { pure } from "@rbxts/roact-hooked"
import { BLACK } from "colors"
import IconButton from "./IconButton"
import { respawn, rejoin } from "Bracket/commands"

/*
/------------------\  
|██████████████████|  <- that part of trendsetter
\------------------/ 
/------------------------------\
|         |                    |
|         |--------------------|
|         |                    |
|         |                    |
|         |                    |
|         |                    |
|         |                    |
|         |                    |
|         |                    |
\------------------------------/
*/

export = pure(() => (
	<frame
		Position={UDim2.fromOffset(10, 10)}
		Size={UDim2.fromOffset(300, 64)}
		BackgroundColor3={BLACK}
		BorderSizePixel={0}>
		<uicorner CornerRadius={new UDim(0, 16)} />
		<uilistlayout FillDirection="Horizontal" VerticalAlignment="Center" />
		<uipadding
			PaddingLeft={new UDim(0, 16)}
			PaddingRight={new UDim(0, 16)}
			PaddingTop={new UDim(0, 16)}
			PaddingBottom={new UDim(0, 16)}
		/>
		{/* respawn */}
		<IconButton
			Image="rbxassetid://3926307971"
			ImageRectOffset={new Vector2(404, 84)}
			ImageRectSize={new Vector2(36, 36)}
			Clicked={() => respawn.execute([])}
		/>
		{/* rejoin */}
		<IconButton
			Image="rbxassetid://3926307971"
			ImageRectOffset={new Vector2(244, 484)}
			ImageRectSize={new Vector2(36, 36)}
			Clicked={() => rejoin.execute([])}
		/>
	</frame>
))
