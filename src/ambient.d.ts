interface DataModel {
	/**
	 * This function shuts down the current game instance.
	 *
	 * This function cannot be used by developers to ‘shut down’ live game servers due to its security context level. Game servers can only be shutdown by the developer from the place’s page on the Roblox website.
	 *
	 * ## See also
	 *
	 * - [DataModel:BindToClose](https://developer.roblox.com/api-reference/function/DataModel/BindToClose), which binds a function to be ran before the game instance shuts down
	 * - [Player:Kick](https://developer.roblox.com/api-reference/function/Player/Kick), which kicks a [Player](https://developer.roblox.com/api-reference/class/Player) from the game instance
	 */
	Shutdown(): void
}

/**
 * Did Infinite Yield load?
 * @author Edge <https://github.com/EdgeIY>
 * @since Infinite Yield 3.8
 */
declare const IY_LOADED: true | void
