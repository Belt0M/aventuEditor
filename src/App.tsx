import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routesData } from './data/routes.data'
import NavWrapper from './layouts/NavWrapper'

const App: FC = () => {
	return (
		<NavWrapper>
			<Routes>
				{routesData.map(route => (
					<Route path={route.path} element={route.element} key={route.path} />
				))}
			</Routes>
		</NavWrapper>
	)
}

export default App
