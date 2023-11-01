import { createSlice } from '@reduxjs/toolkit'
import { IStory } from '../../types/IStory'

interface IStoryState {
	stories: IStory[]
	loading: boolean
	error: string
}

const initialState: IStoryState = {
	stories: [],
	loading: false,
	error: '',
}

//Init storySlice
export const storySlice = createSlice({
	name: 'story',
	initialState,
	reducers: {},
	extraReducers: {},
})
