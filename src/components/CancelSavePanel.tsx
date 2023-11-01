import { FC } from 'react'

interface Props {
	isChanged: boolean
	setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>
	setModalType: (value: React.SetStateAction<string>) => void
}

const CancelSavePanel: FC<Props> = ({
	isChanged,
	setIsConfirm,
	setModalType,
}) => {
	const handleClick = () => {
		isChanged ? setIsConfirm(true) : setModalType('')
	}

	return (
		<div className='sticky bottom-0 left-0 right-0 z-50 flex items-center justify-end w-full gap-4 px-4 py-3 bg-white border-t-2 border-opacity-50 border-darkGray'>
			<button
				type='button'
				className='px-6 py-2 pb-2.5 text-xs font-semibold border-2 text-dark rounded-lg border-dark border-opacity-50'
				onClick={handleClick}
			>
				Cancel
			</button>
			<button
				type='submit'
				className='px-7 py-2 pb-2.5 text-xs font-semibold text-white transition border-2 rounded-lg bg-darkGreen hover:brightness-110 border-darkGreen disabled:opacity-50 disabled:hover:brightness-100 disabled:cursor-not-allowed'
				disabled={!isChanged}
			>
				Save Changes
			</button>
		</div>
	)
}

export default CancelSavePanel
