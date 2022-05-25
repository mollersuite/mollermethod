import Roact from "@rbxts/roact"
import { pure, useContext } from "@rbxts/roact-hooked"
import { Players, TeleportService, Workspace } from "@rbxts/services"
import Page from "components/Page"
import mollerpotence from "mollerpotence"
import { Colors, join_code } from "util"

const IconButton = pure<
	Partial<Pick<ImageLabel, "Image" | "ImageRectSize" | "ImageRectOffset" | "Position">> & {
		Clicked?: Roact.JsxInstanceEvents<TextButton>["Activated"]
		CornerRadius?: UDim
	}
>(Props => {
	const [colors] = useContext(Colors)
	return (
		<textbutton
			Size={UDim2.fromOffset(32, 32)}
			Text=""
			BackgroundColor3={colors.map(colors => colors.BLACK)}
			Position={Props.Position}
			Event={{
				Activated: Props.Clicked,
			}}>
			<uilistlayout HorizontalAlignment="Center" VerticalAlignment="Center" />
			<imagelabel
				ImageRectOffset={Props.ImageRectOffset}
				ImageRectSize={Props.ImageRectSize}
				Image={Props.Image}
				Size={UDim2.fromOffset(16, 16)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScaleType="Fit"
				ImageColor3={colors.map(colors => colors.WHITE)}
			/>
			<uicorner CornerRadius={Props.CornerRadius ?? new UDim(0, 4)} />
		</textbutton>
	)
})

export = pure(() => {
	const [colors] = useContext(Colors)
	return (
		<Page>
			<uipadding
				PaddingLeft={new UDim(0, 16)}
				PaddingRight={new UDim(0, 16)}
				PaddingTop={new UDim(0, 16)}
				PaddingBottom={new UDim(0, 16)}
			/>
			<uilistlayout VerticalAlignment="Top" Padding={new UDim(0, 10)} />

			{/* Introduction */}
			<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 0, 50)}>
				<uilistlayout
					FillDirection="Horizontal"
					VerticalAlignment="Center"
					Padding={new UDim(0, 10)}
				/>
				<imagelabel
					Image={
						Players.GetUserThumbnailAsync(
							Players.LocalPlayer?.UserId ?? 2326492785,
							Enum.ThumbnailType.HeadShot,
							Enum.ThumbnailSize.Size48x48
						)[0]
					}
					Size={UDim2.fromOffset(48, 48)}
					BackgroundTransparency={1}>
					<uicorner CornerRadius={new UDim(1)} />
				</imagelabel>
				<textlabel
					Text={Players.LocalPlayer?.DisplayName ?? "moller"}
					TextColor3={colors.map(colors => colors.WHITE)}
					Font={Enum.Font.GothamBlack}
					TextSize={24}
					AutomaticSize="X"
					BackgroundTransparency={1}
					Size={UDim2.fromScale(0, 1)}
				/>
			</frame>

			{/* Buttons */}
			<frame Size={UDim2.fromScale(1, 0)} AutomaticSize="Y" BackgroundTransparency={1}>
				<uilistlayout FillDirection="Horizontal" VerticalAlignment="Center" />
				<IconButton
					Image="rbxassetid://9380799867"
					Clicked={() => {
						if (mollerpotence.remote) {
							mollerpotence.remote.InvokeServer("respawn")
						} else {
							const char = Players.LocalPlayer.Character
							char?.FindFirstChildOfClass("Humanoid")?.ChangeState("Dead")
							char?.ClearAllChildren()
							const newchar = new Instance("Model", Workspace)
							Players.LocalPlayer.Character = newchar
							task.wait()
							Players.LocalPlayer.Character = char
							newchar.Destroy()
						}
					}}
				/>

				<IconButton
					Image="rbxassetid://9380809978"
					Clicked={() => {
						if (Players.GetPlayers().size() === 1) {
							Players.LocalPlayer.Kick("Rejoining...")
							task.wait() // not sure if this is needed but IY does it
							TeleportService.Teleport(game.PlaceId)
						} else TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId)
					}}
				/>

				<IconButton
					Image="rbxassetid://9377140521"
					Clicked={() => join_code().then(setclipboard ?? print)}
				/>
			</frame>
		</Page>
	)
})
