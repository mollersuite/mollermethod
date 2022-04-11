import Object from "@rbxts/object-utils"
import Roact from "@rbxts/roact"
import { SoundService } from "@rbxts/services"
import type { Plugin } from "./types"

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
	const data = game.HttpGetAsync(url)
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

export function set_volume(volume_: number) {
	default_volume = volume_
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
	const methods: Record<string, (this: void) => Promise<string> | string> = {
		JavaScript() {
			return `\`Roblox.GameLauncher.joinGameInstance(${game.PlaceId}, '${game.JobId}')\``
		},
		Mobile() {
			return `<robloxmobile://placeID=${game.PlaceId}&gameInstanceId=${game.JobId}>`
		},
		async RoPro() {
			return game.HttpPostAsync(
				`https://ropro.io/api/createInvite.php?universeid=${game.GameId}&serverid=${game.JobId}`,
				""
			)
		},
		RoGold() {
			return `https://roblox.com/discover#/rg-join/${game.PlaceId}/${game.JobId}`
		},
	}

	const output = Object.entries(methods).map(async ([name, run]) => `${name}: ${await run()}`)

	return Promise.all<Promise<string>[]>(output).then(lines => lines.join("\n"))
}
