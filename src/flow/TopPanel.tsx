import { BiExport } from 'react-icons/bi'
import { BsFillPlayFill } from 'react-icons/bs'
import { FiSave } from 'react-icons/fi'
import FlowButton from './FlowButton'

const TopPanel = () => {
	return (
		<div className='absolute top-0 right-0 flex items-center justify-between left-24'>
			<FlowButton
				text='Play book'
				bgColor='transparent'
				textColor='primary'
				borderColor='primary'
				icon={<BsFillPlayFill className='text-2xl mt-0.5' />}
			/>
			<div className='flex gap-3'>
				<FlowButton
					text='Export book'
					bgColor='transparent'
					textColor='dark'
					borderColor='dark'
					icon={<BiExport className='-mt-0.5 text-2xl' />}
				/>
				<FlowButton
					text='Save changes'
					bgColor='darkGreen'
					textColor='white'
					borderColor='darkGreen'
					icon={<FiSave className='text-2xl mt-0.5' />}
				/>
			</div>
		</div>
	)
}

export default TopPanel
