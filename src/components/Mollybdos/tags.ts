// TODO: plugin integration

import { Players } from "@rbxts/services"

// like heres my idea in pseudocode
// when player changes:
// set state `tags` to []
// tags_of(player).then(tags=>set state 'tags' to tags)

const names = {
	Furry: ["^(Cyber Critter %d)"]
}

const assets = {
	"mom's credit card": [134082579, 139607718, 139607673]
}

export async function tags_of(player: Player): Promise<string[]> {
	const player_tags = new Set<string>()
	const appearance = Players.GetCharacterAppearanceInfoAsync(player.UserId)
	// this is probably not the most efficient way to do this
	for (const [key, patterns] of pairs(names)) {
		if (
			appearance.assets.some((asset) => patterns.some((pattern) => !!asset.name.match(pattern)))
		) {
			player_tags.add(key)
		}
	}

	for (const [key, ids] of pairs(assets)) {
		if (appearance.assets.some((asset) => ids.includes(asset.id))) {
			player_tags.add(key)
		}
	}
	return [...player_tags]
}
