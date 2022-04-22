// Taken from Orca: https://github.com/richie0866/orca/blob/b208c76f388cda5e8c960d48c42fb9fc94eb8874/src/jobs/character/flight.client.ts
import { Players, Workspace, UserInputService, RunService } from "@rbxts/services"
import { GroupMotor, Spring } from "@rbxts/flipper"

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
let humanoidRoot: HandleAdornment | BasePart | undefined
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
			if (humanoidRoot.IsA("BasePart")) humanoidRoot.AssemblyLinearVelocity = new Vector3()
			humanoidRoot.CFrame = Workspace.CurrentCamera!.CFrame.Rotation.add(new Vector3(x, y, z))
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
	coordinate = CFrame.fromMatrix(humanoidRoot.CFrame.Position, XVector, YVector, ZVector)
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
export = (val: boolean, root: BasePart | HandleAdornment, spd = 100) => {
	enabled = val
	speed = spd
	humanoidRoot = root
	if (enabled) {
		resetCoordinate()
		resetSpring()
	}
}
