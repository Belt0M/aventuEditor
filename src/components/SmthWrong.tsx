import { PiSmileyXEyes } from 'react-icons/pi'

const SmthWrong = () => {
	return (
		<div className='w-full h-[22.5rem] bg-red bg-opacity-10 mt-4 rounded flex items-center justify-center flex-col gap-4 text-center text-red'>
			<PiSmileyXEyes className='text-[9rem]' />
			<div>
				<h1 className='text-2xl font-bold'>Oh no</h1>
				<p className='mt-1 text-lg'>Something Went Wrong</p>
			</div>
		</div>
	)
}

export default SmthWrong
