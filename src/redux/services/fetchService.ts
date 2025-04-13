//RTK Query for fetching posts, video explaining RTK Query: https://youtu.be/yKnVCbetNRs?si=AMPXd-vhWOgvn6my
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
type RootState = any//from redux toolkit docs

interface blog{
    id: number;
    title: string;
    body: string;
    userId: number
}

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const fetchApi = createApi({
  reducerPath: "fetchAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  //docs: https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (build) => ({
    fetchApi: build.query<Array<blog>, void>({
      query: () => "posts",
    }),
  }),
});

export const { useFetchApiQuery } = fetchApi;