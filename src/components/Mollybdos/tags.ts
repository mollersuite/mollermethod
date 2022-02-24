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
		if (appearance.assets.some((asset) => ids.includes(asset.id))) Tags[key] = (Tags[key] ?? 0) + 1
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
		if (targets.some((group) => groups_by_id.includes(group))) Tags[key] = (Tags[key] ?? 0) + 1
	}
}

export type Tags = {
	name: string
	score: number
}[]

export default async function tags_from(Player: Player): Promise<Tags> {
	const Tags: Record<string, number> = {}

	await Promise.all([
		appearance_tags(Player, {
			Tags,
			Assets: {
				// most offenders will have a score of 2
				"mom's credit card": [
					134082579, // headless
					139607718, // korblox right
					139607673 // korblox left
				],
				Furry: [
					// Protogens
					3860144255, // 9000
					4319676598, // 9001
					4436864392, // 9002
					4545298365, // 9003
					4684937821, // 9004
					4708710111, // 9004 Mark II
					4772333114, // 9005
					5509213450, // 9006
					8919336599, // Synth Mask
					6069109016, // MKII Hashtags
					6069116135, // MKII Spade
					6069121093 // MKII Paws
					// do i include shattered dragon? (that would make me a furry)
				]
			}
		}),
		behavior_tags(Player, {
			Tags,
			Groups: {
				"SB Player": [10350051, 6778737, 3256759, 11339696],
				Furry: [5245050, 2684849, 5833102]
			}
		})
	])

	const final_array = []
	for (const [name, score] of pairs(Tags)) final_array.push({ name, score })
	return final_array.sort((a, b) => b.score < a.score)
}
