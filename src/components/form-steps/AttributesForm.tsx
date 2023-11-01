import { FC } from 'react'
import { collabData } from '../../data/collab.data'
import { regionsData } from '../../data/regions.data'
import FormWrapper from '../../layouts/FormWrapper'
import { TCollab } from '../../types/ICollab'
import { IStoryForm } from '../../types/IStoryForm'
import { TRegion } from '../../types/TRegion'
import Input from '../Input'
import SelectMulti from '../SelectMulti'
import SelectOne from '../SelectOne'
import TagInput from '../TagInput'

type FormData = {
	author: string
	copyHolder: string
	copyYear: string
	license: string
	collabs: TCollab[]
	credits: string
	regions: TRegion
	isbn: string
	tags: string[]
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
	isEdit: boolean
}

type Props = FormData & {
	updateFields: (fields: Partial<IStoryForm>) => void
}
const AttributesForm: FC<Props> = ({
	author,
	copyHolder,
	copyYear,
	credits,
	isbn,
	license,
	updateFields,
	tags,
	regions,
	collabs,
	setIsError,
	isEdit,
}) => {
	const today = new Date()
	const dateString = today.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
	const dateArr = dateString.split(' ')

	return (
		<FormWrapper title={`${isEdit ? 'Edit' : 'Add'} book attributes`}>
			<div className='flex flex-col h-full gap-4 pb-6 lg:gap-12 lg:flex-row'>
				<div className='flex flex-col w-full gap-4 lg:w-3/5'>
					<Input
						value={author}
						onChange={updateFields}
						name='author'
						placeholder='Type a book author...'
						label='Author'
						autoFocus={true}
					/>
					<Input
						value={copyHolder}
						onChange={updateFields}
						name='copyHolder'
						placeholder='Type the copyright holder data...'
						label='Copyright holder'
						subLabel='(Name of author or/and creator)'
					/>
					<Input
						value={license}
						onChange={updateFields}
						name='license'
						placeholder='Type a license...'
						label='License'
					/>
					<SelectMulti
						options={collabData}
						onChange={updateFields}
						name='collabs'
						maxHeight='max-h-32'
						data={collabs as string[]}
						label='Collaborators'
					/>
					<Input
						value={credits}
						onChange={updateFields}
						name='credits'
						placeholder='Type a credits...'
						label='Credits'
					/>
				</div>
				<div className='flex flex-col w-full gap-4 lg:w-2/5'>
					<Input
						value={copyYear}
						onChange={updateFields}
						name='copyYear'
						placeholder='Type a copyright year'
						label='Copyright year'
						limitation={true}
						setIsError={setIsError}
					/>
					<SelectOne
						options={regionsData}
						onChange={updateFields}
						name='regions'
						maxHeight='max-h-32'
						data={regions}
						label='Regions allowed'
					/>
					<Input
						value={isbn}
						onChange={updateFields}
						name='isbn'
						placeholder='Type an ISBN'
						label='ISBN'
					/>
					<TagInput onChange={updateFields} data={tags} />
					<p className='mt-2 text-sm text-darkGray'>
						This book has been created on the {dateArr[1].slice(0, 2)}th of{' '}
						{dateArr[0]}, {dateArr[2]}
					</p>
				</div>
			</div>
		</FormWrapper>
	)
}

export default AttributesForm
