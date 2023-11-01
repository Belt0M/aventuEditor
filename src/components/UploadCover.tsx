import { ChangeEvent, DragEvent, FC, useRef, useState } from 'react'
import { PiUpload } from 'react-icons/pi'
import { IStoryForm } from '../types/IStoryForm'
import { checkFile } from '../utils/checkFile'

interface Props {
	name: string
	onChange: (fields: Partial<IStoryForm>) => void
	isEdit: boolean
}

const UploadCover: FC<Props> = ({ name, onChange, isEdit }) => {
	const [photoData, setPhotoData] = useState<string | null>(name)
	const inputRef = useRef<HTMLInputElement>(null)

	//Prevent common dragOver behavior
	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	}

	// Image to base64 format
	const toBase64 = (file: File) => {
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const base64 = reader.result as string
				setPhotoData(base64)
				// Set global form state
				onChange({ cover: base64! })
			}
			reader.readAsDataURL(file)
		}
	}

	// Set file on drop
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()

		const file = e.dataTransfer.files[0]
		if (!checkFile(file)) {
			// setError()
			return
		}
		toBase64(file)
	}

	// On common file upload set file
	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]

		if (!checkFile(file)) {
			return
		}
		toBase64(file)
	}

	// Open file choose window on button click
	const handleClick = () => {
		inputRef.current?.click()
	}

	return (
		<>
			<label htmlFor='cover' className='text-xs font-semibold text-dark'>
				Cover Photo
			</label>
			<div className='border-2 rounded-lg border-yellow border-opacity-40 min-w-[16rem] flex-1'>
				<div
					className='relative flex flex-col items-center justify-center w-full h-full p-3 cursor-pointer'
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					onClick={handleClick}
				>
					<PiUpload className='w-24 h-24 p-5 border-2 rounded-full border-primary border-opacity-40 text-primary' />
					<span className='mt-3 text-sm font-semibold text-center text-darkGray'>
						Drag and Drop
						<br />
						or
					</span>
					<button type='button' className='text-sm font-bold text-primary'>
						Browse files
					</button>
					<p className='mt-4 text-xs font-semibold text-center text-darkGray'>
						File must be JPG, JPEG, PNG and up to 17MG.
						<br />
						(Max. Recommended size 250x250px))
					</p>
					<input
						type='file'
						onChange={handleChange}
						accept='image/png, image/jpeg'
						ref={inputRef}
						className='absolute opacity-0'
						name='file'
					/>

					{isEdit ? (
						<div className='w-1/5 mt-4 overflow-hidden max-h-32'>
							<img src={name} alt='Chosen image' className='w-full ' />
						</div>
					) : (
						photoData && (
							<div className='w-1/5 mt-4 overflow-hidden max-h-32'>
								<img src={photoData} alt='Chosen image' className='w-full ' />
							</div>
						)
					)}
				</div>
			</div>
		</>
	)
}

export default UploadCover
