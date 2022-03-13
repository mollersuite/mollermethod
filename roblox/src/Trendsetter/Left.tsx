import Roact from "@rbxts/roact"
import { rejoin, respawn } from "Bracket/commands"
import { ACCENT, BLACK, WHITE } from "colors"
import Mollybdos from "Mollybdos"
import { $env } from "rbxts-transform-env"
import { QUOTES } from "strings"
import { Kill, random } from "util"

const IconButton = (
	Props: Partial<Pick<ImageLabel, "Image" | "ImageRectSize" | "ImageRectOffset" | "Position">> & {
		Clicked?: Roact.JsxInstanceEvents<TextButton>["Activated"]
		CornerRadius?: UDim
	}
) => (
	<textbutton
		Size={UDim2.fromOffset(32, 32)}
		Text=""
		BackgroundColor3={BLACK}
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
		/>
		<uicorner CornerRadius={Props.CornerRadius ?? new UDim(0, 4)} />
	</textbutton>
)

const LocalBar = () => (
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
)

/**
 * the top left corner has a couple widgets, like the playerlist, changelog, and localplayer buttons
 **/
export = () => (
	<>
		<LocalBar />
		<Kill.Consumer
			render={kill => (
				<IconButton
					CornerRadius={new UDim(1)}
					Position={UDim2.fromOffset(320, 42)}
					Clicked={kill}
					Image="rbxassetid://3926305904"
					ImageRectOffset={new Vector2(284, 4)}
					ImageRectSize={new Vector2(24, 24)}
				/>
			)}
		/>
		<textlabel
			Position={UDim2.fromOffset(320, 10)}
			Size={UDim2.fromOffset(90, 22)}
			BackgroundColor3={ACCENT}
			TextSize={14}
			Font="RobotoCondensed"
			AutomaticSize="X"
			TextColor3={WHITE}
			Text={$env("CF_PAGES") === "1" ? `v${PKG_VERSION}` : "dev"}
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 16)} />
		</textlabel>
		<Mollybdos />

		<textbutton
			Position={UDim2.fromOffset(10, 84 + 300 + 10)}
			Size={UDim2.fromOffset(400, 100)}
			TextSize={14}
			Font="Arial"
			BackgroundColor3={ACCENT}
			TextColor3={WHITE}
			Text={random(QUOTES).split(" - ").join("\n- ")}
			Event={{
				MouseButton1Click: rbx => {
					rbx.Text = random(QUOTES).split(" - ").join("\n- ")
				},
			}}
			TextWrapped
			BorderSizePixel={0}>
			<uicorner CornerRadius={new UDim(0, 16)} />
		</textbutton>
	</>
)
