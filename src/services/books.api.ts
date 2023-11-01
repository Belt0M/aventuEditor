// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// // Base requests URL, currently that's a json-server one. In th future you'll be able to change on your DB URL
// const BASE_URL = 'http://localhost:3000'

// // Defining Stories API to make requests to server
// export const booksApi = createApi({
// 	reducerPath: 'booksApi',
// 	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
// 	tagTypes: ['Book'],
// 	endpoints: builder => ({
// 		getAllBooks: builder.query<IBook[], null>({
// 			query: () => '/books',
// 			providesTags: () => ['Book'],
// 		}),
// 		getOneBook: builder.query<IBook, string>({
// 			query: (id: string) => `/books/${id}`,
// 		}),
// 		createBook: builder.mutation<IBook, IBook>({
// 			query: (book: IBook) => ({
// 				url: '/books',
// 				method: 'POST',
// 				body: book,
// 			}),
// 			invalidatesTags: ['Book'],
// 		}),
// 	}),
// })
