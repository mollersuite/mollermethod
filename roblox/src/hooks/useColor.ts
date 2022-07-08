import Roact from "@rbxts/roact"
import { useContext } from "@rbxts/roact-hooked"
import { Colors as ColorsBinding } from "util"

type Colors = typeof import("colors").default

function useColor<T extends keyof Colors> (name: T): Roact.Binding<Colors[T]> {
	return useContext(ColorsBinding)[0].map(colors => colors[name])
}

export = useColor
