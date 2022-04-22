import Roact from "@rbxts/roact"
import Object from "@rbxts/object-utils"
import { hooked, useContext, useEffect, useState } from "@rbxts/roact-hooked"
import colors from "colors"
import tags_of, { Tags } from "./tags"
import { merge, Plugins } from "util"

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

const TagList = hooked(({ tags }: { tags: Tags }) => {
	if (tags.filter(tag => tag.score !== 0).isEmpty()) return <></>
	return (
		<scrollingframe
			AutomaticCanvasSize="X"
			BackgroundTransparency={1}
			Size={new UDim2(1, 0, 0, 30)}
			CanvasSize={UDim2.fromScale(0, 0)}
			ScrollBarThickness={1}
			BorderSizePixel={0}>
			<uipadding PaddingLeft={new UDim(0, 5)} PaddingRight={new UDim(0, 5)} />
			<uilistlayout
				FillDirection="Horizontal"
				SortOrder="LayoutOrder"
				VerticalAlignment="Center"
				Padding={new UDim(0, 5)}
			/>
			{tags
				.filter(tag => tag.score !== 0)
				.map(tag => (
					<textlabel
						LayoutOrder={-tag.score}
						Text={`${tag.name}${tag.score > 1 ? ` (${tag.score})` : ""}`}
						Font="Gotham"
						TextSize={11}
						Size={new UDim2(0, 0, 0, 22)}
						AutomaticSize="X"
						BorderSizePixel={0}
						TextColor3={colors.WHITE}
						BackgroundColor3={colors.ACCENT}>
						<uicorner CornerRadius={new UDim(0, 16)} />
						<uipadding PaddingLeft={new UDim(0, 16)} PaddingRight={new UDim(0, 16)} />
					</textlabel>
				))}
		</scrollingframe>
	)
})

const Actions = hooked(({ player }: { player: Player }) => {
	const plugins = useContext(Plugins)

	return (
		<frame BackgroundTransparency={1} AutomaticSize="Y" Size={UDim2.fromScale(1, 0)}>
			<uilistlayout FillDirection="Vertical" SortOrder="Name" />
			{Object.entries(merge(plugins.mapFiltered(plugin => plugin.Actions))).map(
				([name, action]) => (
					<textbutton
						Key={name}
						Size={new UDim2(1, 0, 0, 25)}
						TextSize={11}
						BackgroundColor3={colors.BLACK}
						BorderSizePixel={0}
						BackgroundTransparency={0}
						Font="GothamBold"
						TextColor3={colors.WHITE}
						Visible={action.enabled?.() ?? true}
						Text={action.display || `${name.sub(1, 1).upper()}${name.sub(2)}`}
						Event={{
							Activated: () => action.execute(player),
						}}
					/>
				)
			)}
		</frame>
	)
})

export = hooked(({ selected }: { selected?: Player }) => {
	if (!selected) {
		return (
			<frame Size={new UDim2(1, 0, 1, -50)} BackgroundTransparency={1} BorderSizePixel={0}>
				<textlabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Text="No player selected"
					TextColor3={colors.WHITE}
					TextTransparency={0.5}
					Font="Arial"
					TextSize={11}
					AutomaticSize="XY"
					BackgroundTransparency={1}
				/>
			</frame>
		)
	}
	const plugins = useContext(Plugins)
	const [tags, setTags] = useState<Tags>([])
	useEffect(() => {
		setTags([])
		if (selected) {
			const promise = tags_of(selected, plugins).then(setTags)
			return () => promise.cancel()
		}
	}, [selected])
	return (
		<scrollingframe
			Size={new UDim2(1, 0, 1, -50)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			ClipsDescendants
			ScrollBarThickness={5}
			AutomaticCanvasSize="Y"
			CanvasSize={UDim2.fromScale(0, 1)}>
			<uipadding PaddingTop={new UDim(0, 5)} />
			<uilistlayout />
			<textlabel
				Text={selected.DisplayName}
				Font="GothamBlack"
				TextSize={15}
				Size={UDim2.fromScale(1, 0)}
				AutomaticSize="Y"
				BackgroundTransparency={1}
				BorderSizePixel={0}
				TextColor3={colors.WHITE}
			/>
			{selected.Name !== selected.DisplayName ? (
				<textlabel
					Text={`(@${selected.Name})`}
					Font="GothamBlack"
					TextSize={11}
					Size={UDim2.fromScale(1, 0)}
					AutomaticSize="Y"
					BackgroundTransparency={1}
					BorderSizePixel={0}
					TextColor3={colors.GRAY[2]}
				/>
			) : undefined}
			<TagList tags={tags} />
			<Actions player={selected} />
		</scrollingframe>
	)
})
