import { SoundService } from "@rbxts/services"

/**
 * A wrapper around getcustomasset
 *
 * @param url A public url to the asset
 * @returns A Content string pointing to the asset
 */
export function asset(url: string): string {
	// then its already an asset
	if (url.match("^rbxasset.*://")) return url
	// otherwise, we need to download it
	const name = url.match("([^/]+)$")
	const data = game.HttpGetAsync(url)
	writefile("mollermethod_" + name, data)
	return (getcustomasset || getsynasset)("mollermethod_" + name)
}

/**
 * Plays a sound without parenting it
 *
 * @param id A Content string pointing to a sound. Try using {@link asset} if you haven't uploaded the sound.
 * @param volume The volume of the sound. Default is 5, max is 10
 */
export function play(id: string, volume = 5) {
	const sound = new Instance("Sound")
	sound.SoundId = id
	sound.Volume = volume
	SoundService.PlayLocalSound(sound)
}

/**
 * fuck lua fuck lua
 *
 * @param arr An array
 * @returns A random element from the array
 */
export const random = <T>(arr: readonly T[]): T => arr[math.random(arr.size()) - 1]

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

export function removeDuplicatesBy<T>(keyFn: (element: T) => unknown, array: T[]): T[] {
	const mySet = new Set()
	return array.filter(function (x) {
		const key = keyFn(x),
			isNew = !mySet.has(key)
		if (isNew) mySet.add(key)
		return isNew
	})
}
