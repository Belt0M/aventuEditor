import { TAudience } from './IAudience'
import { ICharacter } from './ICharacter'
import { TCollab } from './ICollab'
import { TLanguage } from './TLanguage'
import { TRegion } from './TRegion'

export interface IStory {
	id?: number
	title: string
	desc: string
	summary: string
	language: TLanguage | null
	audience: TAudience | null
	cover: string
	characters: ICharacter[]
	author: string
	copyHolder: string
	license: string
	collabs: TCollab[]
	credits: string
	copyYear: string
	regions: TRegion
	isbn: string
	tags: string[]
	updateDate: string
	status: string
}
