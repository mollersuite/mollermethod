import Roact from "@rbxts/roact"
import Page from "components/Page"
import Placeholder from "components/Placeholder"
import { enabled as mollerpotence } from "mollerpotence"

export = () => (
	<Page>
		<uilistlayout
			HorizontalAlignment="Center"
			VerticalAlignment="Top"
			Padding={new UDim(0, 10)}
		/>
		<uipadding PaddingTop={new UDim(0, 20)} />
		<imagebutton
			LayoutOrder={1}
			Image="rbxassetid://11183425047"
			Size={UDim2.fromOffset(50, 50)}
			ScaleType="Fit"
			BackgroundTransparency={1}
		/>
		<Placeholder
			Text={mollerpotence.map(
				mollerpotence =>
					`mollermethod ${PKG_VERSION}${mollerpotence ? " with mollerpotence" : ""}`
			)}
		/>
		<Placeholder Text="Designed by Etcetera in the United States, United Kingdom, and Chile" />
		<Placeholder
			Text={`Made with roblox-ts, @rbxts/roact,\n@rbxts/roact-hooked, @rbxts/roact-hooked-plus,\n@rbxts/flipper, @rbxts/object-utils,\n@rbxts/snapdragon, @rbxts/services,\n@rbxts/types, @rbxts/compiler-types, and @rbxts/hax`}
		/>
	</Page>
)
