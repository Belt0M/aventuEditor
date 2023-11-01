import { FC } from 'react'
import { ILibrary } from '../types/ILibrary'

type Props = {
	lib: ILibrary
}

const LibraryItem: FC<Props> = ({ lib }) => {
	return (
		<li
			key={lib.name}
			className='flex gap-2 p-2 transition rounded-lg cursor-pointer hover:bg-midGray hover:bg-opacity-40'
		>
			<img src={lib.img} alt={lib.name} className='rounded-full w-7 h-7' />
			<div className=''>
				<h5 className='text-base leading-[1.65rem]'>{lib.name}</h5>
				<span className='text-sm text-darkGray'>
					{lib.storiesCount + (lib.storiesCount > 0 ? ` story` : ` stories`)}
				</span>
			</div>
		</li>
	)
}

export default LibraryItem
