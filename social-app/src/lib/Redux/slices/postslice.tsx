import { Comment, Post } from '@/lib/interfaces/postInter'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie' 

export type PostsType={
posts: Post[] ,
isloading : boolean ,
singlePost : null | Post
content:null | Comment[] 
post:string
}

const initialState:PostsType ={
    posts:[] ,
    isloading:false , 
    singlePost:null ,
  content:null,
  post:""
}
// getAllPosts //
 export const getAllPosts=createAsyncThunk('posts/getAllPosts' ,async ()=>{
 const{data}=await axios.get('https://linked-posts.routemisr.com/posts?limit=51&page=90',{
    headers:{
        token:Cookies.get("token")
    }
  
 })
//  console.log(data)
   return data.posts ;
})
// getAllPosts //

// getSinglePosts //
export const getSinglePosts=createAsyncThunk('posts/getSinglePosts' ,async (id:string)=>{
 const{data}=await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
    headers:{
        token:Cookies.get("token")
    }
  
 })
 console.log(data)
   return data.post ;
})

// getSinglePosts //

// deletePost //

export const deletePost=createAsyncThunk("posts/deletePost", async function(id:string){
try {
    const{data}=await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
        token:Cookies.get("token")
    }
    })
    console.log(data)
    return data
} catch (error) {
    console.log(error)
    throw error
}
})


// deletePost //


const postslice = createSlice({ 
name:"posts" ,
initialState ,
reducers:{},
extraReducers:(builder)=>{
    //Get All  Posts
    builder.addCase(getAllPosts.pending , function(state){
        state.isloading=true ;
    })
    builder.addCase(getAllPosts.fulfilled ,function(state , action){
        state.posts=action.payload
    } )
    builder.addCase(getAllPosts.rejected ,function(state){
       state.isloading=false
    } )
//Get Single Post

     builder.addCase(getSinglePosts.pending , function(state){
        state.isloading=true ;
    })
    builder.addCase(getSinglePosts.fulfilled ,function(state , action){
        state.singlePost=action.payload
    } )
    builder.addCase(getSinglePosts.rejected ,function(state){
       state.isloading=false
    } )

    //Delete   Post
    builder.addCase(deletePost.pending , function(state){
        state.isloading=true ;
    })
    builder.addCase(deletePost.fulfilled ,function(state ){
        state.isloading=false
    } )
    builder.addCase(deletePost.rejected ,function(state){
       state.isloading=false
    } )


}
})

const PostSl = postslice.reducer
export default PostSl