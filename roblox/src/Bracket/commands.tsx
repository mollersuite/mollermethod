import {
	HttpService,
	TeleportService,
	Players,
	Workspace,
	UserInputService,
	RunService,
} from "@rbxts/services"
import { GroupMotor, Spring } from "@rbxts/flipper"
import { join_code, play } from "util"
import Roact from "@rbxts/roact"
import type { Command } from "types"
const Player = Players.LocalPlayer

// Taken from Orca: https://github.com/richie0866/orca/blob/b208c76f388cda5e8c960d48c42fb9fc94eb8874/src/jobs/character/flight.client.ts
namespace FlyService {
	const player = Players.LocalPlayer
	const moveDirection = {
		forward: new Vector3(),
		backward: new Vector3(),
		left: new Vector3(),
		right: new Vector3(),
		up: new Vector3(),
		down: new Vector3(),
	}

	// Whether the player is currently flying, the speed in studs per second, and
	// the movement direction.
	let enabled = false
	let speed = 16

	// The root part and current CFrame. Undefined when there is no character.
	let humanoidRoot: BasePart | undefined
	let coordinate: CFrame | undefined
	let coordinateSpring = new GroupMotor([0, 0, 0], false)

	async function main() {
		UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (gameProcessed) {
				return
			}
			updateDirection(input.KeyCode, true)
		})

		UserInputService.InputEnded.Connect(input => {
			updateDirection(input.KeyCode, false)
		})

		RunService.Heartbeat.Connect(deltaTime => {
			if (enabled && humanoidRoot && coordinate) {
				updateCoordinate(deltaTime)
				coordinateSpring.setGoal([
					new Spring(coordinate.X),
					new Spring(coordinate.Y),
					new Spring(coordinate.Z),
				])
				coordinateSpring.step(deltaTime)

				const [x, y, z] = coordinateSpring.getValue()
				humanoidRoot.AssemblyLinearVelocity = new Vector3()
				humanoidRoot.CFrame = Workspace.CurrentCamera!.CFrame.Rotation.add(
					new Vector3(x, y, z)
				)
			}
		})

		// Update root part CFrame with the Camera's current direction. May be removed
		// in the future.
		RunService.RenderStepped.Connect(() => {
			if (enabled && humanoidRoot && coordinate) {
				humanoidRoot.CFrame = Workspace.CurrentCamera!.CFrame.Rotation.add(
					humanoidRoot.CFrame.Position
				)
			}
		})

		player.CharacterAdded.Connect(() => {
			enabled = false
		})
	}

	function getUnitDirection() {
		let sum = new Vector3()
		for (const [, v3] of pairs(moveDirection)) {
			sum = sum.add(v3)
		}
		return sum.Magnitude > 0 ? sum.Unit : sum
	}

	function resetCoordinate() {
		if (!humanoidRoot) {
			return
		}
		const { XVector, YVector, ZVector } = Workspace.CurrentCamera!.CFrame
		coordinate = CFrame.fromMatrix(humanoidRoot.Position, XVector, YVector, ZVector)
	}

	function resetSpring() {
		if (!coordinate) {
			return
		}
		coordinateSpring = new GroupMotor([coordinate.X, coordinate.Y, coordinate.Z], false)
	}

	function updateCoordinate(deltaTime: number) {
		if (!coordinate) {
			return
		}

		const { XVector, YVector, ZVector } = Workspace.CurrentCamera!.CFrame
		const direction = getUnitDirection()

		if (direction.Magnitude > 0) {
			const { X, Y, Z } = direction.mul(speed * deltaTime)
			coordinate = CFrame.fromMatrix(coordinate.Position, XVector, YVector, ZVector).mul(
				new CFrame(X, Y, Z)
			)
		} else {
			coordinate = CFrame.fromMatrix(coordinate.Position, XVector, YVector, ZVector)
		}
	}

	function updateDirection(code: Enum.KeyCode, begin: boolean) {
		switch (code) {
			case Enum.KeyCode.W:
				moveDirection.forward = begin ? new Vector3(0, 0, -1) : new Vector3()
				break
			case Enum.KeyCode.S:
				moveDirection.backward = begin ? new Vector3(0, 0, 1) : new Vector3()
				break
			case Enum.KeyCode.A:
				moveDirection.left = begin ? new Vector3(-1, 0, 0) : new Vector3()
				break
			case Enum.KeyCode.D:
				moveDirection.right = begin ? new Vector3(1, 0, 0) : new Vector3()
				break
			case Enum.KeyCode.Q:
				moveDirection.up = begin ? new Vector3(0, -1, 0) : new Vector3()
				break
			case Enum.KeyCode.E:
				moveDirection.down = begin ? new Vector3(0, 1, 0) : new Vector3()
				break
		}
	}
	main().catch(warn)
	export const toggle = (val: boolean, root: BasePart, spd = 100) => {
		enabled = val
		speed = spd
		humanoidRoot = root
		if (enabled) {
			resetCoordinate()
			resetSpring()
		}
	}
}

