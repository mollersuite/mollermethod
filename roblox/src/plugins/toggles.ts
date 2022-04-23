import { HttpService, Players, Workspace } from "@rbxts/services"
import Flight from "Bracket/Flight"
import type { PluginUtil, Plugin, Toggle } from "types"

const Player = Players.LocalPlayer
export = (util: PluginUtil): Plugin => {
	const colors = util.colors
	const block = new Instance("ConeHandleAdornment", game.GetService("CoreGui"))
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
		},
	}
}
