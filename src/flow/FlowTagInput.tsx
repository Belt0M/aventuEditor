import clsx from 'clsx'
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface Props {
	onChangeNested: (
		data: string | number | boolean | string[],
		title: string,
		title2: 'wait' | 'a' | 'b'
	) => void
	data?: string[]
	name: string
	label: string
	name2: string
}

const FlowTagInput: FC<Props> = ({
	onChangeNested,
	data,
	name,
	label,
	name2,
}) => {
	const [tags, setTags] = useState<string[]>(data ? data : [])
	const [tagInput, setTagInput] = useState<string>('')

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTagInput(e.target.value)
	}

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && tagInput.trim() !== '') {
			e.preventDefault()
			if (tags.length >= 9) {
				return
			}

			onChangeNested(
				[tagInput.trim(), ...tags],
				name,
				name2 as 'wait' | 'a' | 'b'
			)

			setTags([tagInput.trim(), ...tags])
			setTagInput('')
		}
	}

	const handleRemove = (e: Event, tag: string) => {
		e.stopPropagation()
		setTags(tags.filter(el => el !== tag))
		onChangeNested(
			tags.filter(el => el !== tag),
			name,
			name2 as 'wait' | 'a' | 'b'
		)
	}

	return (
		<>
			<label className='flex items-center gap-2 my-2 text-xs font-semibold text-dark'>
				{label}
				{tags.length >= 9 && (
					<span className='text-xs italic border-b-2 text-opacity-80 text-red border-red'>
						Up to 9 tags
					</span>
				)}
			</label>
			<div className='relative w-full px-4 mt-1 mb-4 text-sm border-2 rounded-lg border-yellow border-opacity-40 focus:outline-none focus:border-opacity-80 placeholder:text-sm flex items-center gap-2 min-h-[37.2px] max-h-[4rem] justify-between'>
				<div
					className={clsx(
						tags.length ? 'flex' : 'hidden',
						'flex items-center gap-2 py-1 w-[80%] flex-wrap overflow-y-auto max-h-[37.2px]'
					)}
				>
					{tags.map((tag, index) => (
						<span
							key={index}
							className='z-40 flex items-center gap-2 px-4 py-1 m-0 text-xs font-semibold bg-opacity-25 rounded-full cursor-pointer bg-secondary max-w-24'
						>
							{tag}
							<AiOutlineClose
								className='mt-0.5 hover:scale-110'
								id='remove'
								onClick={(e: Event) => handleRemove(e, tag)}
							/>
						</span>
					))}
				</div>
				<input
					type='text'
					value={tagInput}
					className='h-full focus:outline-none placeholder:text-sm w-[20%] disabled:cursor-not-allowed disabled:placeholder:line-through'
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
					placeholder='Tag name'
					disabled={tags.length >= 9 ? true : false}
					maxLength={20}
				/>
			</div>
		</>
	)
}

export default FlowTagInput
