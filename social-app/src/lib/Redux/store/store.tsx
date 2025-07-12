import { configureStore } from '@reduxjs/toolkit'
import Post from '../slices/postslice'
import commentSlice from '../slices/commentslice';
import User from '../slices/userslice';


export const store = configureStore({
    reducer:{
Post ,
commentSlice,
User,
    }
})


export type storeDispatch = typeof store.dispatch ;
export type storeState = ReturnType<typeof store.getState>