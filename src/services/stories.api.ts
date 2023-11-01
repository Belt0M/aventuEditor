import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDecision } from '../types/IDecision'
import { IEdge } from '../types/IEdge'
import { INarrative } from '../types/INarrative'
import { INode } from '../types/INode'
import { IStoryExtended } from '../types/IStoryExtended'
import { IStory } from './../types/IStory'

// Base requests URL, currently that's a json-server one. In th future you'll be able to change on your DB URL
// const BASE_URL = 'http://localhost:3000'
// Base requests URL, currently that's a Postman URL. In th future you'll be able to change on your DB URL
const BASE_URL = 'https://fcfeba59-1eb5-4fd0-9cdb-5d9aa1342e33.mock.pstmn.io'

// Defining Stories API to make requests to server
export const storiesApi = createApi({
	reducerPath: 'storiesApi',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['Story'],
	endpoints: builder => ({
		getAllStories: builder.query<IStory[], null>({
			query: () => '/stories',
			providesTags: () => ['Story'],
		}),
		getOneStory: builder.query<IStory, string>({
			query: (id: string) => `/stories/${id}`,
		}),
		getOneExtendedStory: builder.query<IStoryExtended, string>({
			query: (id: string) => `/stories/${id}`,
		}),
		createStory: builder.mutation<IStory, IStory>({
			query: (story: IStory) => ({
				url: '/stories',
				method: 'POST',
				body: story,
			}),
			invalidatesTags: ['Story'],
		}),
		deleteStory: builder.mutation<null, IStory>({
			query: (story: IStory) => ({
				url: `/stories/${story.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Story'],
		}),
		// Don't know is needed or not | about top right "Save Changes Button"
		updateStory: builder.mutation<IStory, IStory>({
			query: story => ({
				url: `/stories/${story.id}`,
				method: 'PATCH',
				body: story,
			}),
			invalidatesTags: ['Story'],
		}),
		deleteCharacter: builder.mutation<
			null,
			{ storyId: number; characterId: number }
		>({
			query: ({ storyId, characterId }) => ({
				url: `/stories/${storyId}/characters/${characterId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Story'],
		}),
		// Used in onDrop handler
		createNode: builder.mutation<IStoryExtended, { node: INode; id: number }>({
			query: ({ node, id }) => ({
				url: `/stories/${id}/nodes`,
				method: 'PATCH',
				body: node,
			}),
			invalidatesTags: ['Story'],
		}),
		getOneNode: builder.query<INode, { storyId: number; nodeId: number }>({
			query: ({ nodeId, storyId }) => `/stories/${storyId}/nodes/${nodeId}`,
		}),
		// Used in onConnect handler
		createEdge: builder.mutation<
			IStoryExtended,
			{ edge: IEdge; storyId: number }
		>({
			query: ({ edge, storyId }) => ({
				url: `/stories/${storyId}/edges`,
				method: 'PATCH',
				body: edge,
			}),
			invalidatesTags: ['Story'],
		}),
		updateNodeData: builder.mutation<
			IStoryExtended,
			{ nodeData: IDecision | INarrative; storyId: number; nodeId: number }
		>({
			query: ({ nodeData, nodeId, storyId }) => ({
				url: `/stories/${storyId}/nodes/${nodeId}`,
				method: 'PATCH',
				body: nodeData,
			}),
			invalidatesTags: ['Story'],
		}),
	}),
})
