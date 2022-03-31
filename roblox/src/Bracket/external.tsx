import Roact from "@rbxts/roact"
import { pure, useEffect } from "@rbxts/roact-hooked"
import run from "./run"

const title = rconsolename ?? rconsolesettitle

export = pure(() => {
	useEffect(() => {
		// run console and shit
		let running = true
		rconsolecreate?.()
		assert(rconsoleprint, "rconsoleprint is not defined")
		assert(rconsoleinput, "rconsoleinput is not defined")
		title?.("Bracket")
		rconsoleprint("Welcome to Bracket. Enter a command below.\n")

		task.spawn(() => {
			while (running) {
				rconsoleprint("] ")
				run(rconsoleinput())
			}
		})
		
		return () => {
			running = false
			rconsoleclear?.()
			rconsoledestroy?.()
		}
	}, [])

	return <></>
})
