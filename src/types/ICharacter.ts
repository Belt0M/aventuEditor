import { TVoice } from './TVoice'

export interface ICharacter {
	id: number
	name: string
	desc: string
	voice: TVoice //to add new one firstly extend TVoice type
	colorId: string
}
