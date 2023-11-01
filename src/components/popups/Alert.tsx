import { FC } from 'react'

interface Props {
	error: string
	type?: 'success' | 'error' | 'warning'
}

const Alert: FC<Props> = ({ error, type = 'error' }) => {
	const styles =
		type === 'error'
			? 'ring-red text-red bg-[#fad2e1]'
			: type === 'success'
			? 'ring-darkGreen text-darkGreen bg-[#d2faeb]'
			: 'ring-yellow text-yellow bg-[#faf4d2]'
	return (
		<div
			className={
				styles +
				' fixed top-10 left-1/2 -translate-x-1/2 ring-2 ring-opacity-60 z-50 flex justify-between py-4 px-8 font-semibold animate-opacity opacity-0 rounded-sm border-opacity-50'
			}
		>
			<p className='font-sans'>{error}</p>
		</div>
	)
}

export default Alert
