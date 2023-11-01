import clsx from 'clsx'
import { FC } from 'react'
import { BsCheck } from 'react-icons/bs'
import { formStepsData } from '../data/form-steps.data'
import SidebarWrapper from '../layouts/SidebarWrapper'

type Props = {
	stepIndex: number
	isEdit: boolean
}

const FormSidebar: FC<Props> = ({ stepIndex, isEdit }) => {
	return (
		<SidebarWrapper padding='px-8 pt-40'>
			{formStepsData.map((step, index) => (
				<div
					key={step.title}
					className={clsx(
						(stepIndex === 1 && index === 0) || (stepIndex === 2 && index !== 2)
							? 'active-link'
							: 'opacity-40',
						'flex items-center gap-2 mb-4 text-sm font-bold',
						stepIndex === index && 'opacity-80'
					)}
				>
					{/* Some of step links active css logic in main.css file */}
					<span className='relative grid w-8 h-8 pb-0.5 rounded-full bg-midGray place-items-center'>
						{index + 1}
						<div className='absolute hidden w-full h-full text-xl text-white rounded-full check-mark place-items-center bg-darkGreen'>
							<BsCheck className='pr-0.5' />
						</div>
					</span>
					<span>
						{(isEdit ? step.prefixes[1] : step.prefixes[0]) + step.title}
					</span>
				</div>
			))}
		</SidebarWrapper>
	)
}

export default FormSidebar
