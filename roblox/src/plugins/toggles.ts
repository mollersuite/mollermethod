import { Linear } from "@rbxts/flipper"
import Object from "@rbxts/object-utils"
import { HttpService, Players, Workspace, RunService } from "@rbxts/services"
import Flight from "Bracket/Flight"
import module from "Notification"
import type { PluginUtil, Plugin, Toggle } from "types"

const Player = Players.LocalPlayer
export = (util: PluginUtil): Plugin => {
	const colors = util.colors
	const block = new Instance("ConeHandleAdornment", game.GetService("CoreGui"))
	let TracersLoop: RBXScriptConnection
	const TracerLines: Record<string, Line> = {}
	block.Adornee = Workspace.Terrain
	block.Name = HttpService.GenerateGUID()
	block.Visible = false
	block.Color3 = colors.ACCENT

	return {
		Name: "Built-in toggles",
		Author: "mollersuite",
		Toggles: {
			swim: {
				description: "swimming in air how?? [swim",
				localbar: true,
				on() {
					const Character = Player.Character
					const Humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
					assert(Humanoid, "you need a humanoid")
					if (Humanoid.GetState() === Enum.HumanoidStateType.Swimming) return
					Workspace.Gravity = 0
					for (const state of Enum.HumanoidStateType.GetEnumItems()) {
						if (state.Name === "Swimming") {
							Humanoid.SetStateEnabled(state, true)
						} else {
							Humanoid.SetStateEnabled(state, false)
						}
					}
					Humanoid.ChangeState(Enum.HumanoidStateType.Swimming)
				},
				off() {
					const Character = Player.Character
					const Humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
					assert(Humanoid, "you need a humanoid")
					Workspace.Gravity = 198.2
					for (const state of Enum.HumanoidStateType.GetEnumItems()) {
						Humanoid.SetStateEnabled(state, true)
					}
					Humanoid.ChangeState(Enum.HumanoidStateType.RunningNoPhysics)
				},
			},

			invisible: {
				un: "visible",
				description: "turns you into a cone [invisible speed?:number",
				localbar: true, // Defaults to true but who cares
				on(args) {
					const speed = args ? tonumber(args[0]) : 100
					if (block.Visible) {
						return Flight(true, block, speed)
					}
					const Character = Player.Character
					const humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
					const root = humanoid?.RootPart
					assert(Character, "you need a character")
					assert(humanoid, "you need a humanoid")
					assert(root, "you need a root part")
					block.Visible = true
					block.CFrame = root.CFrame
					const fake = new Instance("Part")
					fake.Anchored = true
					Flight(true, block, speed)
					Character.PivotTo(new CFrame(Vector3.one.mul(1000), Vector3.zero))
					block.GetPropertyChangedSignal("CFrame").Connect(() => {
						fake.CFrame = block.CFrame
					})
					task.delay(1, () => (root.Anchored = true))
					Workspace.CurrentCamera!.CameraSubject = fake
				},
				off() {
					const Character = Player.Character
					assert(Character, "you need a character")
					Flight(false, block)
					const humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
					assert(humanoid, "you need a humanoid")
					const root = humanoid.RootPart
					assert(root, "you need a root part")
					root.Anchored = false
					Character.PivotTo(block.CFrame)
					Workspace.CurrentCamera!.CameraSubject = humanoid

					block.Visible = false
				},
			},

			fly: {
				description: "wheee [fly speed?:number",
				localbar: true,
				on(args) {
					const speed = args ? tonumber(args[0]) : 100
					const Character = Player.Character
					assert(Character, "Character not found")
					Flight(true, Character.FindFirstChildOfClass("Humanoid")!.RootPart!, speed)
				},
				off() {
					const Character = Player.Character
					assert(Character, "Character not found")
					Flight(false, Character.FindFirstChildOfClass("Humanoid")!.RootPart!)
				},
			},

			tracers: {
				description: "tracers [tracers",
				localbar: false,
				on() {
					// add characters to list when playeradded

					const Characters: Model[] = []

					Players.PlayerAdded.Connect((plr: Player) => {
						plr.CharacterAdded.Connect((char: Model) => {
							// const humanoid = char.FindFirstChildWhichIsA("Humanoid")

							// if (!humanoid) return

							// const root = humanoid.RootPart

							// if (!root) return

							// const rootSize = root.Size
							// const rootPosition = root.Position

							// const camera = Workspace.CurrentCamera

							// assert(camera, "workspace.CurrentCamera is undefined")

							// const [Vector, OnScreen] = camera.WorldToViewportPoint(rootPosition.mul(new Vector3(0, -rootSize.Y, 0)))

							Characters.push(char)
						})
					})

					// get all current players characters

					Players.GetPlayers().forEach(plr => {
						if (plr.Character) {
							Characters.push(plr.Character)
						}
						plr.CharacterAdded.Connect((char: Model) => {
							Characters.push(char)
						})
					})

					// Wrap things up

					TracersLoop = RunService.RenderStepped.Connect(() => {
						Characters.forEach(char => {
							if (char === Players.LocalPlayer.Character) return
							if (!char) return

							const humanoid = char.FindFirstChildWhichIsA("Humanoid")

							if (!humanoid) return

							const root = humanoid.RootPart

							if (!root) return

							const rootSize = root.Size
							const rootCFrame = root.CFrame

							print(rootCFrame)

							const camera = Workspace.CurrentCamera

							assert(camera, "workspace.CurrentCamera is undefined")

							const [Vector, OnScreen] = camera.WorldToViewportPoint(
								rootCFrame.mul(new Vector3(0, -rootSize.Y, 0))
							)
							if (OnScreen) {
								if (Drawing) {
									if (!TracerLines[char.Name]) {
										TracerLines[char.Name] = new Drawing("Line")
										TracerLines[char.Name].Thickness = 1
										TracerLines[char.Name].Transparency = 0.7
										TracerLines[char.Name].Color = new Color3(0, 0, 1)
									}

									TracerLines[char.Name].From = new Vector2(Vector.X, Vector.Y)
									TracerLines[char.Name].To = new Vector2(
										camera.ViewportSize.X / 2,
										camera.ViewportSize.Y / 2
									)

									TracerLines[char.Name].Visible = true
								}
							} else {
								if (TracerLines[char.Name]) {
									TracerLines[char.Name].Visible = false
								}
							}
						})
					})
				},
				off() {
					Object.values(TracerLines).forEach(line => line.Remove())
					table.clear(TracerLines)

					if (TracersLoop) {
						TracersLoop.Disconnect()
					}
				},
			},
		},
	}
}
