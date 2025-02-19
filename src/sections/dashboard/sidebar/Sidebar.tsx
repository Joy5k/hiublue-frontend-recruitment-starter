import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {  ShoppingBag, Menu,Speed } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

// Lazy load pages 
const DashboardPage = lazy(() => import("../views/DashboarderOverview"));
const OnboardingPage = lazy(() => import("@/onboarding/views/page"));

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPage, setSelectedPage] = useState<"dashboard" | "onboarding">("dashboard");

  // Handle mobile responsiveness
  useEffect(() => {
    setIsMobile(window.innerWidth < theme.breakpoints.values.md);

    const handleResize = () => {
      setIsMobile(window.innerWidth < theme.breakpoints.values.md);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

 

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: "flex", height: "100vh", position: "relative"}}>
    {/* Hamburger Menu (Mobile) */}
    {isMobile && (
      <Box>
        <IconButton
          onClick={handleMenuClick}
          style={{ position: "absolute", top: 2, left: 2, zIndex: 10 }}
        >
          <Menu />
        </IconButton>
      </Box>
    )}
  
    {/* Sidebar */}
    <Drawer
      anchor="left"
      open={isMobile ? open : true}
      onClose={handleMenuClick}
      variant={isMobile ? "temporary" : "permanent"}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{
        marginTop:"20px ",
        marginLeft:"20px"
      }}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Image src="/icon 1.png"    alt="Project Icon" width={50} height={50} />
              </IconButton>
            </Box>
  
      <List style={{ margin: "0 0 0 10px" }}>
        <Typography component="p" style={{ color: "gray", margin: "10px" }}>
          Overview
        </Typography>
 
        {/* Dashboard */}
        <ListItem
          component="button"
          onClick={() => setSelectedPage("dashboard")}
          sx={{
            background: selectedPage === "dashboard" ? '#EFEFEF' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            '&:hover': { background: '#EFEFEF' }
          }}
        >
          <ListItemIcon>
            <Speed />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
  
        {/* Onboarding */}
        <ListItem
          component="button"
          onClick={() => setSelectedPage("onboarding")}
          sx={{
            background: selectedPage === "onboarding" ? '#EFEFEF' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            '&:hover': { background: '#EFEFEF' }
          }}
        >
          <ListItemIcon>
            <ShoppingBag />
          </ListItemIcon>
          <ListItemText primary="Onboarding" />
        </ListItem>
      </List>
    </Drawer>
  
    {/* Content Area */}
    <main
      style={{
        flexGrow: 1,
        padding: "20px",
        marginLeft: isMobile ? (open ? 240 : 0) : 240, // Adjust content margin based on sidebar state
        transition: "margin 0.3s ease-in-out", // Smooth transition on sidebar toggle
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        {selectedPage === "dashboard" && <DashboardPage />}
        {selectedPage === "onboarding" && <OnboardingPage />}
      </Suspense>
    </main>
  </div>
  
  );
};

export default Sidebar;
