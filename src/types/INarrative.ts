import { ICharacter } from './ICharacter'

export interface INarrative {
	label: string
	characters: ICharacter[] | null
	title?: string
	description?: string
	audioFileId?: string
	audioFile?: string
}
