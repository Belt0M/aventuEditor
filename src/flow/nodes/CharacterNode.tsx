import { FC } from 'react'
import { Handle, Position } from 'reactflow'
import { ICharacter } from '../../types/ICharacter'

interface Props {
	data: {
		label: string
		characters: ICharacter[]
	}
}

const CharacterNode: FC<Props> = ({ data }) => {
	return (
		<>
			<Handle
				type='target'
				position={Position.Left}
				className='w-2 h-2 bg-blue'
			/>
			<div
				className='grid w-[8.5rem] h-[4.5rem] px-3 py-2.5 text-sm font-bold border-[0.2rem] rounded-xl border-blue text-dark bg-blue bg-opacity-10'
				draggable
			>
				<h5 className='font-bold'>Narrator</h5>
				<span className='mt-0.5 text-xs font-semibold'>
					Voice: {data.characters[0].voice}
				</span>
			</div>
			<Handle
				type='source'
				position={Position.Right}
				className='w-2 h-2 bg-blue'
			/>
		</>
	)
}

export default CharacterNode
