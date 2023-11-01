import { IStory } from '../types/IStory'

export const initialStory: IStory = {
	author: '',
	audience: null,
	characters: [],
	collabs: [],
	copyHolder: '',
	copyYear: '',
	cover: '',
	credits: '',
	desc: '',
	isbn: '',
	language: null,
	license: '',
	regions: 'Europe',
	summary: '',
	tags: [],
	title: '',
	updateDate: new Date().toLocaleString('pl', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	}),
	status: 'draft',
}
