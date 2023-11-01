import { FC, PropsWithChildren, ReactNode } from 'react'

type Props = {
	title: string
	children: ReactNode
}

const FormWrapper: FC<PropsWithChildren<Props>> = ({ children, title }) => {
	return (
		<div className='h-[85%] flex flex-col justify-between'>
			<h1 className='pb-6 text-2xl font-bold'>{title}</h1>
			{children}
		</div>
	)
}

export default FormWrapper
