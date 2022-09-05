import Roact from "@rbxts/roact"
import Page from "components/Page"
import Placeholder from "components/Placeholder"

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
			Image="rbxassetid://10694413123"
			Size={UDim2.fromOffset(50, 50)}
			ScaleType="Fit"
			BackgroundTransparency={1}
		/>
		<Placeholder Text={`Catay ${PKG_VERSION}`} />
		<Placeholder Text="Designed by Etcetera in the United States, United Kingdom, and Chile" />
		<Placeholder
			Text={`Made with roblox-ts, @rbxts/roact,\n@rbxts/roact-hooked, @rbxts/roact-hooked-plus,\n@rbxts/flipper, @rbxts/object-utils,\n@rbxts/snapdragon, @rbxts/services,\n@rbxts/types, @rbxts/compiler-types, and @rbxts/hax`}
		/>
	</Page>
)
