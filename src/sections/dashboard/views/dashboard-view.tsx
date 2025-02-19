'use client';


import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";


export default function DashboardView() {
  const router = useRouter();

useEffect(() => {
  
  const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login'); // Redirect to login if not authenticated

    }  
}, []);

  return <Box>
    <div style={{ display: "flex" }}>
      <Sidebar  />
      <div style={{ flex: 1, padding: "20px" }}>
       
      </div>
    </div>
  </Box>;
}