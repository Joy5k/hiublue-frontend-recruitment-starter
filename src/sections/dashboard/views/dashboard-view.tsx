'use client';


import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";


export default function DashboardView() {
  const router = useRouter();

useEffect(() => {
  
  const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login'); 

    }  
}, []);

  return (
  <Box>
    {/* this is sidebar component. In the side bar contained all cart and chart components */}
  <Sidebar />

    </Box>
      )
}