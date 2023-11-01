import { FC } from 'react'
import { audienceData } from '../../data/audience.data'
import { languagesData } from '../../data/lanuages.data'
import FormWrapper from '../../layouts/FormWrapper'
import { TAudience } from '../../types/IAudience'
import { IStoryForm } from '../../types/IStoryForm'
import { TLanguage } from '../../types/TLanguage'
import Input from '../Input'
import SelectOne from '../SelectOne'
import Textarea from '../Textarea'
import UploadCover from '../UploadCover'

type FormDataStep1 = {
	title: string
	desc: string
	summary: string
	language: TLanguage | null
	audience: TAudience | null
	cover: string
	isEdit: boolean
}

type Props = FormDataStep1 & {
	updateFields: (fields: Partial<IStoryForm>) => void
}

const StoryForm: FC<Props> = ({
	desc,
	summary,
	title,
	cover,
	language,
	audience,
	updateFields,
	isEdit,
}) => {
	return (
		<FormWrapper title={`${isEdit ? 'Edit' : 'Create'} your story`}>
			<div className='flex flex-col h-[90%] gap-4 lg:gap-12 lg:flex-row'>
				<div className='flex flex-col justify-between w-full gap-4 xl:w-3/5 lg:h-full h-3/5'>
					<Input
						value={title}
						onChange={updateFields}
						name='title'
						placeholder='Type a story title...'
						label='Title'
						autoFocus={true}
					/>
					<Textarea
						value={desc}
						onChange={updateFields}
						name='desc'
						placeholder='Type a story description...'
						label='Description'
						rows={2}
					/>
					<Textarea
						value={summary}
						onChange={updateFields}
						name='summary'
						placeholder='Type a story summary...'
						label='Summary'
						rows={3}
					/>
					<SelectOne
						options={languagesData}
						maxHeight='max-h-32'
						onChange={updateFields}
						name='language'
						data={language as string}
						label='Language'
					/>
					<SelectOne
						options={audienceData}
						onChange={updateFields}
						name='audience'
						data={audience as string}
						label='Audience'
					/>
				</div>
				<div className='flex flex-col w-full lg:min-h-[100%] lg:h-auto lg:w-2/5 h-2/5 gap-2'>
					<UploadCover onChange={updateFields} name={cover} isEdit={isEdit} />
				</div>
			</div>
		</FormWrapper>
	)
}

export default StoryForm
