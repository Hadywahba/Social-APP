"use client";
import { getAllPosts } from "@/lib/Redux/slices/postslice";
import { storeDispatch, storeState } from "@/lib/Redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Stack } from "@mui/material";
import Postcard from "@/app/_components/Navbar/postCard/postCard";
import { Post } from "@/lib/interfaces/postInter";
import Createpost from "@/app/_components/Createpost/Createpost";
import { userdata } from "@/lib/Redux/slices/userslice";


export default function Home() {
  const dispatch = useDispatch<storeDispatch>();
  const { posts } = useSelector((c: storeState) => c.PostSl);

  const [favourites, setfavourites] = useState<Post[]>([]);
  // favourite
  const handleTogle = (post: Post) => {
    const isFavourite = favourites.some((fav) => fav.id == post.id);
    let updateFav: Post[] = [];
    if (isFavourite) {
      updateFav = favourites.filter((fav) => fav.id !== post.id);
    } else {
      updateFav = [...favourites, post];
    }
    setfavourites(updateFav);
    localStorage.setItem("favourites", JSON.stringify(updateFav));
  };
  // favourite
 

  useEffect(() => {
    dispatch(getAllPosts());

    if (typeof window !== "undefined") {
      const storedFav = JSON.parse(localStorage.getItem("favourites") || "[]");
      setfavourites(storedFav);
    }
  }, []);

  React.useEffect(() => {
    if (Cookies.get("token")) {
      dispatch(userdata());
    }
  }, []);

  return (
    <>
      <Stack
        spacing={2}
        sx={{ maxWidth: "1000px", paddingInline: 4, margin: "2rem auto" }}
      >
        <Createpost />
        {posts.map((post: Post) => (
          <Postcard
            key={post._id}
            limitComment={1}
            post={post}
            favourites={favourites}
            handleTogle={handleTogle}
         
          />
        ))}
      </Stack>
    </>
  );
}
