import Roact from "@rbxts/roact"
import Object from "@rbxts/object-utils"
import { withHooks, useContext, useEffect, useState } from "@rbxts/roact-hooked"
import tags_of, { Tags } from "./tags"
import { merge, Plugins } from "util"
import Placeholder from "components/Placeholder"
import useColor from "hooks/useColor"
import TagList from "./TagList"

const Actions = withHooks(({ player }: { player: Player }) => {
	const plugins = useContext(Plugins)
	const accent = useColor("accent")
	const white = useColor("fg")

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
			{Object.entries(merge(plugins.mapFiltered(plugin => plugin.Actions))).map(
				([name, action]) => (
					<textbutton
						Key={name}
						Size={new UDim2(0, 0, 0, 32)}
						AutomaticSize="X"
						TextSize={11}
						BackgroundColor3={accent}
						BorderSizePixel={0}
						BackgroundTransparency={0}
						FontFace={new Font("rbxasset://fonts/families/Ubuntu.json")}
						TextColor3={white}
						Visible={action.enabled?.() ?? true}
						Text={action.display || `${name.sub(1, 1).upper()}${name.sub(2)}`}
						Event={{
							Activated: () => action.execute(player),
						}}>
						<uicorner CornerRadius={new UDim(0, 4)} />
						<uipadding
							PaddingLeft={new UDim(0, 6)}
							PaddingRight={new UDim(0, 6)}
							PaddingTop={new UDim(0, 11)}
							PaddingBottom={new UDim(0, 11)}
						/>
					</textbutton>
				)
			)}
		</scrollingframe>
	)
})

export = withHooks(({ selected }: { selected?: Player }) => {
	if (!selected) {
		return (
			<frame
				Position={UDim2.fromOffset(300, 0)}
				Size={new UDim2(0, 400, 1, 0)}
				BackgroundTransparency={1}
				BorderSizePixel={0}>
				<Placeholder Text="No player selected" />
			</frame>
		)
	}
	const plugins = useContext(Plugins)
	const white = useColor("fg")
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
			Size={new UDim2(0, 400, 1, 0)}
			Position={UDim2.fromOffset(300, 0)}
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
				FontFace={
					new Font("rbxasset://fonts/families/Ubuntu.json", Enum.FontWeight.ExtraBold)
				}
				TextSize={15}
				TextXAlignment="Left"
				Size={UDim2.fromScale(1, 0)}
				AutomaticSize="Y"
				BackgroundTransparency={1}
				BorderSizePixel={0}
				TextColor3={white}
			/>
			<TagList tags={tags} />
			<Actions player={selected} />
		</scrollingframe>
	)
})
