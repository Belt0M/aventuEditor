/* eslint-disable no-mixed-spaces-and-tabs */
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { HiSearch } from 'react-icons/hi'
import { IStoryForm } from '../types/IStoryForm'

interface Props {
	options: string[]
	maxHeight?: string
	onChange: (fields: Partial<IStoryForm>) => void
	name: string
	data: string[]
	label: string
}

const SelectMulti: React.FC<Props> = ({
	options,
	onChange,
	maxHeight = 'max-h-24',
	name,
	data: selectedData,
	label,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedValues, setSelectedValues] = useState<string[]>(
		selectedData ? selectedData : []
	)
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [data, setData] = useState<typeof options>(options)

	const filteredOptions = data.filter(option =>
		option.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleOptionClick = (value: string) => {
		const isSelected = selectedValues.includes(value)
		const newSelectedValues = isSelected
			? selectedValues.filter(val => val !== value)
			: [...selectedValues, value]

		setSelectedValues(newSelectedValues)
		const arrWithoutSelected = data.filter(el => el !== value)
		setData(arrWithoutSelected)

		// Global form set state
		onChange({ [name]: newSelectedValues })
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			const isInside = target.closest('.select-input')
			if (!isInside) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)

		// Global form set state
		onChange({ [name]: selectedValues })

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValues])

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

	const handleRemove = (e: Event, option: string) => {
		e.stopPropagation()
		setSelectedValues(selectedValues.filter(el => el !== option))
		setData([...data, option])
	}

	return (
		<div className='flex flex-col gap-2'>
			<label className='text-xs font-semibold text-dark'>{label}</label>
			<div className='relative text-left select-input'>
				<div>
					<button
						type='button'
						className={clsx(
							'flex items-center gap-2 overflow-y-hidden overflow-x-auto w-full px-4 py-[0.44rem] max-h-[37.2px] text-sm font-medium bg-white border-2 border-yellow border-opacity-40 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 focus:border-blue-300',
							isOpen && 'border-blue-300' // Adjust border style for active state
						)}
						onClick={handleButtonClick}
					>
						{selectedValues.length > 0 ? (
							selectedValues.map((value, index) => (
								<span
									key={index}
									className='z-40 flex items-center gap-3 px-4 py-1 text-xs bg-opacity-25 rounded-full bg-secondary'
								>
									{value}
									<AiOutlineClose
										className='mt-0.5 hover:scale-110'
										id='remove'
										onClick={(e: Event) => handleRemove(e, value)}
									/>
								</span>
							))
						) : (
							<span className='text-darkGray'>Select...</span>
						)}
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
									autoFocus
									onChange={e => setSearchTerm(e.target.value)}
								/>
							</div>

							<ul className={'py-2 overflow-auto ' + maxHeight}>
								{filteredOptions.length ? (
									filteredOptions.map(option => (
										<li
											key={option}
											className={clsx(
												'px-4 py-2 cursor-pointer hover:bg-gray-100',
												selectedValues.includes(option) &&
													'bg-blue-200 text-blue-800' // Highlight and change color for selected items
											)}
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

export default SelectMulti
