import Roact from "@rbxts/roact"
import Neo from "Neo"

export = (target: Frame) => {
	const tree = Roact.mount(<Neo container={target} notif={target} />, target)
	return () => Roact.unmount(tree)
}
