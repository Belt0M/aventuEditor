import { ChangeEvent, FC, useState } from 'react'
import AddLibrary from '../components/AddLibrary'
import CreateStoryCard from '../components/CreateStoryCard'
import LibraryItem from '../components/LibraryItem'
import SearchBar from '../components/SearchBar'
import StoryItem from '../components/StoryItem'
import StoryLoader from '../components/loaders/StoryLoader'
import Alert from '../components/popups/Alert'
import { librariesData } from '../data/libraries.data'
import SidebarWrapper from '../layouts/SidebarWrapper'
import { storiesApi } from '../services/stories.api'

const OverviewPage: FC = () => {
	const {
		data: stories,
		error,
		isLoading,
	} = storiesApi.useGetAllStoriesQuery(null)

	const [value, setValue] = useState<string>('')

	//On input typing change state for searching functionality
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	return (
		<main className='flex'>
			<SidebarWrapper>
				<SearchBar onChange={handleChange} value={value} />
				<AddLibrary />
				<ul className='px-5'>
					{librariesData.map(lib => (
						<LibraryItem lib={lib} key={lib.name} />
					))}
				</ul>
			</SidebarWrapper>
			<section className='grid w-full grid-cols-1 grid-rows-2 py-4 ml-64 md:grid-cols-2 lg:gap-x-6 lg:grid-rows-2 gap-x-6 gap-y-4 px-7 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3'>
				<CreateStoryCard />
				{isLoading && <StoryLoader />}
				{error && <Alert error='Error while loading stories :(' />}
				{stories?.map((story, index) => (
					<StoryItem story={story} key={index} />
				))}
			</section>
		</main>
	)
}

export default OverviewPage
