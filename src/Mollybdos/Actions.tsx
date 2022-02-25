import Roact from "@rbxts/roact"
import { pure } from "@rbxts/roact-hooked"
import * as actions from "actions"
import { BLACK, WHITE } from "colors"

const actions_list: [string, actions.Action][] = []
for (const [name, action] of pairs(actions)) {
	actions_list.push([name, action])
}

export = pure(({ player }: { player: Player }) => {
	return (
		<frame BackgroundTransparency={1} AutomaticSize="Y" Size={UDim2.fromScale(1, 0)}>
			<uilistlayout FillDirection="Vertical" SortOrder="Name" />
			{actions_list.map(([name, action]) => (
				<textbutton
					Key={name}
					Size={new UDim2(1, 0, 0, 25)}
					TextSize={11}
					BackgroundColor3={BLACK}
					BorderSizePixel={0}
					BackgroundTransparency={0}
					Font="GothamBold"
					TextColor3={WHITE}
					Visible={action.enabled?.() ?? true}
					Text={action.display || `${name.sub(1, 1).upper()}${name.sub(2)}`}
					Event={{
						Activated: () => action.execute(player),
					}}
				/>
			))}
		</frame>
	)
})
