import { Comment } from '@/lib/interfaces/postInter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import Cookies from 'js-cookie' 
 type CommentType={
comments:Comment[],
isloading : boolean ,
}

const initialState:CommentType ={
    comments:[] ,
      isloading:false , 
} 

export const createComment=createAsyncThunk("comment/createComment",async function(values:{content:string , post:string}){
    const {data}=await axios.post("https://linked-posts.routemisr.com/comments",values , {
         headers:{
                token:Cookies.get("token")
            }
    })
    console.log(data)
    return data.comments
})

const commentslice= createSlice({
name:"comment" ,
initialState ,
reducers:{},
extraReducers(builder) {
    builder.addCase(createComment.fulfilled , function(state , action){
state.comments.push(action.payload);
    })
     builder.addCase(createComment.pending , function(state){
state.isloading=true 

    })
     builder.addCase(createComment.rejected , function(state){
state.isloading=false 

    })
},
})

const commentSlice=commentslice.reducer;
export default commentSlice