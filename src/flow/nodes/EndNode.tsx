import { FC } from 'react'
import { BiSolidArrowToRight } from 'react-icons/bi'
import { Handle, Position } from 'reactflow'

const EndNode: FC = () => {
	return (
		<>
			<Handle
				type='target'
				position={Position.Left}
				className='w-2 h-2 bg-primary'
			/>
			<div
				className='grid w-12 h-12 p-1 text-3xl font-bold border-[0.2rem] rounded-xl place-items-center border-primary text-primary bg-primary bg-opacity-10'
				draggable
			>
				<BiSolidArrowToRight />
			</div>
		</>
	)
}

export default EndNode
