import { FC } from 'react'
import { IDecision } from '../types/IDecision'
import { TTab } from '../types/TTab'
import FlowCheckbox from './FlowCheckbox'
import FlowInput from './FlowInput'
import FlowTagInput from './FlowTagInput'

interface Props {
	type: TTab
	data: IDecision
	onChange: (
		data: string | number | boolean | string[],
		title: string,
		title2: 'wait' | 'a' | 'b'
	) => void
}

const DecisionTab: FC<Props> = ({ type, data, onChange }) => {
	const isWaitTab = type === 'Wait'
	const value = isWaitTab ? type : type === 'A' ? data.a!.title : data.b?.title
	return (
		<div className='py-3 min-h-44'>
			<FlowInput
				type='text'
				name='title'
				name2={type.toLowerCase()}
				label='Title'
				placeholder={isWaitTab ? type : 'Type a variant title...'}
				value={value!}
				onChangeNested={onChange}
				disabled={isWaitTab}
			/>
			{isWaitTab ? (
				<>
					<FlowInput
						name='duration'
						name2='wait'
						label='Wait TIme (seconds)'
						placeholder='Type a variant title...'
						value={data.wait!.duration}
						onChangeNested={onChange}
						type='number'
					/>
					<FlowCheckbox
						label='Looping'
						name='isLooping'
						name2='wait'
						value={data.wait!.isLooping}
						onChangeNested={onChange}
					/>
					<FlowInput
						name='audioFile'
						name2='wait'
						label='Audio File'
						placeholder='Audio File URL.'
						value={data.wait!.audioFile}
						onChangeNested={onChange}
						type='text'
					/>
				</>
			) : (
				<FlowTagInput
					onChangeNested={onChange}
					data={type === 'A' ? data.a!.tags : data.b!.tags}
					name='tags'
					name2={type.toLowerCase()}
					label='Triggers'
				/>
			)}
		</div>
	)
}

export default DecisionTab
