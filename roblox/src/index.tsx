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

interface Config {
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
}
/**
 * @see https://mthd.ml
 * @name mollermethod
 * @description Scripting, unleashed.
 * @author Etcetera (mollersuite division)
 * @example
 * ```lua
 * loadstring (game:HttpGet "mthd.ml") {
 *
 * }
 * ```
 */
class mollermethod {
	container: ScreenGui
	notif_holder: Frame
	plugins: Plugin[] = []
	tree: Roact.Tree

	constructor(public config: Config) {
		this.config = config
		if (config.theme) {
			colors.ACCENT = Color3.fromHex(config.theme.accent)
			colors.WHITE = Color3.fromHex(config.theme.foreground)
			colors.BLACK = Color3.fromHex(config.theme.background)
		}
		this.container = this.config.gui
		set_volume(this.config.volume ?? 5)

		// Startup sound
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

		this.notif_holder = this.setup_notifs()
		this.load_plugins()


		this.tree = Roact.mount(
			<Plugins.Provider value={this.plugins}>
				<Kill.Provider
					value={() => {
						Roact.unmount(this.tree)
						this.container.Destroy()
					}}>
					{/* UIs */}
					{this.config.bracket_external ? (
						<BracketExternal />
					) : (
						<Bracket
							Key="Bracket"
							button={this.config.bracket_toggle ?? Enum.KeyCode.LeftBracket}
						/>
					)}
					<Trendsetter Key="Menu" />
					<Expletive Key="Taskbar" />
				</Kill.Provider>
				{/* Services */}
				<AdminBail container={this.notif_holder} />
			</Plugins.Provider>,
			this.container
		)
		debug && warn(`done`)

		// Google Assistant-style startup animation
		const border = new Instance("Frame", this.container)
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

		new Notification(
			"Welcome to mollermethod " + PKG_VERSION,
			random(QUOTES),
			"Success",
			5,
			this.notif_holder
		)
	}

	async load_plugins() {
		const util = {
			notify: (
				name: string,
				description: string,
				icon: "Error" | "Info" | "Success" | "Warning",
				duration: number,
				callback?: Callback
			) => new Notification(name, description, icon, duration, this.notif_holder, callback),
			GUI: this.container,
			colors,
			Snapdragon,
		}

		if (this.config.plugins) {
			debug && warn(`loading ${this.config.plugins.size()} plugins from settings`)
			await Promise.allSettled(
				this.config.plugins.map(async source => {
					const [plugin, err] = loadstring(source)
					assert(plugin, err)

					this.plugins.push(plugin(util))
				})
			)
		}

		debug && warn(`loading default plugins`)
		await Promise.allSettled(
			script.plugins.GetDescendants().map(async module => {
				if (module.IsA("ModuleScript")) {
					const plugin = require(module) as (opts: any) => Plugin
					this.plugins.push(plugin(util))
				} else {
					return
				}
			})
		)

		// Load IY plugins
		if (isfile?.("IY_FE.iy")) {
			debug && warn(`loading iy plugins`)
			const config = HttpService.JSONDecode(readfile("IY_FE.iy")) as IYConfig
			await Promise.allSettled(
				config.PluginsTable.map(async plugin_path =>
					iy_to_bracket(readfile(plugin_path), this.notif_holder, this.plugins)
				)
			)
		}
	}
	setup_notifs() {
		const holder = new Instance("Frame", this.container)
		holder.AnchorPoint = new Vector2(1, 0)
		holder.BackgroundColor3 = Color3.fromHex("#FFFFFF")
		holder.BackgroundTransparency = 1
		holder.Position = UDim2.fromScale(1, 0)
		holder.Size = UDim2.fromScale(1, 1)

		const padding = new Instance("UIPadding")
		padding.PaddingBottom = new UDim(0, 15)
		padding.PaddingRight = new UDim(0, 15)
		padding.Parent = holder

		const uIListLayout = new Instance("UIListLayout")
		uIListLayout.Padding = new UDim(0, 10)
		uIListLayout.HorizontalAlignment = Enum.HorizontalAlignment.Right
		uIListLayout.SortOrder = Enum.SortOrder.LayoutOrder
		uIListLayout.VerticalAlignment = Enum.VerticalAlignment.Bottom
		uIListLayout.Parent = holder

		return holder
	}
}

export = (config: Config) => new mollermethod(config)
