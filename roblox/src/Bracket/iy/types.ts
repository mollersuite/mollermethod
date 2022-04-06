export interface IYCommand {
	ListName: string
	Description: string
	Function: (args: string[], speaker: Player) => unknown
	Aliases: string[]
}

export interface IYPlugin {
	PluginName: string
	PluginDescription: string
	Commands: Record<string, IYCommand>
}

export interface IYConfig {
	PluginsTable: string[]
	
}
