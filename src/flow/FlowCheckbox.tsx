import clsx from 'clsx'
import { ChangeEvent, FC } from 'react'
import { BsCheckLg } from 'react-icons/bs'

interface Props {
	value: boolean
	onChangeNested: (
		data: string | number | boolean | string[],
		title: string,
		title2: 'wait' | 'a' | 'b'
	) => void
	name: string
	name2: string
	label: string
}

const FlowCheckbox: FC<Props> = ({
	value,
	onChangeNested,
	name,
	label,
	name2,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		// Check number range
		const data = e.target.checked
		onChangeNested(data, name, name2 as 'wait' | 'a' | 'b')
	}

	return (
		<>
			<label htmlFor={name} className='text-xs font-semibold text-dark'>
				{label}
			</label>
			<input
				type='checkbox'
				checked={value}
				id={name}
				onChange={handleChange}
				className='hidden'
			/>
			<div className='flex items-center gap-2 my-2'>
				<label
					htmlFor={name}
					className={clsx(
						value ? 'text-white bg-yellow' : 'bg-white text-yellow',
						'grid w-6 h-6 text-base border-2 rounded-md place-items-center border-yellow cursor-pointer'
					)}
				>
					<BsCheckLg />
				</label>
				<span className='text-xs text-dark'>
					{value ? 'Disable looping' : 'Enable looping'}
				</span>
			</div>
		</>
	)
}

export default FlowCheckbox
