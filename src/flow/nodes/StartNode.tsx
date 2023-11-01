import { FC } from 'react'
import { MdOutlineStart } from 'react-icons/md'
import { Handle, Position } from 'reactflow'

const StartNode: FC = () => {
	return (
		<>
			<div
				className='grid w-12 h-12 p-1 text-[1.7rem] font-bold border-[0.2rem] rounded-xl place-items-center border-darkGreen text-darkGreen bg-darkGreen bg-opacity-10'
				draggable
			>
				<MdOutlineStart />
			</div>
			<Handle
				type='source'
				position={Position.Right}
				className='w-2 -right-[0.2rem] h-2 bg-darkGreen'
			/>
		</>
	)
}

export default StartNode
