import Roact from "@rbxts/roact"
import { pure, useEffect, useState } from "@rbxts/roact-hooked"
import { GRAY, WHITE } from "colors"
import TagList from "./TagList"
import tags_of, { Tags } from "./tags"

/*
/------------------------------\
|         |        Name        |
|         |   AKA displayname  |
|         |--------------------|
|         |                    |
|         |                    |
|         |                    |
|         |                    |
|         |                    |
|         |                    |
\------------------------------/
					↑
that part of mollybdos
*/
export = pure(({ selected }: { selected: Player | void }) => {
	if (!selected) {
		return (
			<frame Size={UDim2.fromScale(0.6, 1)} BackgroundTransparency={1} BorderSizePixel={0}>
				<textlabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Text="No player selected"
					TextColor3={GRAY[3]}
					Font="Arial"
					TextSize={11}
					AutomaticSize="XY"
					BackgroundTransparency={1}
				/>
			</frame>
		)
	}
	const [tags, setTags] = useState<Tags>([])
	useEffect(() => {
		setTags([])
		if (selected) {
			const promise = tags_of(selected).then(setTags)
			return () => promise.cancel()
		}
	}, [selected])
	return (
		<scrollingframe
			Size={UDim2.fromScale(0.6, 1)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			ClipsDescendants
			ScrollBarThickness={5}
			AutomaticCanvasSize="Y"
			CanvasSize={UDim2.fromScale(0, 1)}
		>
			<uipadding PaddingTop={new UDim(0, 5)} />
			<uilistlayout />
			<textlabel
				Text={selected.Name}
				Font="GothamBlack"
				TextSize={15}
				Size={UDim2.fromScale(1, 0)}
				AutomaticSize="Y"
				BackgroundTransparency={1}
				BorderSizePixel={0}
				TextColor3={WHITE}
			/>
			{selected.Name !== selected.DisplayName ? (
				<textlabel
					Text={`aka ${selected.DisplayName}`}
					Font="GothamBlack"
					TextSize={11}
					Size={UDim2.fromScale(1, 0)}
					AutomaticSize="Y"
					BackgroundTransparency={1}
					BorderSizePixel={0}
					TextColor3={GRAY[2]}
				/>
			) : (
				<></>
			)}
			<TagList tags={tags} />
		</scrollingframe>
	)
})