export const exit: Command = {
	description: "Closes the game.",
	execute: () => game.Shutdown(),
}
export const rejoin: Command = {
	description: "Rejoins the server.",
	async execute() {
		if (Players.GetPlayers().size() === 1) {
			Player.Kick("Rejoining...")
			task.wait() // not sure if this is needed but IY does it
			TeleportService.Teleport(game.PlaceId, Player)
		} else TeleportService.TeleportToPlaceInstance(game.PlaceId, game.JobId, Player)
	},
}

export const support: Command = {
	description: "Gives you the link to the support server.",
	async execute() {
		const request = (getgenv()?.request || syn?.request || http?.request) as
			| typeof globalThis.request
			| void
		if (request) {
			request({
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
		} else {
			// find a way to do notifs
		}
	},
}

let Flight = false
export const fly: Command = {
	description: "Toggles fly mode.",
	async execute(args) {
		const Character = Player.Character
		assert(Character, "Character not found")
		Flight = !Flight
		FlyService.toggle(
			Flight,
			Character.FindFirstChildOfClass("Humanoid")!.RootPart!,
			tonumber(args[0])
		)
	},
}

export const fish: Command = {
	description: "flop like a fish",
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
}

export const trollsmile: Command = {
	description: "trollsmile winning",
	execute: () => {
		play("rbxassetid://6345755361")
		return Promise.delay(1.5)
	},
}

export const respawn: Command = {
	description: "Respawns you.",
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
}

export const joincode: Command = {
	description: "copies a markdown message with links to join your server",
	execute() {
		assert(setclipboard, "you need to be able to set the clipboard")
		return join_code().then(setclipboard ?? print)
	},
}

let Swim = false
export const swim: Command = {
	description: "swim like a fish",
	async execute() {
		const Character = Player.Character
		const Humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
		assert(Humanoid, "you need a humanoid")
		Swim = !Swim
		if (Swim) {
			Workspace.Gravity = 0
			for (const state of Enum.HumanoidStateType.GetEnumItems()) {
				if (state.Name === "Swimming") {
					Humanoid.SetStateEnabled(state, true)
				} else {
					Humanoid.SetStateEnabled(state, false)
				}
			}
			Humanoid.ChangeState(Enum.HumanoidStateType.Swimming)
			while (Swim) {
				Character!.TranslateBy(Humanoid.MoveDirection.div(2))
				task.wait()
			}
		} else {
			Workspace.Gravity = 198.2
			for (const state of Enum.HumanoidStateType.GetEnumItems()) {
				Humanoid.SetStateEnabled(state, true)
			}
			Humanoid.ChangeState(Enum.HumanoidStateType.RunningNoPhysics)
		}
	},
}

let Invisible = false
const block = new Instance("Part")
block.Shape = Enum.PartType.Cylinder
block.Name = HttpService.GenerateGUID()
Roact.mount(
	<billboardgui ResetOnSpawn={false} Adornee={block} Size={UDim2.fromScale(2, 2)}>
		<imagelabel
			Size={UDim2.fromScale(1, 1)}
			Image="rbxassetid://7037156897"
			BackgroundTransparency={1}
		/>
	</billboardgui>,
	block,
	HttpService.GenerateGUID()
)
export const invisible: Command = {
	description: "Become invisible",
	async execute(args) {
		const Character = Player.Character as Model
		assert(Character, "you need a character")
		Invisible = !Invisible
		if (Invisible) {
			const humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
			assert(humanoid, "you need a humanoid")
			const root = humanoid.RootPart
			assert(root, "you need a root part")
			block.Size = Vector3.one
			block.Anchored = false
			block.CanCollide = false
			block.Massless = false
			block.CFrame = root.CFrame
			block.Parent = Workspace

			FlyService.toggle(true, block, tonumber(args[0]))

			Character.PivotTo(new CFrame(Vector3.one.mul(1000), Vector3.zero))
			task.spawn(() => {
				task.wait(1)
				root.Anchored = true
			})
			Workspace.CurrentCamera!.CameraSubject = block
		} else {
			FlyService.toggle(false, block)
			const humanoid = Character?.FindFirstChildWhichIsA("Humanoid")
			assert(humanoid, "you need a humanoid")
			const root = humanoid.RootPart
			assert(root, "you need a root part")
			root.Anchored = false
			Character.PivotTo(block.CFrame)
			Workspace.CurrentCamera!.CameraSubject = humanoid
			block.CFrame = new CFrame(Vector3.one.mul(9e9), Vector3.zero)
		}
	},
}

export const speed: Command = {
	description: "set speed",
	async execute(args) {
		const walkspeed = tonumber(args[0])
		const character = Player.Character
		const humanoid = character?.FindFirstChildWhichIsA("Humanoid")
		assert(humanoid, "you need a humanoid")
		humanoid.WalkSpeed = walkspeed ?? 16
	},
}

export const jump: Command = {
	description: "set jump power",
	async execute(args) {
		const jumpPower = tonumber(args[0])
		const character = Player.Character
		const humanoid = character?.FindFirstChildWhichIsA("Humanoid")
		assert(humanoid, "you need a humanoid")
		humanoid.JumpPower = jumpPower ?? 50
	},
}
