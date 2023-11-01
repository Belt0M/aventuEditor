import { BiHomeAlt2 } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { IoSettingsOutline } from 'react-icons/io5'
import { INavItem } from '../types/INavItem'

export const navItems: INavItem[] = [
	{ color: 'text-primary', icon: <BiHomeAlt2 />, to: '/' },
	{ color: 'text-primary', icon: <IoSettingsOutline />, to: '/settings' },
	{ color: 'text-primary', icon: <IoSettingsOutline />, to: '/toggle' },
	{ color: 'text-primary', icon: <CgProfile />, to: '/profile' },
]
