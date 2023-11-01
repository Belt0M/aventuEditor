import clsx from 'clsx'
import { FC, useState } from 'react'
import { BiSun } from 'react-icons/bi'
import { HiOutlineMoon } from 'react-icons/hi'

const ThemeToggle: FC = () => {
	const [theme, setTheme] = useState<string>('light')
	//Toggle theme button function
	const handleToggle = () => {
		const themeToChange = theme === 'light' ? 'dark' : 'light'
		setTheme(themeToChange)
		//Change the theme logic in the future here..
	}
	return (
		<button
			className={clsx(
				theme === 'light'
					? 'light bg-yellow text-dark'
					: 'dark bg-dark text-white',
				'w-[3.6rem] h-7 3xl:h-9 3xl:w-[4.5rem] rounded-[.9rem] relative text-sm 3xl:text-xl'
			)}
			onClick={handleToggle}
		>
			{theme === 'light' ? (
				<HiOutlineMoon className='absolute -translate-y-1/2 top-1/2 left-2' />
			) : (
				<BiSun className='absolute -translate-y-1/2 top-1/2 right-2' />
			)}
			<span
				className={clsx(
					theme === 'light' ? 'right-0.5' : 'left-0.5',
					'absolute bg-white rounded-full w-6 h-6 3xl:w-[1.9rem] 3xl:h-[1.9rem] top-1/2 -translate-y-1/2'
				)}
			/>
		</button>
	)
}

export default ThemeToggle
