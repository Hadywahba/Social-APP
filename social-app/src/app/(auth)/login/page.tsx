"use client"
import { Alert, Box, Button, CircularProgress, Container, Paper, TextField, Typography,} from "@mui/material";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form"
 import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";
import { storeDispatch } from "@/lib/Redux/store/store";
import { userdata } from "@/lib/Redux/slices/userslice";


 interface Logininputvalues {
  email: string;
  password: string;
  
}

export default function login() {
const[message , setMessage]=useState<string|null>(null)
const[CallApi , setCallApi]=useState<boolean>(false)
const[error , setError]=useState<boolean|null>(null)
  const{register , handleSubmit}=useForm()
    const dispatch = useDispatch<storeDispatch>();
  const router = useRouter()


  const Loginform=async(values:Logininputvalues)=>{
try {
  const{data}=await axios.post('https://linked-posts.routemisr.com/users/signin',values)
  setMessage(data.message)
  setCallApi(true)
  setError(false)
  Cookies.set('token', data.token)
  console.log(data)
   dispatch(userdata());
 
 
   

 setTimeout(()=>{
  router.push("/")
 },1000)

 
}


catch (error:any) {
  console.log(error)
    setCallApi(false)
  setMessage(error.response.data.error)
setError(true)
  return error
}
  }
 
  return (
    <>
      <Container maxWidth="sm" sx={{ mb: "6rem", mt: "6rem" }}>
       
          <Paper elevation={10} sx={{ p: 4 }}>
            <Typography
              variant="h4"
              color="initial"
              sx={{ color: "#EC486E", mb: 3, textAlign: "center" }}
            >
              Login Now{" "}
            </Typography>
          <form action="" onSubmit={handleSubmit(Loginform)} >



              <TextField
            //  {...register("email")}
              fullWidth
              {...register("email")}
              type="email"
              name="email"
              id="email"
              label="email"
              variant="outlined"
              sx={{
                color: "#EC486E",
                mb: 3,
                "& .MuiInputLabel-root": { color: "#EC486E" },
                "& .MuiInputLabel-root.Mui-focused": { Color: "#EC486E" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#EC486E" },
                  "&:hover fieldset": { borderColor: "#EC486E" },
                },
              }}
            />
            <TextField
             
              fullWidth
               {...register("password")}
              type="password"
              id="password"
              label="password"
              variant="outlined"
              sx={{
                color: "#EC486E",
                mb: 3,
                "& label": { color: "#EC486E" },
                "& label.Mui-focused": { Color: "#EC486E" },

                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#EC486E" },
                  "&:hover fieldset": { borderColor: "#EC486E" },
                },
              }}
            />
            {CallApi ? <Box component={"div"} sx={{width: "auto" , display:"flex" , justifyContent:"center"}}>
              <Box component={"div"} sx={{  borderRadius:"6px"}}>
                <CircularProgress sx={{backgroundColorColor:"#EC486E" , color:"#EC486E"}} />
              </Box>
            </Box> :  <Button
              fullWidth
              type="submit"
            
              sx={{
                border: "1px solid #EC486E",
                color: "#EC486E",
                ":hover": { backgroundColor: "#EC486E", color: "white" },
              }}
            >
             {} submit
            </Button>}
          
           {message&&  <Alert icon={<CheckIcon fontSize="inherit" />} sx={{mt:2}} severity="error">
{message}
</Alert>}
          </form>
          </Paper>
      
      </Container>
    </>
  );
}
