import { ICharacter } from './ICharacter'

export interface IDecision {
	label: string
	characters: ICharacter[] | null
	title?: string
	description?: string
	wait?: {
		title: string
		duration: number
		audioFile: string
		isLooping: boolean
	}
	a?: {
		title: string
		tags: string[]
	}
	b?: {
		title: string
		tags: string[]
	}
	audioFileId: string
}
