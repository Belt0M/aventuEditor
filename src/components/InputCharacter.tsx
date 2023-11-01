import { ChangeEvent, FC } from 'react'

interface Props {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>, field: string) => void
	type?: string
	name: string
	placeholder: string
	label: string
	autoFocus?: boolean
}

const InputCharacter: FC<Props> = ({
	value,
	onChange,
	name,
	placeholder,
	type = 'text',
	label,
	autoFocus = false,
}) => {
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={name} className='text-xs font-semibold text-dark'>
				{label}
			</label>
			<input
				type={type}
				value={value}
				id={name}
				onChange={e => onChange(e, name)}
				autoFocus={autoFocus}
				className='w-full px-4 py-1.5 pb-2 mb-4 text-sm border-2 rounded-lg border-yellow border-opacity-40 focus:outline-none focus:border-opacity-80 placeholder:text-sm'
				maxLength={50}
				placeholder={placeholder}
			/>
		</div>
	)
}

export default InputCharacter
