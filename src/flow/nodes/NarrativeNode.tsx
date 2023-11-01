import { FC } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Handle, Position } from 'reactflow'

const NarrativeNode: FC = () => {
	return (
		<>
			<Handle
				type='target'
				position={Position.Left}
				className='w-2 h-2 bg-blue'
			/>
			<div
				className='grid w-12 h-12 p-1 text-2xl font-bold border-[0.2rem] rounded-xl place-items-center border-blue text-blue bg-blue bg-opacity-10'
				draggable
			>
				<BsThreeDots />
			</div>
			<Handle
				type='source'
				position={Position.Right}
				className='w-2 h-2 bg-blue'
			/>
		</>
	)
}

export default NarrativeNode
