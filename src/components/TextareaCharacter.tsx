import { ChangeEvent, FC } from 'react'

interface Props {
	value: string
	onChange: (e: ChangeEvent<HTMLTextAreaElement>, field: string) => void
	name: string
	placeholder: string
	label: string
	rows: number
	autoFocus?: boolean
}

const TextareaCharacter: FC<Props> = ({
	value,
	onChange,
	name,
	placeholder,
	label,
	rows,
	autoFocus = false,
}) => {
	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={name} className='text-xs font-semibold text-dark'>
				{label}
			</label>
			<textarea
				value={value}
				id={name}
				onChange={e => onChange(e, name)}
				autoFocus={autoFocus}
				className='w-full px-4 py-1.5 pb-2 text-sm border-2 rounded-lg border-yellow border-opacity-40 focus:outline-none focus:border-opacity-80 placeholder:text-sm resize-none'
				maxLength={50}
				placeholder={placeholder}
				rows={rows}
			/>
		</div>
	)
}

export default TextareaCharacter
