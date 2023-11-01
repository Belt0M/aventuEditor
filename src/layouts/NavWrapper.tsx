import { FC, PropsWithChildren, ReactNode } from 'react'
import Navbar from '../components/Navbar'

type Props = {
	children: ReactNode
}

const NavWrapper: FC<PropsWithChildren<Props>> = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

export default NavWrapper
