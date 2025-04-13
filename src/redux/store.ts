//REDUX STORE
import {fetchApi} from "./services/fetchService"
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import { postApi } from './services/postService';
export const store = configureStore({
  reducer: {
    [fetchApi.reducerPath]: fetchApi.reducer,
    [postApi.reducerPath]: postApi.reducer,

  },
  //middlewares for caching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware).concat(postApi.middleware),
  
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const wrapper = createWrapper(() => store);