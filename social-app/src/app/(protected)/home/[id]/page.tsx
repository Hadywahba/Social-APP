"use client";
import Postcard from "@/app/_components/Navbar/postCard/postCard";
import { deletePost, getAllPosts, getSinglePosts } from "@/lib/Redux/slices/postslice";
import { storeDispatch, storeState } from "@/lib/Redux/store/store";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie' 
import { userdata } from "@/lib/Redux/slices/userslice";
import { Post } from "@/lib/interfaces/postInter";
export default function id(props: any) {
  //    console.log(props.params)
  const dispatch = useDispatch<storeDispatch>();
  const { singlePost } = useSelector((c: storeState) => c.Post);
  const { comments } = useSelector((s: storeState) => s.commentSlice);
  const[favo,setfavo]=useState<Post[]>([])
// favourite
useEffect(()=>{
const checkFav=JSON.parse(localStorage.getItem("favourites"))||[]
setfavo(checkFav)
},[])

const handleTogle=(post:Post)=>{
const isFav=favo.some((favor)=>favor.id==post._id)
let UpdateFav:Post[]=[]
if(isFav){
  UpdateFav=UpdateFav.filter(((favor)=>favor.id!==post._id))
}else{
  UpdateFav=[...favo,post]
}
setfavo(UpdateFav)
localStorage.setItem("favourites", JSON.stringify(UpdateFav))
}

// favourite

// getSinglePosts
  useEffect(() => {
    props.params.then((data: any) => {
       console.log(data.id)
      dispatch(getSinglePosts(data.id));
    });
  }, [comments]);

// getSinglePosts

// ShowUserData
 useEffect(()=>{
   if(Cookies.get("token")){
        dispatch((userdata()))
      }
 },[])
 // ShowUserData

 //delete post 
   async function DelePost(){
     await dispatch(deletePost(post.id ))
       await dispatch(getAllPosts());
       await  dispatch(getSinglePosts(data.id));
   }
   //delete post 

  return (
    <>
      <Stack
        spacing={2}
        sx={{ maxWidth: "1000px", paddingInline: 4, margin: "2rem auto" }}
      >
        {singlePost && <Postcard post={singlePost}  favourites={favo} handleTogle={handleTogle} DelePost={DelePost}    />}
      
      </Stack>
    </>
  );
}
