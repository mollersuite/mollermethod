import type { Plugin } from "types"

export type Tags = readonly {
	readonly name: string
	readonly score: number
}[]

export default async function tags_of(Player: Player, plugins: Plugin[]): Promise<Tags> {
	const Tags: Record<string, number> = setmetatable(
		{},
		{
			__index: () => 0,
		}
	)

	
	await Promise.all(
		plugins
			.mapFiltered(plugin => plugin.Tags)
			.map(async tag => tag(Player, name => Tags[name]++))
	)

	const final_array = []
	for (const [name, score] of pairs(Tags)) final_array.push({ name, score })
	return final_array.sort((a, b) => b.score < a.score)
}
