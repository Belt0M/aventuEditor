import { FC } from 'react'
import { IStoryForm } from '../types/IStoryForm'

interface Props {
	value: string
	onChange: (fields: Partial<IStoryForm>) => void
	name: string
	placeholder: string
	label: string
	rows: number
	autoFocus?: boolean
}

const Textarea: FC<Props> = ({
	value,
	onChange,
	name,
	placeholder,
	label,
	rows,
	autoFocus,
}) => {
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={name} className='text-xs font-semibold text-dark'>
				{label}
			</label>
			<textarea
				value={value}
				id={name}
				onChange={e => onChange({ [name]: e.target.value })}
				autoFocus={autoFocus}
				required
				className='w-full px-4 py-1.5 pb-2 text-sm border-2 rounded-lg border-yellow border-opacity-40 focus:outline-none focus:border-opacity-80 placeholder:text-sm resize-none'
				maxLength={50}
				placeholder={placeholder}
				rows={rows}
			/>
		</div>
	)
}

export default Textarea
