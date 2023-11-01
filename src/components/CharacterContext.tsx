import { FC } from 'react'
import { ICharacter } from '../types/ICharacter'

type Props = {
	onDelete: (character: ICharacter) => void
	data: ICharacter
}

const CharacterContext: FC<Props> = ({ onDelete, data }) => {
	return (
		<div className='absolute flex flex-col items-start w-2/3 p-3 m-4 text-base font-semibold bg-white border-2 rounded-sm shadow-lg right-2 border-darkGray border-opacity-40 top-5'>
			<button
				type='button'
				className='px-1 transition text-red hover:text-opacity-75'
				onClick={() => onDelete(data)}
			>
				Delete
			</button>
		</div>
	)
}

export default CharacterContext
