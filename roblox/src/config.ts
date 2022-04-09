import { HttpService } from "@rbxts/services"

type JSONValue = string | number | boolean | undefined | JSONValue[] | JSONObject
interface JSONObject {
	[key: string]: JSONValue
}

/**
 * A way to handle configuration for Roblox scripting utilities.
 * @since 6.5.0
 * 
 * @remarks
 * It can handle Script-Ware's profiles & other exploits' workspaces.
 * 
 * @example
 * ```ts
 * const config = new Config("MyConfig")
 * config.set("MyKey", "MyValue") // does `writeprofile("MyConfig", "MyKey", "MyValue")` on Script-Ware, and saves to MyConfig.json on other exploits
 * config.get("MyKey") // returns "MyValue" (it does `readprofile("MyConfig", "MyKey")` on Script-Ware, and reads from MyConfig.json on other exploits)
 * ```
 * @alpha
 */
export = class Config<Format extends JSONObject = JSONObject> {
	public noob: boolean = false
	private file: string
	constructor(public name: string) {
		this.file = name + ".json"

		if (issetting) {
			this.noob = !issetting(name)
		} else if (!isfile(this.file)) {
			writefile(this.file, "{}")
			this.noob = true
		}
	}

	public get<T extends keyof Format & string>(value: T): Format[T] {
		if (readprofile) {
			return HttpService.JSONDecode(readprofile(this.name, value as string)) as Format[T]
		} else {
			return (HttpService.JSONDecode(readfile(this.file)) as Format)[value]
		}
	}

	public set<T extends keyof Format & string>(name: T, value: Format[T]): void {
		if (writeprofile) {
			writeprofile(this.name, name as string, HttpService.JSONEncode(value))
		} else {
			let data = HttpService.JSONDecode(readfile(this.file)) as Format
			data[name] = value
			writefile(this.file, HttpService.JSONEncode(data))
		}
	}
}
