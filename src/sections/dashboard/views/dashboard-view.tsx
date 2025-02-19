'use client';


import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import Sidebar from "../sidebar/Sidebar";
import ApexCharts from "../dashboarComponents/ApexChart";


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