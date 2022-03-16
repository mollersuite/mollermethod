/// <reference types="@rbxts/types/plugin" />
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
declare const gethui: (() => Instance) | void

/**
 * Fakes a .Touched event to `ToTouch` with `Part`.
 * The `Toggle` argument must be either 0 or 1 (for fire/unfire).
 *
 * **Note:** The `ToTouch` argument must have a child with class `TouchTransmitter` in order for this function to work.
 */
declare const firetouchinterest: ((Part: Instance, ToTouch: BasePart, Toggle: 0 | 1) => void) | void
declare const copytoclipboard: ((text: string) => void) | void
interface LogService {
	/**
	 * Runs scripts on the server, LOL.
	 **/
	ExecuteScript(script: string): void
}
