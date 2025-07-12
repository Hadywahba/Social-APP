import { configureStore } from '@reduxjs/toolkit'
import commentSlice from '../slices/commentslice';
import User from '../slices/userslice';
import PostSl from '../slices/postslice';


export const store = configureStore({
    reducer:{
PostSl ,
commentSlice,
User,
    }
})


export type storeDispatch = typeof store.dispatch ;
export type storeState = ReturnType<typeof store.getState>