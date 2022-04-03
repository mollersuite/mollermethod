import Roact from "@rbxts/roact"
import { pure, useContext, useEffect } from "@rbxts/roact-hooked"
import { Plugins } from "util"
import run from "./run"

const title = rconsolename ?? rconsolesettitle

export = pure(() => {
	const plugins = useContext(Plugins)

	useEffect(() => {
		// run console and shit
		let running = true
		rconsolecreate?.()
		assert(rconsoleprint, "rconsoleprint is not defined")
		assert(rconsoleinput, "rconsoleinput is not defined")
		title?.("Bracket")
		rconsoleprint(` * █████╗
 * ██╔══╝
 * ██║
 * ██║
 * █████╗
 * ╚════╝
 * Welcome to Bracket.
 * Enter a command below.
 `)

		async function loop() {
			while (running) {
				rconsoleprint!("] ")
				await run(rconsoleinput!(), plugins)
			}
		}
		loop()
		return () => {
			running = false
			rconsoleclear?.()
			rconsoledestroy?.()
		}
	}, [])

	return <></>
})
