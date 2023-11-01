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
import { initNarrativeNode } from '../../data/init-narrative-node'
import { voicesData } from '../../data/voices.data'
import { storiesApi } from '../../services/stories.api'
import { INarrative } from '../../types/INarrative'
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

const NarrativeModal: FC<Props> = ({ setModalType, nodeId, storyId }) => {
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
	const [initData, setInitData] = useState<INarrative | null>(null)
	const [data, setData] = useState<INarrative>(
		fetchedNode ? (fetchedNode.data as INarrative) : initNarrativeNode
	)
	const [isGenerated, setIsGenerated] = useState<boolean>(false)
	const [isChanged, setIsChanged] = useState<boolean>(false)
	const [isConfirm, setIsConfirm] = useState<boolean>(false)

	// A deep comparison of two IDecisionNode objects (data, initDecisionNode) to set isChanged state
	useEffect(() => {
		const areObjectsEqual = (obj1: INarrative, obj2: INarrative): boolean => {
			return isEqual(obj1, obj2)
		}
		const result = areObjectsEqual(data, initData!)
		setIsChanged(!result)
	}, [data, initData])

	// Set data after fetching
	useEffect(() => {
		if (fetchedNode) {
			setData(fetchedNode?.data as INarrative)
			setInitData(fetchedNode?.data as INarrative)
		}
	}, [fetchedNode])

	// Close modal on outside click
	const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
		const el = e.target as HTMLDivElement
		if (el.getAttribute('id') === 'outside') {
			handleClose()
		}
	}

	// Handle close button click
	const handleClose = () => {
		isChanged ? setIsConfirm(true) : setModalType('')
	}

	// Change handler for all input fields
	const handleChange = (
		data: string | number | boolean | string[],
		title: string
	) => {
		console.log(title, ' : ', data)
		setData(prev => ({ ...prev, [title]: data }))
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
			{!getLoading && data!.characters != null && (
				<form
					className='relative w-[46.5%] h-full bg-white pt-3 px-5 border-l-[.4rem] border-blue rounded-xl overflow-y-auto'
					onSubmit={(e: FormEvent) => handleSubmit(e)}
				>
					<div className='min-h-[calc(100%-62.8px)]'>
						<h2 className='mb-2 text-xl font-bold'>Edit narrative node</h2>
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
							data={data.characters[0] ? data.characters[0].name : null}
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
							name='bgSound'
							onChange={handleChange}
							options={bgSoundData}
							data={data.audioFileId}
							label='Background sound'
						/>
					</div>
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

export default NarrativeModal
