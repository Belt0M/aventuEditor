import { FC } from 'react'

const StoryLoader: FC = () => {
	return (
		<div className='flex flex-col justify-between p-2 bg-white shadow-storyShadow rounded-xl'>
			<div className='animate-pulse'>
				<div className='w-full rounded-lg h-42 aspect-square bg-slate-300'></div>
				<div>
					<div className='flex justify-between mt-4'>
						<div className='w-3/5 h-4 rounded bg-slate-300'></div>
						<div className='w-3 h-4 rounded bg-slate-300'></div>
					</div>
					<div className='w-2/5 h-2 mt-6 rounded bg-slate-300'></div>
					<div className='w-2/3 h-2 mt-2 rounded bg-slate-300'></div>
				</div>
			</div>
		</div>
	)
}

export default StoryLoader
