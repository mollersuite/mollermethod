import Roact from "@rbxts/roact"
import Expletive from "."

export = (target: Frame) => {
	const tree = Roact.mount(<Expletive container={target} />, target)
	return () => Roact.unmount(tree)
}
