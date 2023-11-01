import redhat from '../assets/img/redhood.jpg'
import treasureisland from '../assets/img/treasureisland.jpg'
import { IStory } from '../types/IStory'

export const storiesData: IStory[] = [
	{
		id: 1,
		img: treasureisland,
		title: 'Treasure Island',
		status: 'draft',
		updateDate: '15.11.2023',
	},
	{
		id: 2,
		img: redhat,
		title: 'Little Red Riding Hood',
		status: 'published',
		updateDate: '10.10.2023',
	},
]
