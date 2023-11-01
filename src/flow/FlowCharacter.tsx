import clsx from 'clsx'
import { DragEvent, FC, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsPlayFill } from 'react-icons/bs'
import CharacterContext from '../components/CharacterContext'
import Alert from '../components/popups/Alert'
import { useAudio } from '../hooks/useAudio'
import { storiesApi } from '../services/stories.api'
import { ICharacter } from '../types/ICharacter'

interface Props {
	index: number
	data: ICharacter
	isColor?: boolean
	minWidth?: string
}

const FlowCharacter: FC<Props> = ({ data, index, isColor, minWidth }) => {
	const [context, setContext] = useState<boolean>(false)
	const [playing, toggle] = useAudio(
		'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	)
	// RTK Query delete request import
	const [deleteCharacter, { error, isSuccess }] =
		storiesApi.useDeleteCharacterMutation()

	// Delete character handler
	const handleDelete = (character: ICharacter) => {
		deleteCharacter({ storyId: data!.id!, characterId: character.id })
		setContext(prev => !prev)
	}

	// Custom Node handler
	const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
		// console.log(event, event.dataTransfer)
		event.dataTransfer.setData('application/reactflow', nodeType)
		event.dataTransfer.effectAllowed = 'move'
		// Add the data from the dragged component here
		event.dataTransfer.setData('characterData', JSON.stringify(data))
		// console.log(event, event.dataTransfer.getData('characterData'))
	}

	return (
		<div
			className={clsx(
				minWidth && minWidth,
				' relative px-4 py-2 border-2 border-opacity-60 border-secondary rounded-2xl'
			)}
			style={{ borderColor: data.colorId }}
			draggable
			onDragStart={event => onDragStart(event, 'characterNode')}
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
			{isColor && (
				<p className='flex items-center gap-1 text-xs font-semibold'>
					Colour ID:{' '}
					<span
						className='w-2 h-2 rounded-full'
						style={{ background: data.colorId }}
					/>
					<span className='font-bold' style={{ color: data.colorId }}>
						{data.colorId}
					</span>
				</p>
			)}
			<button
				type='button'
				onClick={() => setContext(prev => !prev)}
				className='absolute text-2xl transition cursor-pointer right-1 top-1.5 text-secondary hover:scale-110'
			>
				<BiDotsVerticalRounded />
			</button>
			{context && <CharacterContext data={data} onDelete={handleDelete} />}
			{/* Handle delete responses */}
			{error && <Alert error="Error: Can't delete the character!" />}
			{isSuccess && (
				<Alert
					error='Success: The character was successfully deleted'
					type='success'
				/>
			)}
		</div>
	)
}

export default FlowCharacter
