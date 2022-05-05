import { HttpService, TeleportService, Players, Workspace, UserInputService } from "@rbxts/services"
import { join_code, play } from "util"
import type { Plugin, PluginUtil } from "types"

const Player = Players.LocalPlayer

export = (util: PluginUtil): Plugin => {
	let Flight = false
	const colors = util.colors
	const block = new Instance("ConeHandleAdornment", game.GetService("CoreGui"))
	block.Adornee = Workspace.Terrain
	block.Name = HttpService.GenerateGUID()
	block.Visible = false
	block.Color3 = colors.ACCENT

	return {
		Name: "Built-in commands",
		Author: "mollersuite",
		Commands: {
			molly: {
				description: "the dog",
				execute: () => {
					const molly = new Instance("ImageLabel", util.GUI)
					molly.Image = "rbxassetid://7037156897"
					molly.Size = UDim2.fromScale(1, 1)
					molly.BackgroundTransparency = 1
					molly.ZIndex = -1
					molly.BorderSizePixel = 0
				},
			},

			exit: {
				description: "Closes the game.",
				execute: () => game.Shutdown(),
			},

			rejoin: {
				description: "Rejoins the server. [rejoin",
				async execute() {
					if (Players.GetPlayers().size() === 1) {
						Player.Kick("Rejoining...")
						task.wait() // not sure if this is needed but IY does it
						TeleportService.Teleport(game.PlaceId, Player)
					} else TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId, Player)
				},
			},

			support: {
				description: "Gives you the link to the support server. [support",
				execute: () =>
					void util.notify(
						"Bracket",
						"mthd.ml/support (click to open Discord)",
						"Info",
						5,
						() => {
							const request = (getgenv()?.request ||
								syn?.request ||
								http?.request) as typeof globalThis.request | void
							request?.({
								Url: "http://127.0.0.1:6463/rpc?v=1",
								Method: "POST",
								Headers: {
									"Content-Type": "application/json",
									Origin: "https://discord.com",
								},
								Body: HttpService.JSONEncode({
									cmd: "INVITE_BROWSER",
									nonce: HttpService.GenerateGUID(false),
									args: { code: "9c8fFSy83p" },
								}),
							})
						}
					),
			},

			fish: {
				description: "flop like a fish [fish",
				async execute() {
					const Character = Player.Character
					assert(Character, "Character not found")
					Flight = !Flight
					if (Flight) {
						const Humanoid = Character.FindFirstChildWhichIsA("Humanoid")!
						const Root = Humanoid.RootPart!
						const BodyVelocity = new Instance("BodyVelocity", Root)
						BodyVelocity.Velocity = Vector3.zero
						BodyVelocity.MaxForce = Vector3.one.mul(9e9)
						Humanoid!.PlatformStand = true
						let moving = false
						UserInputService.InputBegan.Connect((input, gpe) => {
							if (!gpe) {
								moving = true
								if (input.KeyCode === Enum.KeyCode.W) {
									BodyVelocity.MaxForce = Vector3.one.mul(9e9)
									while (moving) {
										BodyVelocity.Velocity =
											Workspace!.CurrentCamera!.CFrame.LookVector.mul(200)
										task.wait()
									}
								}
							}
						})
						UserInputService.InputEnded.Connect((input, gpe) => {
							if (!gpe) {
								if (input.KeyCode === Enum.KeyCode.W) {
									moving = false
									BodyVelocity.MaxForce = Vector3.zero
								}
							}
						})
					} else {
						const Humanoid = Character.FindFirstChildWhichIsA("Humanoid")!
						const Root = Humanoid.RootPart!
						Root.FindFirstChildWhichIsA("BodyVelocity")?.Destroy()
						Humanoid.PlatformStand = false
					}
				},
			},

			trollsmile: {
				description: "trollsmile winning [trollsmile",
				execute: () => {
					play("rbxassetid://6345755361")
					return Promise.delay(1.5)
				},
			},

			respawn: {
				description: "Respawns you. [respawn",
				async execute() {
					const char = Player.Character
					char?.FindFirstChildOfClass("Humanoid")?.ChangeState("Dead")
					char?.ClearAllChildren()
					const newchar = new Instance("Model", Workspace)
					Player.Character = newchar
					task.wait()
					Player.Character = char
					newchar.Destroy()
				},
			},

			joincode: {
				description: "copies a markdown message with links to join your server [joincode",
				execute() {
					assert(setclipboard, "you need to be able to set the clipboard")
					return join_code().then(setclipboard ?? print)
				},
			},

			speed: {
				description: "set speed [speed walkSpeed?:number",
				async execute(args) {
					const walkspeed = tonumber(args[0])
					const character = Player.Character
					const humanoid = character?.FindFirstChildWhichIsA("Humanoid")
					assert(humanoid, "you need a humanoid")
					humanoid.WalkSpeed = walkspeed ?? 16
				},
			},

			jump: {
				description: "set jump power [jump jumpPower?:number",
				async execute(args) {
					const jumpPower = tonumber(args[0])
					const character = Player.Character
					const humanoid = character?.FindFirstChildWhichIsA("Humanoid")
					assert(humanoid, "you need a humanoid")
					humanoid.JumpPower = jumpPower ?? 50
				},
			},
		},
	}
}
