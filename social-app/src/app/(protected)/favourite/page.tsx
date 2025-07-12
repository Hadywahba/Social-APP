"use client";
import { userdata } from '@/lib/Redux/slices/userslice'
import React, { useState } from 'react'
import Cookies from 'js-cookie' 
import { useDispatch } from 'react-redux';
import  { useEffect } from "react";
import { storeDispatch } from '@/lib/Redux/store/store';
import { Box, Stack } from '@mui/material';
import Postcard from '@/app/_components/Navbar/postCard/postCard';
import { Post } from '@/lib/interfaces/postInter';
import  { deletePost, getAllPosts } from '@/lib/Redux/slices/postslice';
export default function Favourite() {
  const[FAV , setFAV]=useState<Post[]>([])

  useEffect(()=>{
if (typeof window !== "undefined") {
    const storedFav = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFAV(storedFav);
  }
  },[])
     const dispatch = useDispatch<storeDispatch>();

     useEffect(() => {
    if(Cookies.get("token")){
         dispatch((userdata()))
       }
    
  }, []);

const removeFav=(post:Post)=>{
  const update = FAV.filter((fav)=>fav.id!==post._id)
  setFAV(update)
  localStorage.setItem("favourites" , JSON.stringify(update))
}

//delete post 
async function DelePost(post: Post){
  await dispatch(deletePost(post._id ))
    await dispatch(getAllPosts());
}
//delete post 

  return (
    <Stack spacing={4} sx={{maxWidth:"1000px",paddingInline:4 , margin:"2rem auto"}}>
      {FAV.length==0? <Box  textAlign="center" mt={4} fontSize={25} color="gray" sx={{display:"flex" , justifyContent:"center" , alignItems:"center"}} >
 
      No favourites yet ❤️

  </Box> :  <Stack spacing={2}>
    {FAV.map((post) => (
      <Postcard
      
        key={post._id}
        post={post}
        favourites={FAV}
        handleTogle={removeFav}
        limitComment={2}
        isfavourite={true}
        DelePost={DelePost}
      />
    ))}
  </Stack>}
    
     
    </Stack>
  )
}


