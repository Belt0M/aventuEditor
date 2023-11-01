import { FC } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import ThemeToggle from '../atoms/ThemeToggle'
import { navItems } from '../data/nav-items.data.'

const Navbar: FC = () => {
	return (
		<header className='fixed inset-x-0 top-0 flex items-center justify-between h-[4.5rem] px-12 bg-white z-50 shadow-lg shadow-darkShadow'>
			<Link to='/'>
				<img src={logo} alt='Aventu Company Logo' className='h-14' />
			</Link>
			<nav className='flex items-center gap-10'>
				{navItems.map((item, index) =>
					item.to === '/toggle' ? (
						<ThemeToggle key={item.to} />
					) : (
						<Link
							to={item.to}
							key={index}
							className='text-[1.55rem] transition cursor-pointer text-primary hover:brightness-110 hover:scale-105'
						>
							{item.icon}
						</Link>
					)
				)}
			</nav>
		</header>
	)
}

export default Navbar
