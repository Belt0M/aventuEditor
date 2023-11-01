import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IStory } from '../types/IStory'

type Props = {
	onDelete: () => void
	story: IStory
}

const StoryContext: FC<Props> = ({ onDelete, story }) => {
	return (
		<div className='absolute flex flex-col items-start w-2/3 p-3 m-4 text-base font-semibold bg-white border-2 rounded-sm shadow-lg -right-2 border-darkGray border-opacity-40 top-5'>
			<Link
				to='/edit'
				state={{ story }}
				className='w-full px-1 pb-2 text-left transition border-b-2 border-b-midGray text-dark hover:text-opacity-75'
			>
				Edit
			</Link>
			<button
				className='px-1 pt-2 transition text-red hover:text-opacity-75'
				onClick={onDelete}
			>
				Delete
			</button>
		</div>
	)
}

export default StoryContext
