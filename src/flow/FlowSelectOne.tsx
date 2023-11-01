import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import { SlArrowDown } from 'react-icons/sl'

interface Props {
	options: string[]
	maxHeight?: string
	onChange: (data: string, title: string) => void
	name: string
	data?: string | null
	label: string
}

const FlowSelectOne: React.FC<Props> = ({
	options,
	onChange,
	maxHeight = 'max-h-24',
	name,
	data,
	label,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedValue, setSelectedValue] = useState<string | null>(
		data ? data : null
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
		onChange(value, name)
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
		<>
			<label className='text-xs font-semibold text-dark'>{label}</label>
			<div className='relative mt-1 mb-4 text-left select-input'>
				<div>
					<button
						type='button'
						value={selectedValue ? selectedValue : ''}
						className={clsx(
							!selectedValue ? 'text-darkGray' : 'text-gray-700',
							'flex justify-between items-center w-full px-4 py-[0.44rem] text-sm font-medium  bg-white border-2 border-yellow border-opacity-40 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 focus:border-blue-300'
						)}
						onClick={handleButtonClick}
						onChange={() => onChange('1', name)}
					>
						{selectedValue ? selectedValue : 'Select...'}
						<SlArrowDown
							className={clsx(isOpen && 'rotate-180', 'text-primary')}
						/>
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
		</>
	)
}

export default FlowSelectOne
