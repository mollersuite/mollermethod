import { GroupService, Players } from "@rbxts/services"
import type { Plugin } from "types"

async function accessory(
	Player: Player,
	tag: (tag: string) => unknown,
	Assets: Record<string, number[]>
) {
	const appearance = Players.GetCharacterAppearanceInfoAsync(Player.UserId)
	for (const [key, ids] of pairs(Assets)) {
		appearance.assets.filter(asset => ids.includes(asset.id)).forEach(() => tag(key))
	}
}

async function group(
	Player: Player,

	tag: (tag: string) => unknown,
	Groups: Record<string, number[]>
) {
	const groups = GroupService.GetGroupsAsync(Player.UserId)
	const groups_by_id = groups.map(group => group.Id)

	// group tags
	for (const [key, targets] of pairs(Groups)) {
		targets.filter(group => groups_by_id.includes(group)).forEach(() => tag(key))
	}
}

export = (): Plugin => ({
	Name: "Built-in tags",
	Author: "mollersuite",
	async Tags(player, tag) {
		if (player.AccountAge > 365.25 * 6) tag("Veteran")

		// owner detection
		if (game.CreatorType === Enum.CreatorType.User && game.CreatorId === player.UserId) {
			tag("Creator")
		} else if (
			game.CreatorType === Enum.CreatorType.Group &&
			player.GetRankInGroup(game.CreatorId) === 255
		) {
			tag("Creator")
		}
		await Promise.all([
			accessory(player, tag, {
				"mom's credit card": [
					134082579, // headless
					139607718, // korblox right
					139607673, // korblox left
				],
				Furry: [
					// Main series protogens
					3860144255, // 9000
					4319676598, // 9001
					4436864392, // 9002
					4545298365, // 9003
					4684937821, // 9004
					4708710111, // 9004 Mark II
					4772333114, // 9005
					5509213450, // 9006
					// Protogen MKII
					6069109016, // MKII Hashtags
					6069116135, // MKII Spade
					6069121093, // MKII Paws
					// Rounded Visor Protogen
					8087490807, // Blue
					8087502591, // Purple
					8087499688, // Red
					// Budget protogen (Shadow Dog Head)
					6991973236, // normal
					7063128361, // Blue
					7063124093, // Red
					7063127310, // Purple
					7063129601, // Green
					7199524418, // Shade
					7199503248, // Pale
					// Cyber Critter Tail
					8158158248, // Cyber Critter Tail
					5064417624, // Black
					5064418572, // White
					6880235494, // Trench
					6880238635, // Brown
					6880236963, // Sand
					6880240856, // Kawaii
					6880243411, // Mint
					// Other protogens
					8919336599, // Synth Mask
					7793343203, // Vampire
					7793326170, // Hallowogen
					4904727066, // Disk Friend
				],
				"SB Player": [
					8508134960, // A̶P̶T̶-̶2̶2̶8̶3̶-̶3̶ Jack Hase's pants
					8508134006, // A̶P̶T̶-̶2̶2̶8̶3̶-̶3̶ Jack Hase's shirt
				],
			}),
			group(player, tag, {
				"SB Player": [
					// script builders themselves
					6778737, // Empty Baseplate
					3256759, // Void Script Builder
					11339696, // Lua Assembling
					13634542, // Script Showcase
					7002501, // Script Test Map
					3155066, // Dark Eccentric
					// whitelist groups
					1150725, // A̶P̶T̶-̶2̶2̶8̶3̶-̶3̶ Jack Hase's group
				],
				Furry: [
					5245050, // Furry Project
					2684849, // Furry Fandom
					5833102, // CodeProtogens
					13802474, // Furry Den
					5240855, // Furry Family
				],
			}),
		])
	},
})