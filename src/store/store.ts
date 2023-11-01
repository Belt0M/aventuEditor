import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { storiesApi } from '../services/stories.api'

// Combine all reducers
const rootReducer = combineReducers({
	[storiesApi.reducerPath]: storiesApi.reducer,
	// [booksApi.reducerPath]: booksApi.reducer,
})

// Init redux store
export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(storiesApi.middleware),
	// .concat(booksApi.middleware),
})

//Some types for easy use with TS
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
