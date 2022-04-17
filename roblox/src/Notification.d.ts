declare const module: {
	new: (
		this: void,
		name: string,
		description: string,
		icon: "Error" | "Info" | "Success" | "Warning",
		duration: number,
		holder: Instance,
		callback?: Callback
	) => void
}

export = module
