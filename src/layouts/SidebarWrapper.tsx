import { FC, PropsWithChildren, ReactNode } from 'react'

type Props = {
	children: ReactNode
	padding?: string
}

const SidebarWrapper: FC<PropsWithChildren<Props>> = ({
	children,
	padding,
}) => {
	return (
		<aside
			className={
				padding + ' w-64 shadow-sidebarShadow left-0 top-0 bottom-0 fixed'
			}
		>
			{children}
		</aside>
	)
}

export default SidebarWrapper
