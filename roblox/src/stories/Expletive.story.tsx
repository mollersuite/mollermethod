import Roact from "@rbxts/roact"
import Expletive from "Expletive"

export = (target: Frame) => {
	const tree = Roact.mount(<Expletive container={target} notif={target} />, target)
	return () => Roact.unmount(tree)
}
