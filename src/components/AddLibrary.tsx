import { FC } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { ImBooks } from 'react-icons/im'

const AddLibrary: FC = () => {
	return (
		<div className='flex items-center justify-between py-6 px-7 text-dark'>
			<span className='flex items-center gap-2 font-bold'>
				<ImBooks className='text-xl' />
				<h4>Library</h4>
			</span>
			<button className='text-lg transition cursor-pointer hover:scale-110'>
				<AiOutlinePlus />
			</button>
		</div>
	)
}

export default AddLibrary
