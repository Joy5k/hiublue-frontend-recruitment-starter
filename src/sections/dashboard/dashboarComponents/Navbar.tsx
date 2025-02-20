"use client"


import React from 'react'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import Image from "next/image";
function Navbar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#fff", boxShadow: "none", zIndex: 20, borderBottom: "1px solid #f0f0f0" }}>
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      {/* Project Icon */}
      <Box>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Image src="/icon 1.png" alt="Project Icon" width={40} height={40} />
        </IconButton>
      </Box>

      {/* Profile Image */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
      
        <Box sx={{ position: "relative" }}>
          <IconButton edge="end" color="inherit" aria-label="profile-menu" onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar alt="Profile" src="/path-to-your-profile-image.jpg" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={handleLogout} sx={{color:"orange"}}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar