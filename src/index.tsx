import { Debris, TweenService } from '@rbxts/services'
import { play } from 'util'
import Roact from '@rbxts/roact'
import Notification from 'components/Notification'
import Trendsetter from 'components'

const quotes = [
	'"RETIRER VOTRE ANTIVIRUS" - 404coddy404, 2022, trying to cookie grab me',
	'"https://tenor.com/view/همم-gif-21570043" - Bongo, 2022, after I told him Molly was put down', // the most fucked up quote of them all
	'"wait no dont said no furry porn" - Bongo, 2022 (right before Amourousity sent furry porn)',
	'"i am going to FARD" - Amourousity, 2022',
	'"I\'d get report bottled [sic]" - Jack, 2022',
	'"I like snake venom is because of its UI/UX effects [...] I dont have anywehre [sic] near the skill to recreate it" - Sp3ct3r3, 2022',
	'"i forgot how to sleep" - Mr. Hase, 2022',
	'"bruh im having so much trouble with ca-tay ui" - Bongo, 2022',
	'":(" - Mr. Hase, 2021',
	'"I know how to bypass https encryption" - tact, 2022',
	'"trollsmile [not] winning" - Amourousity, 2021',
	'"[I want you to make a] grab knife script but its a meme knife for mobile and pc" - k9#7062, 2021',
	'"WHAT THE FUCK IS MOLY MOLER [sic] DOING" - DeadBoris, 2021',
	'"i fuking hat you ashole ill fuck find you [...] tis yor fault" - Vexaria, 2021',
	'"this is why you dont give people stuff that actually works and isnt bad" - Charlie, 2021',
	'"Well listen and listen well, me and Auxnos partnered and fixed the animations, lights, and fixed the guns." - mongrio, 2021',
	`"I'ma hack u y'all" - cash_youtwin, 2020`
]

const startups = {
	alarm3: 'rbxassetid://6366788549',
	speaker: 'rbxassetid://8370988437',
	x10: 'rbxassetid://8192419115'
}
const random = (arr: string[]): string => arr[math.random(arr.size()) - 1]
export = function (options: { Debug?: true; GUI: ScreenGui }) {
	const GUI = options.GUI

	const border = new Instance('Frame', GUI)
	Debris.AddItem(border, 1)
	border.Size = UDim2.fromScale(1, 1)
	border.AnchorPoint = new Vector2(0.5, 0.5)
	border.Position = UDim2.fromScale(0.5, 0.5)
	border.BackgroundTransparency = 1
	const stroke = new Instance('UIStroke', border)
	stroke.Thickness = 15
	stroke.Color = new Color3(1, 1, 1)
	TweenService.Create(
		border,
		new TweenInfo(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, true),
		{
			Size: new UDim2(1, -10, 1, -10)
		}
	).Play()
	play(startups.x10)
	Roact.mount(
		<Notification Text={`<b>Pause</b> to open mollermethod.\n<i>${random(quotes)}</i>`} />,
		GUI,
		'Notification'
	)

	const tree = Roact.mount(<Trendsetter Kill={() => {
		Roact.unmount(tree)
	}}/>, GUI, 'Menu')
	
}
