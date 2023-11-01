import { ChangeEvent, DragEvent, FC, useRef, useState } from 'react'

interface Props {
	name: string
	onChange: (data: string, title: string) => void
}

const FlowUpload: FC<Props> = ({ name, onChange }) => {
	const [fileData, setFileData] = useState<string | null>()
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
				const base64 = (reader.result as string).split(',')[1]
				setFileData(file.name)
				// Set global form state
				onChange(base64!, name)
			}
			reader.readAsDataURL(file)
		}
	}

	// Set file on drop
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()

		const file = e.dataTransfer.files[0]
		toBase64(file)
	}

	// On common file upload set file
	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]
		toBase64(file)
	}

	// Open file choose window on button click
	const handleClick = () => {
		inputRef.current?.click()
	}

	return (
		<>
			<div
				className='flex items-center lg:justify-start justify-center lg:flex-row flex-col w-full px-4 py-2 mt-1 mb-4 text-sm border-2 rounded-lg cursor-pointer focus:outline-none focus:border-opacity-100 placeholder:text-xs border-yellow border-opacity-40 text-[0.85rem]'
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={handleClick}
			>
				<span className='font-semibold text-center text-darkGray'>
					Drag and Drop your Files here or
				</span>
				<button type='button' className='ml-2 font-bold text-primary min-w-max'>
					Browse files
				</button>
				<input
					type='file'
					onChange={handleChange}
					accept='.mp3'
					ref={inputRef}
					className='absolute hidden'
					name='file'
				/>

				{fileData && (
					<div className='w-full ml-2 overflow-hidden text-center underline lg:w-2/5'>
						{fileData}
					</div>
				)}
			</div>
		</>
	)
}

export default FlowUpload
