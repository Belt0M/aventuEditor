import clsx from 'clsx'
import { isEqual } from 'lodash'
import React, { FC, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiEditAlt } from 'react-icons/bi'
import { BsFillPlayFill } from 'react-icons/bs'
import { IoReload } from 'react-icons/io5'
import { VscTrash } from 'react-icons/vsc'
import CancelSavePanel from '../../components/CancelSavePanel'
import Alert from '../../components/popups/Alert'
import Confirm from '../../components/popups/Confirm'
import { bgSoundData } from '../../data/bgSound.data'
import { decisionTabs } from '../../data/decisions-tabs.data'
import { initDecisionNode } from '../../data/init-decision-node'
import { voicesData } from '../../data/voices.data'
import { storiesApi } from '../../services/stories.api'
import { IDecision } from '../../types/IDecision'
import { TTab } from '../../types/TTab'
import DecisionTab from '../DecisionTab'
import FlowButton from '../FlowButton'
import FlowInput from '../FlowInput'
import FlowSelectOne from '../FlowSelectOne'
import FlowTextarea from '../FlowTextarea'
import FlowUpload from '../FlowUpload'

interface Props {
	setModalType: (value: React.SetStateAction<string>) => void
	nodeId: number
	storyId: string
}

const DecisionModal: FC<Props> = ({ setModalType, nodeId, storyId }) => {
	// PATCH and GET requests import
	const [updateNodeData, { isError: updateError }] =
		storiesApi.useUpdateNodeDataMutation()
	const {
		data: fetchedNode,
		isLoading: getLoading,
		isError: getError,
	} = storiesApi.useGetOneNodeQuery({
		nodeId,
		storyId: parseInt(storyId),
	})
	const [initData, setInitData] = useState<IDecision | null>(null)
	const [data, setData] = useState<IDecision>(
		fetchedNode ? (fetchedNode.data as IDecision) : initDecisionNode
	)
	const [isGenerated, setIsGenerated] = useState<boolean>(false)
	const [currentTab, setCurrentTab] = useState<TTab>('Wait')
	const [isChanged, setIsChanged] = useState<boolean>(false)
	const [isConfirm, setIsConfirm] = useState<boolean>(false)

	// A deep comparison of two IDecision objects (data, initDecisionNode) to set isChanged state
	useEffect(() => {
		const areObjectsEqual = (obj1: IDecision, obj2: IDecision): boolean => {
			return isEqual(obj1, obj2)
		}
		const result = areObjectsEqual(data, initData!)
		setIsChanged(!result)
	}, [data, initData])

	// Set data after fetching
	useEffect(() => {
		if (fetchedNode) {
			setData(fetchedNode?.data as IDecision)
			setInitData(fetchedNode?.data as IDecision)
		}
	}, [fetchedNode])

	// Close modal on outside click
	const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
		const el = e.target as HTMLDivElement
		if (el.getAttribute('id') === 'outside') {
			handleClose()
		}
	}

	// Change handler for all input fields
	const handleChange = (
		data: string | number | boolean | string[],
		title: string
	) => {
		setData(prev => ({ ...prev, [title]: data }))
	}

	// Change handler for all input fields with nested object data
	const handleChangeNested = (
		data: string | number | boolean | string[],
		title: string,
		title2: 'wait' | 'a' | 'b'
	) => {
		setData(prev => ({ ...prev, [title2]: { ...prev[title2], [title]: data } }))
	}

	// Handle close button click
	const handleClose = () => {
		isChanged ? setIsConfirm(true) : setModalType('')
	}

	// Mock on Generate button handler
	const handleGenerate = () => {
		setIsGenerated(prev => !prev)
	}

	// On submit handle | send PATCH request
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		console.log(data)
		updateNodeData({
			nodeData: data,
			nodeId: nodeId,
			storyId: parseInt(storyId),
		})
		setModalType('')
	}

	return (
		<div
			className='fixed inset-0 z-50 flex justify-end bg-opacity-40 bg-dark'
			onClick={handleClickOutside}
			id='outside'
		>
			{!getLoading && (
				<form
					className='relative w-[46.5%] h-full bg-white pt-3 px-5 border-l-[.4rem] border-blue rounded-xl overflow-y-auto'
					onSubmit={(e: FormEvent) => handleSubmit(e)}
				>
					<h2 className='mb-2 text-xl font-bold'>Edit decision node</h2>
					<FlowInput
						label='Title'
						name='title'
						placeholder='This is the title...'
						onChange={handleChange}
						value={data.title!}
					/>
					<FlowTextarea
						label='Content'
						name='description'
						placeholder='Type a content...'
						onChange={handleChange}
						value={data.description!}
						rows={6}
					/>
					<FlowSelectOne
						name='characters'
						onChange={handleChange}
						options={voicesData as string[]}
						data={null}
						label='Voice'
					/>
					<div className='flex items-center justify-center gap-2 py-0 text-sm text-darkGray'>
						<span className='w-24 h-[0.1rem] bg-darkGray' />
						<span className='pb-1'>or</span>
						<span className='w-24 h-[0.1rem] bg-darkGray' />
					</div>
					<FlowUpload name='audioFile' onChange={handleChange} />

					{isGenerated ? (
						<div className='flex flex-wrap items-center'>
							<FlowButton
								bgColor='transparent'
								borderColor='primary'
								text='Play'
								textColor='primary'
								icon={<BsFillPlayFill className='text-2xl mt-0.5' />}
								pb='pb-2 '
								pt='pt-1.5 '
							/>
							<FlowButton
								bgColor='transparent'
								borderColor='red'
								text='Delete'
								textColor='red'
								icon={<VscTrash className='text-2xl mt-0.5' />}
								pb='pb-2 '
								pt='pt-1.5 '
							/>
							<FlowButton
								bgColor='transparent'
								borderColor='blue'
								text='Regenerate'
								textColor='blue'
								icon={<IoReload className='text-2xl mt-0.5' />}
								pb='pb-2 '
								pt='pt-1.5 '
							/>
							<FlowButton
								bgColor='transparent'
								borderColor='blue'
								text='Edit'
								textColor='blue'
								icon={<BiEditAlt className='text-2xl mt-0.5' />}
								pb='pb-2 '
								pt='pt-1.5 '
							/>
						</div>
					) : (
						<FlowButton
							bgColor='transparent'
							borderColor='blue'
							text='Generate'
							textColor='blue'
							icon={
								<IoReload className='text-2xl mt-0.5 -scale-x-100 scale-y-100' />
							}
							pb='pb-2 '
							pt='pt-1.5 '
							onClick={handleGenerate}
						/>
					)}

					<FlowSelectOne
						name='audioFileId'
						onChange={handleChange}
						options={bgSoundData}
						data={data.audioFileId}
						label='Background sound'
					/>
					<div className='relative flex items-center gap-1 before:h-[.1rem] before:w-full before:bg-darkGray before:absolute before:left-0 before:bottom-0 before:z-0 before:bg-opacity-50'>
						{decisionTabs.map(tab => (
							<button
								type='button'
								key={tab}
								className={clsx(
									tab === currentTab ? 'border-blue text-blue' : 'border-b-0',
									'py-2.5 px-3.5 text-sm border-b-2 font-semibold z-10'
								)}
								onClick={() => setCurrentTab(tab)}
							>
								{tab}
							</button>
						))}
					</div>
					{currentTab === 'Wait' && (
						<DecisionTab
							type={currentTab}
							data={data}
							onChange={handleChangeNested}
						/>
					)}
					{currentTab === 'A' && (
						<DecisionTab
							type={currentTab}
							data={data}
							onChange={handleChangeNested}
						/>
					)}
					{currentTab === 'B' && (
						<DecisionTab
							type={currentTab}
							data={data}
							onChange={handleChangeNested}
						/>
					)}
					<CancelSavePanel
						isChanged={isChanged}
						setIsConfirm={setIsConfirm}
						setModalType={setModalType}
					/>
				</form>
			)}

			<AiOutlineClose
				className='absolute text-lg transition-all duration-300 cursor-pointer top-3 right-3 hover:scale-110'
				onClick={handleClose}
			/>
			{/* Handle request responses */}
			{updateError && <Alert error='Error: Failed to save data!' />}
			{getError && <Alert error='Error: Failed to get Node data!' />}
			{/* On Close confirm popup */}
			{isConfirm && (
				<Confirm setModalType={setModalType} setIsConfirm={setIsConfirm} />
			)}
		</div>
	)
}

export default DecisionModal
