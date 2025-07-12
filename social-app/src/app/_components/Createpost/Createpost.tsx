"use client";
import { Avatar, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import Cookies from "js-cookie";
import { getAllPosts } from "@/lib/Redux/slices/postslice";
import { useDispatch, useSelector } from "react-redux";
import ButtonBase from "@mui/material/ButtonBase";
import { userdata } from "@/lib/Redux/slices/userslice";
import { storeDispatch, storeState } from "@/lib/Redux/store/store";
export default function Createpost() {
  const [body, setbody] = useState("");
  const [image, setimage] = useState<File | null>(null);
  const [imgUrl, setimgUrl] = useState<string | null>(null);

  const dispatch = useDispatch<storeDispatch>();
  const user = useSelector((state: storeState) => state.User.user);

  // AddUserPicture //
  async function AddUserPicture(e: React.ChangeEvent<HTMLInputElement>) {
   const files = e.target.files?.[0];
  if (!files) return;
    const form = new FormData();
    form.append("photo", files);
    try {
      const { data } = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        form,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      console.log("uploaded", data);

      dispatch(userdata());
      dispatch(getAllPosts());
    } catch (error) {
      console.log("photo error", error);
      throw error;
    }
  }

  // AddUserPicture //

  //clearPost//

  function clearPost() {
    setbody(" ");
    setimgUrl(null);
    setimage(null);
  }
console.log("body:", body.trim());
console.log("image:", image);
  //clearPost//

  //Add Post//
  async function addPost() {
    if (!body && !image) {
      alert("You must write a post or upload at least an image !!");
      return;
    }
    console.log(body);
    console.log(image);
    const form = new FormData();
    if (body.trim() !== "") form.append("body", body);
    if (image) form.append("image", image);

    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        form,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      console.log(data);
      dispatch(getAllPosts());
      clearPost();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //Add Post//

  //addphoto//
  function addphoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
  if (!file) return;
    setimage(file);
    const url = URL.createObjectURL(file);
    setimgUrl(url);
    dispatch(getAllPosts());
  }
  //addphoto//
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth: "1000px",
        paddingInline: 4,
        margin: "2rem auto",
        backgroundColor: "white",
        padding: "2rem",
      }}
    >
      {/* //avatar */}
      <ButtonBase
        component="label"
        role={undefined}
        className="avatar-pic"
        tabIndex={-1} // prevent label from tab focus
        aria-label="Avatar image"
        sx={{
          borderRadius: "40px",
          width: "100%",
          "&:has(:focus-visible)": {
            outline: "2px solid",
            outlineOffset: "2px",
          },
          display: "flex",
          justifyContent: "flex-start",
          gap: "20px",
        }}
      >
        <Avatar sx={{ width: 80, height: 80 }} src={user?.photo} />

        <input
          type="file"
          accept="image/*"
          style={{
            border: 0,
            clip: "rect(0 0 0 0)",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            whiteSpace: "nowrap",
            width: "1px",
          }}
          onChange={(e) => AddUserPicture(e)}
        />
        <Typography variant="h6" color="initial">
          {user?.name}
        </Typography>
      </ButtonBase>

      {/* //avatar */}
      <TextField
        fullWidth
        label="what's on your mind?"
        value={body}
        onChange={(e) => setbody(e.target.value)}
        id="fullWidth"
        sx={{
          color: "#EC486E",
          borderRadius: "50%",
          mb: 3,
          "& .MuiInputLabel-root": { color: "rgb(0, 0, 0)" },
          "& .MuiInputLabel-root.Mui-focused": { Color: "rgb(0, 0, 0)" },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#EC486E" },
            "&:hover fieldset": { borderColor: "#EC486E" },
          },
        }}
      />

      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => addphoto(event)}
        />
      </Button>
      {imgUrl && <img src={imgUrl} />}

      <Button variant="contained" onClick={addPost} endIcon={<SendIcon />}>
        Add Post
      </Button>
    </Stack>
  );
}
