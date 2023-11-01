import { FC, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { storiesApi } from '../services/stories.api'
import { IStory } from '../types/IStory'
import StoryModal from './StoryContext'
import Alert from './popups/Alert'

type Props = {
	story: IStory
}

const StoryItem: FC<Props> = ({ story }) => {
	const [modal, setModal] = useState<boolean>(false)
	const [deleteStory, { isSuccess, error }] =
		storiesApi.useDeleteStoryMutation()

	// Handle three dots button click
	const handleClick = () => {
		setModal(prev => !prev)
	}

	// Handle modal delete button click
	const handleDelete = () => {
		setModal(prev => !prev)
		// Rest of logic later...
		deleteStory(story)
	}

	return (
		<div className='flex flex-col justify-between p-2 transition duration-300 bg-white 3xl:p-4 shadow-storyShadow rounded-xl hover:bg-secondary hover:bg-opacity-20'>
			<div>
				<Link to={`/editor/${story.id}`} key={story.id}>
					<img
						src={story.cover}
						alt={story.title}
						className='w-full cursor-pointer rounded-xl aspect-square'
					/>
				</Link>
				<div className='relative flex items-center justify-between'>
					<h3 className='py-2 text-base font-bold 3xl:py-6 3xl:text-2xl'>
						{story.title}
					</h3>
					<button
						onClick={handleClick}
						className='text-2xl transition cursor-pointer 3xl:text-4xl text-secondary hover:scale-110'
					>
						<BiDotsVerticalRounded />
					</button>
					{modal && <StoryModal onDelete={handleDelete} story={story} />}
				</div>
			</div>

			<div className='px-1 pb-1 text-sm font-semibold 3xl:pb-2 3xl:text-xl text-darkGray'>
				<span>{'Status: ' + story.status}</span>
				<p>{'Last updated: ' + story.updateDate}</p>
			</div>
			{error && <Alert error="Error: Can't delete the story!" />}
			{isSuccess && (
				<Alert
					error='Success: Story was successfully deleted!'
					type='success'
				/>
			)}
		</div>
	)
}

export default StoryItem
