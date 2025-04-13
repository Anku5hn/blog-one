import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
type RootState = any //from redux toolkit docs
//interface for 
interface Post {
  userId: number;
  id?: number; 
  title: string;
  body: string;
}

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, Omit<Post, 'id'>>({ // Define the mutation
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
    }),
  }),
});

export const { useCreatePostMutation } = postApi;