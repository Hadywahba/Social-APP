import  type { User } from "@/lib/interfaces/postInter";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Cookies from 'js-cookie' 


type UserType={
    user:User|null,
    isloading : boolean ,
}


const initialState:UserType={
user:null,
isloading:false
}

export const userdata=createAsyncThunk("user/userdata",async function(){
    const{data}=await axios.get("https://linked-posts.routemisr.com/users/profile-data",{
         headers:{
              token:Cookies.get("token")
          }

    })

return data
})


const userslice =createSlice({
name:"user",
initialState,
reducers:{},
extraReducers(builder) {
     builder.addCase(userdata.rejected,function(state){
 state.isloading=false
    })
     builder.addCase(userdata.fulfilled,function(state , action){
 
 state.user=action.payload.user
    
    })
     builder.addCase(userdata.pending,function(state){
 state.isloading=true
    })

},
})
 const User =userslice.reducer
 export default User