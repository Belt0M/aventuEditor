import { FC } from 'react'
import { HiPlus } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const CreateStoryCard: FC = () => {
	return (
		<Link
			to='/create-new'
			className='flex flex-col items-center justify-center p-4 transition duration-300 bg-white cursor-pointer shadow-storyShadow rounded-xl text-secondary hover:bg-secondary hover:bg-opacity-20 hover:scale-105'
		>
			<HiPlus className='text-4xl font' />
			<h2 className='text-xl font-semibold'>Create new story</h2>
		</Link>
	)
}

export default CreateStoryCard
