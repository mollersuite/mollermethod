// Convert a JavaScript object to a Lua table.
/*
	Example:
		var obj = {
			a: 1,
			b: 2,
			c: {
				d: 3,
				e: 4
			}
		};
		var lua = objToLua(obj);
		console.log(lua);
		// prints:
		// {
		// 	a = 1,
		// 	b = 2,
		// 	c = {
		// 		d = 3,
		// 		e = 4
		// 	}
		// }
*/

export function convert(obj: unknown, indent = "\t") {
	return (
		Object.keys(obj).reduce((lua, key) => {
			if (typeof obj[key] === "object") {
				lua += `${indent}${key} = ${convert(obj[key], indent + "\t")};\n`
			} else {
				lua += `${indent}${key} = ${obj[key]};\n`
			}
			return lua
		}, "{\n") + `${indent}}`
	)
}
// The above code has a bug: every } has an extra \t.
// This function fixes that.
export function fix(lua: string) {
	return lua.replace(/\t\}/g, "}")
}
