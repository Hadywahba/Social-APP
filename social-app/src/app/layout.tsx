"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Navbar from "./_components/Navbar/Navbar";
import { Provider } from 'react-redux'
import { store } from "@/lib/Redux/store/store";
// import { store } from "./redux/store";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
       
        <AppRouterCacheProvider>
      <Provider store={store}>
          <Navbar/>
        {children}
   </Provider>
        </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
