import { ReactNode } from 'react'

export interface INavItem {
	color: string
	icon: ReactNode
	size?: string
	to: string
}
