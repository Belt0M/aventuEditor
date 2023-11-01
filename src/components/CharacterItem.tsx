import clsx from 'clsx'
import { FC, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsPlayFill } from 'react-icons/bs'
import { useAudio } from '../hooks/useAudio'
import { ICharacter } from '../types/ICharacter'
import CharacterContext from './CharacterContext'

interface Props {
	index: number
	data: ICharacter
	handleDelete: (character: ICharacter) => void
	minWidth?: string
}

const CharacterItem: FC<Props> = ({ data, index, handleDelete, minWidth }) => {
	const [context, setContext] = useState<boolean>(false)
	const [playing, toggle] = useAudio(
		'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	)

	return (
		<div
			className={clsx(
				minWidth && minWidth,
				' relative px-4 py-2 border-2 border-opacity-60 border-secondary rounded-2xl'
			)}
		>
			<span className='text-xs font-bold text-darkGray'>
				Character {index + 1}
			</span>
			<p className='text-[.85rem] font-semibold mt-2'>Name: {data.name}</p>
			<button
				type='button'
				className={clsx(
					playing ? 'text-red' : 'text-primary',
					'flex items-center gap-1 text-xs font-semibold transition-all hover:brightness-125 -left-1 relative pb-1 mt-1'
				)}
				onClick={toggle}
			>
				<BsPlayFill className='text-xl' />
				<span>{data.voice}</span>
			</button>
			<button
				type='button'
				onClick={() => setContext(prev => !prev)}
				className='absolute text-2xl transition cursor-pointer right-1 top-1.5 text-secondary hover:scale-110'
			>
				<BiDotsVerticalRounded />
			</button>
			{context && <CharacterContext data={data} onDelete={handleDelete} />}
		</div>
	)
}

export default CharacterItem
