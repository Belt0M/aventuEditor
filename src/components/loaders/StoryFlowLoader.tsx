const StoryFlowLoader = () => {
	const mockCharacters = [...Array(5).keys()]
	return (
		<div className='flex h-[14.5rem] gap-4 p-3 bg-white shadow-storyShadow animate-pulse'>
			<div className='h-full rounded-2xl aspect-square bg-slate-300' />
			<div className='w-full'>
				<div className='w-48 h-6 mt-2 rounded bg-slate-300' />
				<div className='w-20 h-4 mt-4 rounded bg-slate-300' />
				<div className='grid grid-cols-5 grid-rows-1 gap-4 pt-2 mt-3 overflow-y-auto h-3/5'>
					{mockCharacters.map(el => (
						<div
							key={el}
							className='h-full w-[13.5	rem] bg-slate-300 rounded-2xl'
						></div>
					))}
				</div>
			</div>
		</div>
	)
}

export default StoryFlowLoader
