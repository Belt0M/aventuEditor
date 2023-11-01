import CreatePage from '../pages/CreatePage'
import EditorPage from '../pages/EditorPage'
import OverviewPage from '../pages/OverviewPage'
import ProfilePage from '../pages/ProfilePage'
import SettingsPage from '../pages/SettingsPage'
import { IRoute } from '../types/IRoute'

export const routesData: IRoute[] = [
	// Main pages
	{
		path: '/',
		element: <OverviewPage />,
	},
	{
		path: '/settings',
		element: <SettingsPage />,
	},
	{
		path: '/profile',
		element: <ProfilePage />,
	},
	{
		path: '/editor/:id',
		element: <EditorPage />,
	},
	{
		path: '/create-new',
		element: <CreatePage />,
	},
	// Story Edit
	{
		path: '/edit',
		element: <CreatePage />,
	},
]
