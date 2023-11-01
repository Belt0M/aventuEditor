import { ChangeEvent, FC } from 'react'

interface Props {
	value: string
	onChange: (data: string, title: string) => void
	name: string
	placeholder: string
	label: string
	autoFocus?: boolean
	rows?: number
	required?: boolean
}

const FlowTextarea: FC<Props> = ({
	value,
	onChange,
	name,
	placeholder,
	label,
	autoFocus = false,
	rows = 3,
	required = false,
}) => {
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		// Check number range
		onChange(e.target.value, name)
	}

	return (
		<>
			<label htmlFor={name + 'F'} className='text-xs font-semibold text-dark'>
				{label}
			</label>
			<textarea
				value={value}
				id={name + 'F'}
				onChange={handleChange}
				autoFocus={autoFocus}
				required={required}
				className='w-full px-3 py-2 pb-2 mt-1 mb-4 text-sm border-2 rounded-lg resize-none focus:outline-none focus:border-opacity-100 placeholder:text-xs border-yellow border-opacity-40'
				maxLength={50}
				placeholder={placeholder}
				rows={rows}
			/>
		</>
	)
}

export default FlowTextarea
