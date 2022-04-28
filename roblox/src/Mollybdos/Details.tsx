import Roact from "@rbxts/roact"
import { hooked, useContext, useEffect, useState } from "@rbxts/roact-hooked"
import colors from "colors"
import tags_of, { Tags } from "./tags"
import { flat, is_action, Plugins } from "util"
import Placeholder from "components/Placeholder"
import Object from "@rbxts/object-utils"

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
	if (tags.filter(tag => tag.score !== 0).isEmpty())
		return (
			<frame BackgroundTransparency={1} BorderSizePixel={0} Size={UDim2.fromOffset(0, 15)} />
		)
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
						Font="GothamBold"
						TextSize={10}
						Size={new UDim2(0, 0, 0, 15)}
						AutomaticSize="X"
						BorderSizePixel={0}
						BackgroundTransparency={0.5}
						TextColor3={colors.WHITE}
						BackgroundColor3={colors.ACCENT}>
						<uicorner CornerRadius={new UDim(0, 16)} />
						<uipadding PaddingLeft={new UDim(0, 8)} PaddingRight={new UDim(0, 8)} />
					</textlabel>
				))}
		</scrollingframe>
	)
})

const Actions = hooked(({ player }: { player: Player }) => {
	const plugins = useContext(Plugins)

	return (
		<scrollingframe
			AutomaticCanvasSize="X"
			BackgroundTransparency={1}
			Size={new UDim2(1, 0, 0, 30)}
			CanvasSize={UDim2.fromScale(0, 0)}
			ScrollBarThickness={1}
			BorderSizePixel={0}>
			<uilistlayout
				FillDirection="Horizontal"
				SortOrder="LayoutOrder"
				VerticalAlignment="Center"
				Padding={new UDim(0, 5)}
			/>
			{flat(plugins.mapFiltered(plugin => plugin.Exports)).filter(is_action).map(exp => (
				<textbutton
					Key={exp.Name}
					Size={new UDim2(0, 0, 0, 32)}
					AutomaticSize="X"
					TextSize={11}
					BackgroundColor3={colors.ACCENT}
					BorderSizePixel={0}
					BackgroundTransparency={0}
					Font="Gotham"
					TextColor3={colors.WHITE}
					Visible={exp.Enabled?.() ?? true}
					Text={exp.DisplayName || `${exp.Name.sub(1, 1).upper()}${exp.Name.sub(2)}`}
					Event={{
						Activated: () => {
							exp.Run({
								[Object.keys(exp.Arguments)[0]]: [player]
							})
						},
					}}>
					<uicorner CornerRadius={new UDim(0, 4)} />
					<uipadding
						PaddingLeft={new UDim(0, 6)}
						PaddingRight={new UDim(0, 6)}
						PaddingTop={new UDim(0, 11)}
						PaddingBottom={new UDim(0, 11)}
					/>
				</textbutton>
			))}
		</scrollingframe>
	)
})

export = hooked(({ selected }: { selected?: Player }) => {
	if (!selected) {
		return (
			<frame Size={new UDim2(0, 660, 1, 0)} BackgroundTransparency={1} BorderSizePixel={0}>
				<Placeholder Text="No player selected" />
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
			Size={new UDim2(0, 660, 1, 0)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			ClipsDescendants
			ScrollBarThickness={5}
			AutomaticCanvasSize="Y"
			CanvasSize={UDim2.fromScale(0, 1)}>
			<uipadding
				PaddingTop={new UDim(0, 16)}
				PaddingBottom={new UDim(0, 16)}
				PaddingLeft={new UDim(0, 16)}
				PaddingRight={new UDim(0, 16)}
			/>
			<uilistlayout />
			<textlabel
				Text={
					selected.Name !== selected.DisplayName
						? `${selected.DisplayName} (@${selected.Name})`
						: selected.Name
				}
				Font="GothamBlack"
				TextSize={15}
				TextXAlignment="Left"
				Size={UDim2.fromScale(1, 0)}
				AutomaticSize="Y"
				BackgroundTransparency={1}
				BorderSizePixel={0}
				TextColor3={colors.WHITE}
			/>
			<TagList tags={tags} />
			<Actions player={selected} />
		</scrollingframe>
	)
})
