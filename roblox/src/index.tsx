import { Debris, HttpService, RunService, TweenService, UserInputService } from "@rbxts/services"
import { Kill, play, random, Plugins, set_volume, asset } from "util"
import { QUOTES } from "strings"
import Roact from "@rbxts/roact"
import Bracket from "Bracket"
import BracketExternal from "Bracket/external"
import Notification from "Notification"
import Trendsetter from "Trendsetter"
import Snapdragon from "@rbxts/snapdragon"
import iy_to_bracket from "Bracket/iy"
import colors from "colors"
import AdminBail from "bail"

import type { Plugin } from "types"
import type { IYConfig } from "Bracket/iy/types"
import Expletive from "Trendsetter/Expletive"
declare const script: ModuleScript & {
	plugins: Folder
}

/**
 * @see https://mthd.ml
 * @name mollermethod
 * @description Scripting, unleashed.
 * @author Jack W.
 * @example
 * ```lua
 * loadstring (game:HttpGet "mthd.ml") {
 *
 * }
 * ```
 */
export = async function ({
	gui: GUI,
	bracket_external,
	bracket_toggle,
	debug,
	plugins: plugin_sources = [],
	theme,
	volume = 5,
}: {
	debug?: true
	gui: ScreenGui
	bracket_toggle?: Enum.KeyCode
	bracket_external?: boolean
	plugins?: string[]
	theme?: {
		background: string
		foreground: string
		accent: string
	}
	volume?: number
}) {
	debug && warn(`starting init`)
	if (theme) {
		colors.ACCENT = Color3.fromHex(theme.accent)
		colors.WHITE = Color3.fromHex(theme.foreground)
		colors.BLACK = Color3.fromHex(theme.background)
	}
	set_volume(volume)
	// @ts-expect-error
	if (getcustomasset ?? getsynasset) {
		task.defer(() => {
			if (isfile("mollermethod_Blog-Sound-1.ogg")) {
				play((getcustomasset ?? getsynasset)("mollermethod_Blog-Sound-1.ogg"))
			} else {
				play(asset("https://ubuntu.com/wp-content/uploads/2012/02/Blog-Sound-1.ogg"))
			}
		})
	} else {
		play("rbxassetid://9344041257")
	}

	const plugins: Plugin[] = []
	const notif_holder = (() => {
		const notifications = new Instance("Frame", GUI)
		notifications.Name = "notifications"
		notifications.AnchorPoint = new Vector2(1, 0)
		notifications.BackgroundColor3 = Color3.fromHex("#FFFFFF")
		notifications.BackgroundTransparency = 1
		notifications.Position = UDim2.fromScale(1, 0)
		notifications.Size = UDim2.fromScale(1, 1)

		const uIPadding = new Instance("UIPadding")
		uIPadding.Name = "uIPadding"
		uIPadding.PaddingBottom = new UDim(0, 15)
		uIPadding.PaddingRight = new UDim(0, 15)
		uIPadding.Parent = notifications

		const uIListLayout = new Instance("UIListLayout")
		uIListLayout.Name = "uIListLayout"
		uIListLayout.Padding = new UDim(0, 10)
		uIListLayout.HorizontalAlignment = Enum.HorizontalAlignment.Right
		uIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
		uIListLayout.VerticalAlignment = Enum.VerticalAlignment.Bottom
		uIListLayout.Parent = notifications
		return notifications
	})()


	debug && warn(`loading ${plugin_sources.size()} plugins from settings`)
	await Promise.allSettled(
		plugin_sources.map(async source => {
			const [plugin, err] = loadstring(source)
			assert(plugin, err)

			plugins.push(
				plugin({
					notify: (
						name: string,
						description: string,
						icon: "Error" | "Info" | "Success" | "Warning",
						duration: number,
						callback?: Callback
					) =>
						Notification.new(name, description, icon, duration, notif_holder, callback),
					GUI,
					colors,
					Snapdragon,
				})
			)
		})
	)

	debug && warn(`loading default plugins`)
	await Promise.allSettled(
		script.plugins.GetDescendants().map(async module => {
			if (module.IsA("ModuleScript")) {
				const plugin = require(module) as (opts: any) => Plugin
				plugins.push(
					plugin({
						notify: (
							name: string,
							description: string,
							icon: "Error" | "Info" | "Success" | "Warning",
							duration: number,
							callback?: Callback
						) =>
							Notification.new(
								name,
								description,
								icon,
								duration,
								notif_holder,
								callback
							),
						GUI,
						colors,
						Snapdragon,
					})
				)
			} else return
		})
	)

	// Load IY plugins
	if (isfile?.("IY_FE.iy")) {
		debug && warn(`loading iy plugins`)
		const config = HttpService.JSONDecode(readfile("IY_FE.iy")) as IYConfig
		await Promise.allSettled(
			config.PluginsTable.map(async plugin_path =>
				iy_to_bracket(readfile(plugin_path), notif_holder, plugins)
			)
		)
	}

	debug && warn(`starting UI`)
	const tree = Roact.mount(
		<>
			{/* UIs */}
			<Plugins.Provider value={plugins}>
				<Kill.Provider
					value={() => {
						Roact.unmount(tree)
						GUI.Destroy()
					}}>
					{bracket_external ? (
						<BracketExternal />
					) : (
						<Bracket
							Key="Bracket"
							button={bracket_toggle ?? Enum.KeyCode.LeftBracket}
						/>
					)}
					<Trendsetter Key="Menu" />
					<Expletive Key="Taskbar" />
				</Kill.Provider>
			</Plugins.Provider>
			{/* Services */}
			<AdminBail container={notif_holder} />
		</>,
		GUI
	)
	debug && warn(`done`)
	/*
		Google Assistant-style startup animation
	 */
	const border = new Instance("Frame", GUI)
	Debris.AddItem(border, 1)
	border.Size = UDim2.fromScale(1, 1)
	border.AnchorPoint = new Vector2(0.5, 0.5)
	border.Position = UDim2.fromScale(0.5, 0.5)
	border.BackgroundTransparency = 1
	const stroke = new Instance("UIStroke", border)
	stroke.Thickness = 15
	stroke.Color = colors.ACCENT
	TweenService.Create(
		border,
		new TweenInfo(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, true),
		{
			Size: new UDim2(1, -10, 1, -10),
		}
	).Play()
}
