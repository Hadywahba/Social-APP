"use client"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, {  useEffect, useState } from 'react'

export default function ProtectedLayout({children}:{children : React.ReactNode}) {
    const router = useRouter()
    const[checked , setchecked]=useState(false)
    useEffect(() => {
    const token = Cookies.get("token")
    if(!token){
      router.push('/login')  
    }else{
        setchecked(true)
    }
      
    }, [])
    if(!checked){
        return null
    }
    
  return (
   <>{children}</>
  )
}
