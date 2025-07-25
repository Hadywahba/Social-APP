"use client"
import { Alert, Box, Button, CircularProgress, Container, Paper, TextField, Typography,} from "@mui/material";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import React, {  useState } from "react";
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

export default function Login() {
const[message , setMessage]=useState<string|null>(null)
const[CallApi , setCallApi]=useState<boolean>(false)
const[error , setError]=useState<boolean|null>(null)
  const{register , handleSubmit}=useForm<Logininputvalues>()
    const dispatch = useDispatch<storeDispatch>();
  const router = useRouter()

console.log(error)
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


catch (error: unknown) {
    if (error instanceof Error && 'response' in error){
       const err = error as { response: { data: { error: string } } };
       console.log(err);
    setCallApi(false);
    setMessage(err.response.data.error);
    setError(true);
    return err;
    }else{
      console.log("Unexpected error:", error);
    setCallApi(false);
    setMessage("An unexpected error occurred.");
    setError(true);
    return error;
    }
  

}
  }
 
  return (
    <>
      <Container maxWidth="sm" sx={{ mb: "6rem", mt: "6rem" }}>
       
          <Paper elevation={10} sx={{ p: 4 }}>
            <Typography
              variant="h4"
              color="initial"
              sx={{ color: "#1E293B", mb: 3, textAlign: "center" }}
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
                color: "#1E293B",
                mb: 3,
                "& .MuiInputLabel-root": { color: "#1E293B" },
                "& .MuiInputLabel-root.Mui-focused": { Color: "#1E293B" },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                  "&:hover fieldset": { borderColor: "#4F46E5" },
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
                color: "#1E293B",
                mb: 3,
                "& label": { color: "#1E293B" },
                "& label.Mui-focused": { Color: "#1E293B" },

                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                  "&:hover fieldset": { borderColor: "#4F46E5" },
                },
              }}
            />
            {CallApi ? <Box component={"div"} sx={{width: "auto" , display:"flex" , justifyContent:"center"}}>
              <Box component={"div"} sx={{  borderRadius:"6px"}}>
                <CircularProgress sx={{backgroundColorColor:"#4F46E5" , color:"#1E293B"}} />
              </Box>
            </Box> :  <Button
              fullWidth
              type="submit"
            
              sx={{
                border: "1px solid #4F46E5",
                color: "#1E293B",
                ":hover": { backgroundColor: "#4F46E5", color: "white" },
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
