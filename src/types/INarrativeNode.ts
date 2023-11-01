import { ICharacter } from './ICharacter'

export interface INarrativeNode {
	id: number
	positionX: number
	positionY: number
	type: string
	content: string
	title: string
	voice: string
	bgSound: string
	data: {
		label?: string
	}
	characters: ICharacter | null
}
