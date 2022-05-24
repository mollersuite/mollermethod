import Roact from "@rbxts/roact"
import { pure, useBinding, useContext, useEffect, useState } from "@rbxts/roact-hooked"
import { HttpService } from "@rbxts/services"
import { Colors } from "util"
import Page from "./Page"
import Placeholder from "./Placeholder"
const req = syn?.request ?? request

export = pure(() => {
	const [scripts, setScripts] = useState<
		{
			id: string
			name: string
			description: string
		}[]
	>([])
	const [query, setQuery] = useState("")
	const [colors] = useContext(Colors)
	const [focused, setFocused] = useBinding(false)

	useEffect(() => {
		const res = req({
			Url:
				"https://zngvnlwfhxhjjqnutxfp.supabase.co/rest/v1/scripts?select=id%2Cname%2Cdescription&name=wfts%28english%29." +
				HttpService.UrlEncode(query),
			Method: "GET",
			Headers: {
				accept: "*/*",
				"accept-language": "en-US,en;q=0.9",
				"accept-profile": "public",
				apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzQzNjgxMiwiZXhwIjoxOTQzMDEyODEyfQ.qQE4GAauCEAGjF3Bbs2i49wprduYGqDAsdri6ccF6CM",
				authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzQzNjgxMiwiZXhwIjoxOTQzMDEyODEyfQ.qQE4GAauCEAGjF3Bbs2i49wprduYGqDAsdri6ccF6CM",
				"cache-control": "no-cache",
				pragma: "no-cache",
				"sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="101", "Microsoft Edge";v="101"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"Windows"',
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "cross-site",
				"x-client-info": "supabase-js/1.28.0",
				Referer: "https://luau.ml/",
				"Referrer-Policy": "strict-origin-when-cross-origin",
			},
		})
		setScripts(HttpService.JSONDecode(res.Body) as any[])
	}, [query])
	return (
		<Page>
			<textbox
				Text={query}
				ClearTextOnFocus={false}
				Event={{
					FocusLost: (rbx, enter) => {
						setFocused(false)
						if (enter) {
							setQuery(rbx.Text)
						}
					},
					Focused: () => setFocused(true),
				}}
				Font="RobotoMono"
				TextSize={20}
				TextColor3={colors.map(colors => colors.WHITE)}
				PlaceholderText="Search for scripts"
				PlaceholderColor3={colors.map(colors => colors.ACCENT)}
				BackgroundColor3={colors.map(colors => colors.WHITE)}
				BackgroundTransparency={focused.map(focused => (focused ? 0.5 : 1))}
				TextXAlignment="Left"
				BorderSizePixel={0}
				TextWrapped
				Size={new UDim2(1, 0, 0, 30)}>
				<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
			</textbox>
			{scripts.isEmpty() ? (
				<Placeholder Text="Loading..." />
			) : (
				<>
					<uilistlayout
						FillDirection="Vertical"
						HorizontalAlignment="Left"
						VerticalAlignment="Top"
						SortOrder="LayoutOrder"
					/>
					{scripts.map(scr => (
						<textbutton
							Text={scr.name}
							AutomaticSize="Y"
							BackgroundColor3={colors.map(colors => colors.BLACK)}
							BorderSizePixel={0}
							TextColor3={colors.map(colors => colors.WHITE)}
							TextSize={20}
							Key={scr.name}
							TextXAlignment="Center"
							TextYAlignment="Center"
							Size={UDim2.fromScale(1, 0)}
							Font="Gotham"
							Event={{
								Activated: () => {
									const [source] = game.HttpGetAsync(
										`https://luau.ml/script/${scr.id}`
									)
									const [run, err] = loadstring(source, scr.name)
									assert(run, err)
									run()
								},
							}}
						/>
					))}
				</>
			)}
		</Page>
	)
})
