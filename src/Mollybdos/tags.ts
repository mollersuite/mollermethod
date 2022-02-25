// TODO: plugin integration
import { GroupService, Players } from "@rbxts/services"

async function appearance_tags(
	Player: Player,
	{
		Tags,
		Assets
	}: {
		Tags: Record<string, number | void>
		Assets: Record<string, number[]>
	}
) {
	const appearance = Players.GetCharacterAppearanceInfoAsync(Player.UserId)
	for (const [key, ids] of pairs(Assets)) {
		Tags[key] =
			(Tags[key] ?? 0) + appearance.assets.filter((asset) => ids.includes(asset.id)).size()
	}
}

async function behavior_tags(
	Player: Player,
	{
		Tags,
		Groups
	}: {
		Tags: Record<string, number | void>
		Groups: Record<string, number[]>
	}
) {
	const groups = GroupService.GetGroupsAsync(Player.UserId)
	const groups_by_id = groups.map((group) => group.Id)

	if (
		// creator based on user
		game.CreatorType === Enum.CreatorType.User &&
		game.CreatorId === Player.UserId
	) {
		Tags.Creator = 1
	} else if (
		// creator based on group
		game.CreatorType === Enum.CreatorType.Group &&
		groups.find((group) => group.Id === game.CreatorId)?.Rank === 255
	) {
		Tags.Creator = 1
	}

	// group tags
	for (const [key, targets] of pairs(Groups)) {
		Tags[key] = (Tags[key] ?? 0) + targets.filter((group) => groups_by_id.includes(group)).size()
	}
}

export type Tags = readonly {
	readonly name: string
	readonly score: number
}[]

export default async function tags_of(Player: Player): Promise<Tags> {
	const Tags: Record<string, number> = {}
	if (Player === Players.LocalPlayer) Tags.You = 1 // idk why not
	await Promise.all([
		appearance_tags(Player, {
			Tags,
			Assets: {
				"mom's credit card": [
					134082579, // headless
					139607718, // korblox right
					139607673 // korblox left
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
					// Other protogens
					8919336599, // Synth Mask
					7793343203, // Vampire
					7793326170, // Hallowogen
					// Budget protogen (Shadow Dog Head)
					6991973236, // normal
					7063128361, // Blue
					7063124093, // Red
					7063127310, // Purple
					7063129601, // Green
					7199524418, // Shade
					7199503248 // Pale
				],
				"SB Player": [
					8508134960, // A̶P̶T̶-̶2̶2̶8̶3̶-̶3̶ Jack Hase's pants
					8508134006 // A̶P̶T̶-̶2̶2̶8̶3̶-̶3̶ Jack Hase's shirt
				]
			}
		}),
		behavior_tags(Player, {
			Tags,
			Groups: {
				"SB Player": [10350051, 6778737, 3256759, 11339696],
				Furry: [5245050, 2684849, 5833102, 13802474]
			}
		})
	])

	const final_array = []
	for (const [name, score] of pairs(Tags)) final_array.push({ name, score })
	return final_array.sort((a, b) => b.score < a.score)
}
