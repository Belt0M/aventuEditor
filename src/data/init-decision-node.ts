import { IDecision } from '../types/IDecision'

export const initDecisionNode: IDecision = {
	label: '',
	characters: null,
	title: '',
	description: '',
	wait: {
		title: 'Wait',
		duration: 0,
		audioFile: '',
		isLooping: false,
	},
	a: {
		title: '',
		tags: [],
	},
	b: {
		title: '',
		tags: [],
	},
	audioFileId: '',
}
