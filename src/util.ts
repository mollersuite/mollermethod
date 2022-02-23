import { SoundService } from '@rbxts/services'

export function asset(url: string): string {
	// then its already an asset
	if (url.match('^rbxasset.*://')) return url
	// otherwise, we need to download it
	const name = url.match('([^/]+)$')
	const data = game.HttpGetAsync(url)
	writefile('mollermethod_' + name, data)
	return (getcustomasset || getsynasset)('mollermethod_' + name)
}

export function play(id: string, volume = 5) {
	const sound = new Instance('Sound')
	sound.SoundId = id
	sound.Volume = volume
	SoundService.PlayLocalSound(sound)
}
