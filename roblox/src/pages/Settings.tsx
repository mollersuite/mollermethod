import Object from "@rbxts/object-utils"
import Roact from "@rbxts/roact"
import { pure, useContext, useEffect, useState } from "@rbxts/roact-hooked"
import { HttpService } from "@rbxts/services"
import { Colors, vol } from "util"
import Page from "../components/Page"

export = pure(() => {
	const [colors, setColors] = useContext(Colors)

	useEffect(() => {
		const file = HttpService.JSONDecode(readfile("mollermethod.json")) as {
			config: {
				bracket_toggle?: Enum.KeyCode
				debug?: boolean
				volume?: number
				theme?: {
					accent: string
					background: string
					foreground: string
				}
			}
		}
		
		return () => {
			Object.assign(file.config, {
				volume: vol(),
				theme: {
					accent: colors.getValue().ACCENT.ToHex(),
					background: colors.getValue().BLACK.ToHex(),
					foreground: colors.getValue().WHITE.ToHex(),
				},
			})
			writefile("mollermethod.json", HttpService.JSONEncode(file))
		}
	}, [])

	return (
		<Page>
			<uilistlayout
				HorizontalAlignment="Center"
				VerticalAlignment="Top"
				Padding={new UDim(0, 10)}
			/>
			<frame
				Size={new UDim2(1, 0, 0, 10)}
				BorderSizePixel={0}
				BackgroundColor3={colors.map(colors => colors.ACCENT)}>
				<uicorner CornerRadius={new UDim(0, 10)} />
			</frame>
			<textbutton
				Text="Toggle Light Theme"
				Size={new UDim2(1, 0, 0, 25)}
				Font="Ubuntu"
				BorderSizePixel={0}
				TextSize={20}
				TextXAlignment="Left"
				BackgroundColor3={colors.map(colors => colors.BLACK)}
				TextColor3={colors.map(colors => colors.WHITE)}
				Event={{
					Activated: () =>
						setColors({
							...colors.getValue(),
							BLACK: colors.getValue().WHITE,
							WHITE: colors.getValue().BLACK,
						}),
				}}>
				<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			</textbutton>
			<textbox
				Font="RobotoMono"
				PlaceholderText="Volume"
				TextXAlignment="Left"
				TextSize={20}
				BorderSizePixel={0}
				Size={new UDim2(1, 0, 0, 20)}
				BackgroundColor3={colors.map(colors => colors.BLACK)}
				TextColor3={colors.map(colors => colors.WHITE)}
				Text={tostring(vol())}
				ClearTextOnFocus={false}
				Change={{
					Text: rbx => vol(tonumber(rbx.Text) ?? vol()),
				}}>
				<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
				<textlabel
					BackgroundTransparency={1}
					TextTransparency={0.5}
					TextColor3={colors.map(colors => colors.WHITE)}
					TextSize={15}
					Text="Volume"
					TextXAlignment="Right"
					Size={UDim2.fromScale(1, 1)}
				/>
			</textbox>
		</Page>
	)
})
