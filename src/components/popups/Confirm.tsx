import { FC } from 'react'
import { BsExclamationLg } from 'react-icons/bs'

interface Props {
	setModalType: (value: React.SetStateAction<string>) => void
	setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

const Confirm: FC<Props> = ({ setModalType, setIsConfirm }) => {
	const handleClose = () => {
		setIsConfirm(false)
		setModalType('')
	}

	return (
		<div className='fixed inset-0 grid bg-dark bg-opacity-30 place-items-center z-[100]'>
			<div className='flex flex-col justify-between w-[26rem] p-6 pt-10 text-center bg-white rounded-sm h-72 items-center'>
				<BsExclamationLg className='p-3 border-2 rounded-full text-7xl text-yellow border-yellow' />
				<div className='relative -top-2'>
					<h1 className='text-xl font-semibold'>Are you sure?</h1>
					<p className='mt-2 text-sm'>
						You will not able to recover changed data!
					</p>
				</div>
				<div className='flex justify-center gap-3 text-sm text-white'>
					<button
						className='px-6 py-2 pb-2.5 bg-darkBlue hover:brightness-110 transition-all'
						onClick={handleClose}
					>
						Yes, close it
					</button>
					<button
						className='px-6 py-2 pb-2.5 bg-red brightness-125 hover:brightness-110 transition-all'
						onClick={() => setIsConfirm(false)}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}

export default Confirm
