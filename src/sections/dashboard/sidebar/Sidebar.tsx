import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Dashboard, ShoppingBag, Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

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
    <div style={{ display: "flex", height: "100vh", position: "relative" }}>
      {/* Hamburger Menu (Mobile) */}
      {isMobile && (
        <IconButton
          onClick={handleMenuClick}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
        >
          <Menu />
        </IconButton>
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
        <List>
          {/* Dashboard */}
          <ListItem component="button" onClick={() => setSelectedPage("dashboard")}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {/* Onboarding */}
          <ListItem component="button" onClick={() => setSelectedPage("onboarding")}>
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
