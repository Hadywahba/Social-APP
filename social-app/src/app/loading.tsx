import React from 'react'
import { Box, CircularProgress } from "@mui/material";
export default function loading() {
  return (
   <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={100} color="secondary" />
    </Box>
  )
}
