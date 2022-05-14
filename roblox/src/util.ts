import Object from "@rbxts/object-utils"
import Roact, { Binding, BindingFunction } from "@rbxts/roact"
import { SoundService } from "@rbxts/services"
import colors from "colors"
import type { Plugin } from "./types"

const binding = Roact.createBinding(colors) as [
	binding: Binding<typeof colors>,
	setBinding: BindingFunction<typeof colors>
]

export const Colors = Roact.createContext(binding)
export const Kill = Roact.createContext(() => {})
export const Plugins = Roact.createContext<Plugin[]>([])

/**
 * A wrapper around getcustomasset
 *
 * @param url A public url to the asset
 * @returns A Content string pointing to the asset
 */
export function asset(url: string): string {
	// otherwise, we need to download it
	const [name] = url.match("([^/]+)$")
	const [data] = game.HttpGetAsync(url)
	writefile("mollermethod_" + name, data)
	return (getcustomasset || getsynasset)("mollermethod_" + name)
}

let default_volume = 5
/**
 * Plays a sound without parenting it
 *
 * @param id A Content string pointing to a sound. Try using {@link asset} if you haven't uploaded the sound.
 * @param volume The volume of the sound. Default is 5, max is 10
 */
export function play(id: string, volume = default_volume) {
	const sound = new Instance("Sound")
	sound.SoundId = id
	sound.Volume = volume
	SoundService.PlayLocalSound(sound)
}

export function set_volume(volume: number) {
	default_volume = volume
}
/**
 * fuck lua fuck lua
 *
 * @param arr An array
 * @returns A random element from the array
 */
export const random = <T>(arr: readonly T[]): T => arr[math.random(arr.size()) - 1]

/*
	ok so
	in Bracket
	i'm doing like cmd.match('^' + input)
	and like
	BRACKET'S PREFIX IS [
	so
	in Lua
	that causes an unmatched group
	so
	i need to escape
*/
export const escape_lua_pattern = (s: string) =>
	s.gsub(".", {
		"^": "%^",
		$: "%$",
		"(": "%(",
		")": "%)",
		"%": "%%",
		".": "%.",
		"[": "%[",
		"]": "%]",
		"*": "%*",
		"+": "%+",
		"-": "%-",
		"?": "%?",
	})[0]

export async function join_code() {
	const methods: Record<string, (this: void) => Promise<string>> = {
		async JavaScript() {
			return `\`Roblox.GameLauncher.joinGameInstance(${game.PlaceId}, '${game.JobId}')\``
		},
		"RoPro (and mobile)": async () => {
			return game.HttpPostAsync(
				`https://ropro.io/api/createInvite.php?universeid=${game.GameId}&serverid=${game.JobId}`,
				""
			)
		},
		async RoGold() {
			return `https://roblox.com/discover#/rg-join/${game.PlaceId}/${game.JobId}`
		},
		async r2283() {
			return `https://roblox.com/home?placeID=${game.PlaceId}&gameID=${game.JobId}`
		},
	}

	const output = Object.entries(methods).map(async ([name, run]) =>
		run()
			.then(code => `${name}: ${code}`)
			.catch(() => `${name}: Errored!`)
	)

	return Promise.all<Promise<string>[]>(output).then(lines => lines.join("\n"))
}

export function merge<T>(list: T[]): T {
	return Object.assign({}, ...list)
}

export const title_case = (name: string) => name.sub(1, 1).upper() + name.sub(2)


export const flat = <T> (list: readonly T[][]): T[] => {
	const result: T[] = []
	for (const sublist of list) {
		for (const item of sublist) {
			result.push(item)
		}
	}
	return result
}
