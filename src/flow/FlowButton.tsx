import { FC, ReactNode } from 'react'

interface Props {
	text: string
	icon?: ReactNode
	bgColor: string
	textColor: string
	borderColor: string
	pt?: string
	pb?: string
	onClick?: () => void
}

const FlowButton: FC<Props> = ({
	bgColor,
	textColor,
	text,
	icon,
	borderColor,
	pb = 'pb-2.5 ',
	pt = 'pt-2 ',
	onClick,
}) => {
	const styles = `text-${textColor} border-${borderColor} bg-${bgColor} `

	return (
		<button
			type='button'
			className={
				styles +
				pb +
				pt +
				' flex items-center justify-center gap-2 px-4 pl-3 font-bold border-2 text-sm rounded-lg hover:opacity-80 transition-all scale-90 duration-300 mb-4'
			}
			onClick={onClick}
		>
			{icon}
			{text}
		</button>
	)
}

export default FlowButton
