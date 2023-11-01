import { ChangeEvent, FC } from 'react'

interface Props {
	value: string | number
	onChange?: (data: string | number, title: string) => void
	onChangeNested?: (
		data: string | number | boolean | string[],
		title: string,
		title2: 'wait' | 'a' | 'b'
	) => void
	type?: string
	name: string
	placeholder: string
	label: string
	autoFocus?: boolean
	disabled?: boolean
	name2?: string
	required?: boolean
}

const FlowInput: FC<Props> = ({
	value,
	onChange,
	name,
	placeholder,
	type = 'text',
	label,
	autoFocus = false,
	disabled = false,
	onChangeNested,
	name2,
	required = false,
}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		// Check number range
		const data = e.target.value

		onChange &&
			onChange(typeof value === 'number' ? parseInt(data) : data, name)
		onChangeNested && onChangeNested(data, name, name2 as 'wait' | 'a' | 'b')
	}

	return (
		<>
			<label htmlFor={name} className='text-xs font-semibold text-dark'>
				{label}
			</label>
			<input
				type={type}
				value={value}
				id={name}
				onChange={handleChange}
				autoFocus={autoFocus}
				disabled={disabled}
				required={required}
				className='w-full px-3 py-1 pb-2 mt-1 mb-4 text-sm border-2 rounded-lg focus:outline-none focus:border-opacity-100 placeholder:text-xs border-yellow border-opacity-40 disabled:text-darkGray disabled:cursor-not-allowed'
				maxLength={50}
				placeholder={placeholder}
			/>
		</>
	)
}

export default FlowInput
