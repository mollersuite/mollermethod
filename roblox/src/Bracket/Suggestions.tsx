import Roact from "@rbxts/roact"
import { escape_lua_pattern, flat, Plugins } from "util"
import { pure, useContext } from "@rbxts/roact-hooked"
import Entry from "./Entry"

export = pure(({ Text: text }: { Text: string }) => {
	const plugins = useContext(Plugins)

	return (
		<>
			{flat(plugins.mapFiltered(plugin => plugin.Exports))
				.filter(
					cmd => cmd.Name.match("^" + escape_lua_pattern(text.lower()))[0] !== undefined
				)
				.map(Export => {
					return <Entry Export={Export} text={text} />
				})}
		</>
	)
})
