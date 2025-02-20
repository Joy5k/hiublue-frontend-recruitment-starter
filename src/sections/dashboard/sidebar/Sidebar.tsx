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
  AppBar,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { ShoppingBag, Menu, Speed } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

// Lazy load pages
const DashboardPage = lazy(() => import("../views/DashboarderOverview"));
const OnboardingPage = lazy(() => import("@/onboarding/views/CreateOffer"));

const Sidebar = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // Check if screen is md or larger
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is sm or smaller

  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<"dashboard" | "onboarding">(
    "dashboard"
  );

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" ,maxWidth: "100%",}}>
      {!isMdUp && (
        <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMenuClick}
              sx={{ color: "black" }}
            >
              <Menu />
            </IconButton>
         
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={isMdUp ? true : open}
        onClose={isMdUp ? undefined : handleMenuClick}
        variant={isMdUp ? "permanent" : "temporary"}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            ...(isMdUp ? {} : { top: isSmDown ? "56px" : "64px" }),
          },
        }}
      >
        <Box sx={{ marginTop: "20px", marginLeft: "20px" }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Image src="/icon 1.png" alt="Project Icon" width={50} height={50} />
          </IconButton>
        </Box>

        <List style={{ margin: "0 0 0 10px" }}>
          <Typography component="p" style={{ color: "gray", margin: "10px" }}>
            Overview
          </Typography>

          <ListItem
            component="button"
            onClick={() => setSelectedPage("dashboard")}
            sx={{
              background: selectedPage === "dashboard" ? "#EFEFEF" : "transparent",
              border: "none",
              cursor: "pointer",
              "&:hover": { background: "#EFEFEF" },
            }}
          >
            <ListItemIcon>
              <Speed />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem
            component="button"
            onClick={() => setSelectedPage("onboarding")}
            sx={{
              background: selectedPage === "onboarding" ? "#EFEFEF" : "transparent",
              border: "none",
              cursor: "pointer",
              "&:hover": { background: "#EFEFEF" },
            }}
          >
            <ListItemIcon>
              <ShoppingBag />
            </ListItemIcon>
            <ListItemText primary="Onboarding" />
          </ListItem>
        </List>
      </Drawer>

      <main
  style={{
    flexGrow: 1,
    padding: "20px",
    marginLeft: isMdUp ? 240 : 0,
    transition: "margin 0.3s ease-in-out",
    marginTop: isMdUp ? 0 : "64px",
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",
  }}
>
  <Suspense fallback={<div>Loading...</div>}>
    {selectedPage === "dashboard" && <DashboardPage />}
    {selectedPage === "onboarding" && <OnboardingPage />}
  </Suspense>
</main>

    </Box>
  );
};

export default Sidebar;
