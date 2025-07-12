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
import { useParams } from "next/navigation";
export default  function Id() {
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch<storeDispatch>();
  const { singlePost } = useSelector((c: storeState) => c.PostSl);
  const { comments } = useSelector((s: storeState) => s.commentSlice);
  const[favo,setfavo]=useState<Post[]>([])
// favourite
useEffect(()=>{
if (typeof window !== "undefined") {
    const checkFav = JSON.parse(localStorage.getItem("favourites") || "[]");
  setfavo(checkFav)
  }

},[])

const handleTogle=(post:Post)=>{
const isFav=favo.some((favor)=>favor.id==post._id)
let UpdateFav:Post[]=[]
if(isFav){
  UpdateFav=favo.filter(((favor)=>favor.id!==post._id))
}else{
  UpdateFav=[...favo,post]
}
setfavo(UpdateFav)
localStorage.setItem("favourites", JSON.stringify(UpdateFav))
}

// favourite

// getSinglePosts
 useEffect(() => {
    if (id) {
      dispatch(getSinglePosts(id));
    }
  }, [comments,dispatch, id]);

// getSinglePosts

// ShowUserData
 useEffect(()=>{
   if(Cookies.get("token")){
        dispatch((userdata()))
      }
 },[dispatch])
 // ShowUserData

 //delete post 
   async function DelePost(){
     await dispatch(deletePost(id ))
       await dispatch(getAllPosts());
       await  dispatch(getSinglePosts(id));
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
