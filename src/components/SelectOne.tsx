import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import { IStoryForm } from '../types/IStoryForm'

interface Props {
	options: string[]
	maxHeight?: string
	onChange: (fields: Partial<IStoryForm>) => void
	name: string
	data?: string | null
	label: string
}

const SelectOne: React.FC<Props> = ({
	options,
	onChange,
	maxHeight = 'max-h-24',
	name,
	data,
	label,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedValue, setSelectedValue] = useState<string>(
		data ? data : options[0]
	)
	const [searchTerm, setSearchTerm] = useState<string>('')

	const filteredOptions = options.filter(option =>
		option.toLowerCase().includes(searchTerm.toLowerCase())
	)

	// Close modal on option click and set value
	const handleOptionClick = (value: string) => {
		// Local state set value
		setSelectedValue(value)
		// Global form set state
		onChange({ [name]: value })
		setIsOpen(false)
	}

	// Listening on click outside to close modal
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			const isInside = target.closest('.select-input')
			if (!isInside) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Handling option Select button click
	const handleButtonClick = () => {
		setIsOpen(!isOpen)
		if (!isOpen) {
			setTimeout(() => {
				window.scrollTo({
					top: 500,
					behavior: 'smooth',
				})
			}, 0)
		}
	}

	return (
		<div className='flex flex-col gap-2'>
			<label className='text-xs font-semibold text-dark'>{label}</label>
			<div className='relative text-left select-input'>
				<div>
					<button
						type='button'
						value={selectedValue}
						className={clsx(
							!selectedValue ? 'text-darkGray' : 'text-gray-700',
							'flex justify-between w-full px-4 py-[0.44rem] text-sm font-medium bg-white border-2 border-yellow border-opacity-40 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 focus:border-blue-300'
						)}
						onClick={handleButtonClick}
						onChange={() => onChange({ [name]: '1' })}
					>
						{selectedValue ? selectedValue : 'Select...'}
					</button>
				</div>

				{isOpen && (
					<div className={'absolute z-50 w-full mt-2 pb-8'}>
						<div className='relative bg-white border border-gray-300 rounded-md shadow-md'>
							<div className='flex items-center p-2'>
								<HiSearch className='text-gray-400' />
								<input
									type='text'
									className='w-full pl-2 text-sm outline-none'
									placeholder='Search...'
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
								/>
							</div>

							<ul className={'py-2 overflow-auto ' + maxHeight}>
								{filteredOptions.length ? (
									filteredOptions.map(option => (
										<li
											key={option}
											className='px-4 py-2 cursor-pointer hover:bg-gray-100'
											onClick={() => handleOptionClick(option)}
										>
											{option}
										</li>
									))
								) : (
									<li className='px-4 py-2 text-darkGray'>No results</li>
								)}
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default SelectOne
