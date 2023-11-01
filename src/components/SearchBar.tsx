import { ChangeEvent, FC } from 'react'
import { FiSearch } from 'react-icons/fi'

type Props = {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	value: string
}

const SearchBar: FC<Props> = ({ onChange, value }) => {
	return (
		<div className='flex items-center justify-center py-4 pl-2 mt-20 border-b-2 3xl:mt-28 border-opacity-40 border-secondary'>
			<FiSearch className='w-1/5 text-xl text-secondary' />
			<input
				type='text'
				onChange={onChange}
				value={value}
				className='w-4/5 px-2 focus:outline-none'
				maxLength={30}
			/>
		</div>
	)
}

export default SearchBar
