import { FC } from 'react'

interface Props {
	error: string
	type?: 'success' | 'error' | 'warning'
}

const SideAlert: FC<Props> = ({ error, type = 'error' }) => {
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
				' fixed bottom-10 right-8 ring-2 ring-opacity-60 z-40 flex justify-between py-4 px-4 font-semibold animate-opacity opacity-0 rounded-sm border-opacity-50'
			}
		>
			<p className='font-sm'>{error}</p>
		</div>
	)
}

export default SideAlert
