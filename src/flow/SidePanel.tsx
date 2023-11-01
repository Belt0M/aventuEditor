import { DragEvent, FC } from 'react'
import DecisionNode from './nodes/DecisionNode'
import EndNode from './nodes/EndNode'
import NarrativeNode from './nodes/NarrativeNode'
import StartNode from './nodes/StartNode'

const SidePanel: FC = () => {
	const onDragStart = (event: DragEvent, nodeType: string) => {
		event.dataTransfer.setData('application/reactflow', nodeType)
		event.dataTransfer.effectAllowed = 'move'
	}

	return (
		<div className='absolute left-0 flex flex-col items-center gap-2 p-3 scale-95 bg-white rounded-lg -top-2 shadow-storyShadow'>
			<h3 className='px-2 pt-1 pb-3 text-sm font-bold border-b-2 border-opacity-40'>
				Tools
			</h3>
			<div className='text-center'>
				<div
					onDragStart={event => onDragStart(event, 'startNode')}
					draggable
					className='relative '
				>
					<StartNode />
				</div>
				<span className='relative text-xs font-semibold -top-0.5'>Start</span>
			</div>
			<div className='text-center'>
				<div
					onDragStart={event => onDragStart(event, 'decisionNode')}
					draggable
					className='relative'
				>
					<DecisionNode />
				</div>
				<span className='text-xs font-semibold -top-0.5 relative'>
					Decision
				</span>
			</div>
			<div className='text-center'>
				<div
					onDragStart={event => onDragStart(event, 'narrativeNode')}
					draggable
					className='relative'
				>
					<NarrativeNode />
				</div>
				<span className='text-xs font-semibold -top-0.5 relative'>
					Narrative
				</span>
			</div>
			<div className='text-center'>
				<div
					onDragStart={event => onDragStart(event, 'endNode')}
					draggable
					className='relative'
				>
					<EndNode />
				</div>
				<span className='text-xs font-semibold -top-0.5 relative'>End</span>
			</div>
		</div>
	)
}
export default SidePanel
