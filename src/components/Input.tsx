import clsx from 'clsx'
import { ChangeEvent, FC, useState } from 'react'
import { IStoryForm } from '../types/IStoryForm'

interface Props {
	value: string
	onChange: (fields: Partial<IStoryForm>) => void
	type?: string
	name: string
	placeholder: string
	label: string
	subLabel?: string
	autoFocus?: boolean
	limitation?: boolean
	setIsError?: React.Dispatch<React.SetStateAction<boolean>>
}

const Input: FC<Props> = ({
	value,
	onChange,
	name,
	placeholder,
	type = 'text',
	label,
	subLabel,
	autoFocus = false,
	limitation,
	setIsError,
}) => {
	const [error, setError] = useState<string>('')
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		// Check number range
		if (limitation) {
			if (/^\d+$/.test(inputValue)) {
				const yearInt = parseInt(inputValue)
				const currentYear = new Date().getFullYear()

				onChange({ [name]: e.target.value })

				if (yearInt >= 1900 && yearInt <= currentYear) {
					setError('')
					setIsError && setIsError(false)
				} else {
					setError(`1900 - ${currentYear} numbers range!`)
					setIsError && setIsError(true)
				}
			} else if (!inputValue) {
				setError('')
				setIsError && setIsError(false)
			} else {
				setError('Must be only numbers!')
				setIsError && setIsError(true)
			}
		} else {
			setError('')
			setIsError && setIsError(false)
			// onChange({ [name]: e.target.value })
		}
		onChange({ [name]: e.target.value })
	}

	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={name} className='text-xs font-semibold text-dark'>
				{label}
				{subLabel && (
					<span className='ml-0.5 text-xs text-darkGray text-opacity-80'>
						{subLabel}
					</span>
				)}
				{error && (
					<span className='ml-2 text-xs text-red text-opacity-80'>{error}</span>
				)}
			</label>
			<input
				type={type}
				value={value}
				id={name}
				onChange={handleChange}
				autoFocus={autoFocus}
				required
				className={clsx(
					error ? 'border-red' : 'border-yellow',
					'w-full px-4 py-1.5 pb-2 text-sm border-2 rounded-lg border-yellow border-opacity-40 focus:outline-none focus:border-opacity-80 placeholder:text-sm'
				)}
				maxLength={50}
				placeholder={placeholder}
			/>
		</div>
	)
}

export default Input
