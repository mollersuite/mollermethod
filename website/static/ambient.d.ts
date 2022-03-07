declare module "https://cdn.jsdelivr.net/gh/MaximumADHD/Roblox-Client-Tracker/Mini-API-Dump.json" {
	const API: {
		Enums: {
			Items: {
				Name: string
				Value: number
			}[]
			Name: string
		}[]
		Classes: {
			Name: string
			Superclass: string
			MemoryCategory: string
			Tags?: string[]
		}[]
		Version: number
	}
	export default API
}
