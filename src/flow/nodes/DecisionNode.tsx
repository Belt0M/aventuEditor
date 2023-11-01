import { FC } from 'react'
import { TbArrowsSplit2 } from 'react-icons/tb'
import { Handle, Position } from 'reactflow'

const DecisionNode: FC = () => {
	return (
		<>
			<Handle
				type='target'
				position={Position.Left}
				className='w-2 h-2 bg-secondary'
			/>
			<div
				className='grid w-12 h-12 p-1 text-[1.7rem] font-bold border-[0.2rem] rounded-xl place-items-center border-secondary text-secondary bg-secondary bg-opacity-20'
				draggable
			>
				<TbArrowsSplit2 />
			</div>
			<Handle
				type='source'
				position={Position.Right}
				className='absolute w-2 h-2 top-4 bg-secondary'
				id='s1'
			/>
			<Handle
				type='source'
				position={Position.Right}
				className='absolute w-2 h-2 top-8 bg-secondary'
				id='s2'
			/>
		</>
	)
}

export default DecisionNode
