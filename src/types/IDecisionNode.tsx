export interface IDecisionNode {
	id: number
	positionX: number
	positionY: number
	type: string
	content: string
	title: string
	voice: string
	bgSound: string
	waitTime: number
	isLooping: boolean
	audioFile: string
	variants: {
		a: {
			title: string
			triggers: string[]
		}
		b: {
			title: string
			triggers: string[]
		}
	}
	data: {
		label?: string
	}
}
