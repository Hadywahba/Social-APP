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
          sx={{ color: "#EC486E", mb: 2, textAlign: "center" }}
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
              color: "#EC486E",
              mb: 2,
              "& .MuiInputLabel-root": { color: "#EC486E" },
              "& .MuiInputLabel-root.Mui-focused": { Color: "#EC486E" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#EC486E" },
                "&:hover fieldset": { borderColor: "#EC486E" },
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
              color: "#EC486E",
              mb: 2,
              "& .MuiInputLabel-root": { color: "#EC486E" },
              "& .MuiInputLabel-root.Mui-focused": { Color: "#EC486E" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#EC486E" },
                "&:hover fieldset": { borderColor: "#EC486E" },
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
              color: "#EC486E",
              mb: 2,
              "& label": { color: "#EC486E" },
              "& label.Mui-focused": { Color: "#EC486E" },

              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#EC486E" },
                "&:hover fieldset": { borderColor: "#EC486E" },
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
              color: "#EC486E",
              mb: 2,
              "& label": { color: "#EC486E" },
              "& label.Mui-focused": { Color: "#EC486E" },

              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#EC486E" },
                "&:hover fieldset": { borderColor: "#EC486E" },
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
              color: "#EC486E",
              mb: 2,
              "& label": { color: "#EC486E" },
              "& label.Mui-focused": { Color: "#EC486E" },

              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#EC486E" },
                "&:hover fieldset": { borderColor: "#EC486E" },
              },
            }}
          />
          <Box sx={{ mb: 3, display: "flex", gap: "100px" }}>
            <label>Gender Selection</label>
            <select {...register("gender")}>
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
          </Box>
{RegisterApi? <Box component={"div"} sx={{width: "auto" , display:"flex" , justifyContent:"center"}}>
              <Box component={"div"} sx={{  borderRadius:"6px"}}>
                <CircularProgress sx={{backgroundColorColor:"#EC486E" , color:"#EC486E"}} />
              </Box>
            </Box>  : <Button
            fullWidth
            type="submit"
            sx={{
              border: "1px solid #EC486E",
              color: "#EC486E",
              ":hover": { backgroundColor: "#EC486E", color: "white" },
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
        elevation={3}
        sx={{
          px:{md:4 } ,
          py:{xs:2 } ,
          position: "relative",
          width: "100%",
          height: { xs: 250, sm: 300, md: "auto" },
          backgroundColor: "#EC486E",
          color: "white",
          // ":hover": { backgroundColor: "#C300FD" },
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
          <Typography variant="h3" color="white" sx={ { fontSize:{ xs:25 , sm:40 , md:40 }}}>
            Welcome Back!
          </Typography>
          <Typography
            variant="h5"
            color="white"
            sx={{
              textDecorationStyle: "solid",
              textAlign: "center",
              lineHeight: 2,
              fontSize:{ xs:16 , sm:20 , lg:25}
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
              border: "2px solid white",
              color: "white",
              ":hover": { backgroundColor: "white" , color:"#EC486E" },
            }}
          >
            login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
