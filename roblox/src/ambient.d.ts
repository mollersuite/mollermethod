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

/**
 * Fakes a .Touched event to `ToTouch` with `Part`.
 * The `Toggle` argument must be either 0 or 1 (for fire/unfire).
 *
 * **Note:** The `ToTouch` argument must have a child with class `TouchTransmitter` in order for this function to work.
 * @param ToTouch The `Part` to touch the Part with.
 * @param Toggle The toggle value which determines whether to fire(0) or unfire(1) the event.
 * @param Part The `Part` to touch.
 */

declare const firetouchinterest: ((Part: Instance, ToTouch: BasePart, Toggle: 0 | 1) => void) | void

interface LogService {
	/**
	 * Runs scripts on the server, LOL.
	 * @param script The source of the script to run.
	 **/
	ExecuteScript(script: string): void
}

// Filesystem API (S-W)

/**
 * Makes a write file dialog with title and filter.
 * @param title The title of the dialog
 * @param filter File filter, e.g. "*.txt"
 * @param data The data to be saved
 */

declare const writedialog: ((title: string, filter: string, data: string) => boolean) | void

/**
 * Opens a read file dialog with title and filter.
 * @param title The title of the dialog
 * @param filter File filter, e.g. "*.txt"
 */

declare const readdialog: ((title: string, filter: string) => [boolean, string]) | void
