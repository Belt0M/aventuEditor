import { FC, FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormSidebar from '../components/FormSidebar'
import AttributesForm from '../components/form-steps/AttributesForm'
import CharactersFrom from '../components/form-steps/CharactersForm'
import StoryForm from '../components/form-steps/StoryForm'
import Alert from '../components/popups/Alert'
import { initialStory } from '../data/initital-story.data'
import { useMultistepForm } from '../hooks/useMultistepForm'
import { storiesApi } from '../services/stories.api'
import { IStory } from '../types/IStory'
import { IStoryForm } from '../types/IStoryForm'

const CreatePage: FC = () => {
	const location = useLocation()
	const storyData = location.state?.story
	const [data, setData] = useState<IStory>(initialStory)
	const [createStory, { isError: createError, isSuccess: createSuccess }] =
		storiesApi.useCreateStoryMutation()
	const [updateStory, { isError: updateError, isSuccess: updateSuccess }] =
		storiesApi.useUpdateStoryMutation()
	const navigate = useNavigate()
	const [isError, setIsError] = useState<boolean>(false)
	// Is current form opened for creating or editing
	const [isEdit, setIsEdit] = useState<boolean>(false)

	// Check whether that's create or edit page
	useEffect(() => {
		if (location.pathname === '/edit') {
			setData(storyData)
			setIsEdit(true)
		}
	}, [location.pathname, storyData])

	// Main update form state handler
	const updateFields = (fields: Partial<IStoryForm>) => {
		setData(prev => {
			return { ...prev, ...fields }
		})
	}

	// Multistep form hook
	const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
		useMultistepForm([
			<StoryForm {...data} updateFields={updateFields} isEdit={isEdit} />,
			<CharactersFrom
				{...data}
				setData={setData}
				updateFields={updateFields}
				isEdit={isEdit}
			/>,
			<AttributesForm
				{...data}
				setIsError={setIsError}
				updateFields={updateFields}
				isEdit={isEdit}
			/>,
		])

	// Create story handler
	const handleCreate = async () => {
		data.status = 'published'
		// If editing mode - PATCH Request, if creating - POST
		isEdit ? updateStory(data) : createStory(data)

		// Check whether we've receiver response from server, then navigate
		setTimeout(() => {
			if (!createError || !updateError) {
				navigate('/')
			}
		}, 2000)
	}

	// Submit handler
	const onSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (!isLastStep) return next()
		// When it's the last step and there's no empty field -> create story and redirect to Overview Page
		handleCreate()
	}

	return (
		<main className='flex'>
			<FormSidebar stepIndex={currentStepIndex} isEdit={isEdit} />
			<section className='w-5/6 pt-4 pb-2 pl-4 pr-16 ml-64'>
				<form
					onSubmit={onSubmit}
					className='flex flex-col h-auto gap-4 px-5 pt-4 md:px-10 md:pt-8 shadow-storyShadow rounded-3xl'
				>
					{step}
					<div className='flex items-center justify-end w-full h-20 gap-4 border-t-2 border-dark border-opacity-20'>
						<button
							type='button'
							onClick={back}
							className='px-6 py-2 pb-2.5 text-xs font-semibold text-dark rounded-lg border-2 border-dark border-opacity-50'
						>
							{isFirstStep ? 'Cancel' : 'Back step'}
						</button>
						<button
							type='submit'
							className='px-7 py-2 pb-2.5 text-xs font-semibold text-white transition border-2 rounded-lg bg-darkGreen hover:brightness-110 border-darkGreen disabled:opacity-50 disabled:hover:brightness-100 disabled:cursor-not-allowed'
							disabled={
								(currentStepIndex === 1 && !data.characters.length) || isError
									? true
									: false
							}
						>
							{isLastStep
								? isEdit
									? 'Finish editing'
									: 'Finish Story'
								: 'Next step'}
						</button>
					</div>
				</form>
			</section>
			{createError && <Alert error='Error: Failed to create story' />}
			{updateError && <Alert error='Error: Failed to edit story' />}
			{createSuccess && (
				<Alert error='Success: Story was successfully created' type='success' />
			)}
			{updateSuccess && (
				<Alert error='Success: Story was successfully edited' type='success' />
			)}
		</main>
	)
}

export default CreatePage
