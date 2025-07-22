"use client";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import Image from "next/image";
// import img2 from "../../assets/img/pingram.ico";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Registerinputvalues {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: number;
  gender: string;
}
export default function Register() {
  const { register, handleSubmit } = useForm<Registerinputvalues>({ mode: "all" });
  const[messageReg , setmessageReg]=useState<string|null>(null)
  const[errorReg , seterrorReg]=useState<boolean|null>(null)
 const[RegisterApi , setRegisterApi]=useState<boolean>(false)
 const router = useRouter()
  const userRegister = async (values: Registerinputvalues) => {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      console.log(data);
      setRegisterApi(true)
      setmessageReg(data.message)
      seterrorReg(false)
       setTimeout(()=>{
  router.push("/login")
 },1000)
      return data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
    const err = error as { response: { data: { error: string } } };
    console.log(err);
    setRegisterApi(false);
    setmessageReg(err.response.data.error);
    seterrorReg(true);
    return err;
  } else {
    console.error("Unexpected error:", error);
    setRegisterApi(false);
    setmessageReg("An unexpected error occurred.");
    seterrorReg(true);
    return error;
  }
    }
  };
  console.log(errorReg)
  return (
    <Container
      maxWidth="lg"
      sx={{
        mb: "2rem",
        mt: "2rem",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          color="initial"
          sx={{ color: "#1E293B", mb: 2, textAlign: "center" }}
        >
          Create Account
        </Typography>
        <form action="" onSubmit={handleSubmit(userRegister)}>
          <TextField
            {...register("name")}
            fullWidth
            type="name"
            name="name"
            id="name"
            label="name"
            variant="outlined"
            sx={{
              color: "#1E293B",
              mb: 2,
              "& .MuiInputLabel-root": { color: "#1E293B" },
              "& .MuiInputLabel-root.Mui-focused": { Color: "#1E293B" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                "&:hover fieldset": { borderColor: "#4F46E5" },
              },
            }}
          />
          <TextField
            {...register("email")}
            fullWidth
            type="email"
            name="email"
            id="email"
            label="email"
            variant="outlined"
            sx={{
              color: "#1E293B",
              mb: 2,
              "& .MuiInputLabel-root": { color: "#1E293B" },
              "& .MuiInputLabel-root.Mui-focused": { Color: "#1E293B" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                "&:hover fieldset": { borderColor: "#4F46E5" },
              },
            }}
          />
          <TextField
            {...register("password")}
            fullWidth
            type="password"
            id="password"
            label="password"
            name="password"
            variant="outlined"
            sx={{
              color: "#1E293B",
              mb: 2,
              "& label": { color: "#1E293B" },
              "& label.Mui-focused": { Color: "#1E293B" },

              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                "&:hover fieldset": { borderColor: "#4F46E5" },
              },
            }}
          />
          <TextField
            {...register("rePassword")}
            fullWidth
            type="password"
            id="rePassword"
            label="rePassword"
            name="rePassword"
            variant="outlined"
            sx={{
              color: "#1E293B",
              mb: 2,
              "& label": { color: "#1E293B" },
              "& label.Mui-focused": { Color: "#1E293B" },

              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                "&:hover fieldset": { borderColor: "#4F46E5" },
              },
            }}
          />

          <TextField
            {...register("dateOfBirth")}
            fullWidth
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            variant="outlined"
            sx={{
              color: "#1E293B",
              mb: 2,
              "& label": { color: "#1E293B" },
              "& label.Mui-focused": { Color: "#1E293B" },

              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                "&:hover fieldset": { borderColor: "#4F46E5" },
              },
            }}
          />
          <Box sx={{ mb: 3, display: "flex", gap: "100px" }}>
            <label color="#1E293B" className="Gender">Gender Selection</label>
            <select {...register("gender")} color="#1E293B">
              <option value="female" color="#1E293B">female</option>
              <option value="male">male</option>
            </select>
          </Box>
{RegisterApi? <Box component={"div"} sx={{width: "auto" , display:"flex" , justifyContent:"center"}}>
              <Box component={"div"} sx={{  borderRadius:"6px"}}>
                <CircularProgress sx={{backgroundColorColor:"#4F46E5" , color:"#1E293B"}} />
              </Box>
            </Box>  : <Button
            fullWidth
            type="submit"
            sx={{
              border: "1px solid #4F46E5",
              color: "#4F46E5",
              ":hover": { backgroundColor: "#4F46E5", color: "white" },
            }}
          >
            submit
          </Button>}
          
          {messageReg&&  <Alert icon={<CheckIcon fontSize="inherit" />} sx={{mt:2}} severity="error">
{messageReg}
</Alert>}
        </form>
      </Paper>
      <Paper
      className="regis"
        elevation={3}
        sx={{
          px:{md:4 } ,
          py:{xs:2 } ,
          position: "relative",
          width: "100%",
          height: { xs: 250, sm: 300, md: "auto" },
          backgroundColor: "#FFFFFF",
          color: "white",
          ":hover": { backgroundColor: "" ,  },
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            height: "100%",
          }}
        >
          <Typography variant="h3"  sx={ { fontSize:{ xs:25 , sm:40 , md:40 } , color:"#1E293B"}}>
            Welcome Back!
          </Typography>
          <Typography
            variant="h5"
            color="white"
            sx={{
              textDecorationStyle: "solid",
              textAlign: "center",
              lineHeight: 2,
              fontSize:{ xs:16 , sm:20 , lg:25} ,
              color:"#1E293B"
            }}
          >
            To keep connected with us please
            <br /> login with your personal info
          </Typography>
          <Button
          href="/login"
          LinkComponent={Link}
            variant="text"
            color="primary"
            sx={{
              px: {xs:8 ,sm:10 ,md:14  },
              py: 2,
              borderRadius: "30px",
              border: "2px solid #4F46E5",
              color: "#FFFFFF",
              bgcolor:"#4F46E5",
              ":hover": { backgroundColor: "#FFFFFF" , color:"#4F46E5" },
            }}
          >
            login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
