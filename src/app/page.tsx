import CreateOffer from "@/onboarding/views/CreateOffer";
import DashboardView from "@/sections/dashboard/views/dashboard-view";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import Image from "next/image";

export const metadata = {
    title: 'Dashbord',
};


export default function Page() {
    return <Box>
        <AppBar position="fixed" sx={{ backgroundColor: "#fff", boxShadow: "none"  ,zIndex:20, borderBottom: "1px solid #f0f0f0"}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Project Icon */}
          <Box>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Image src="/icon 1.png"    alt="Project Icon" width={40} height={40} />
            </IconButton>
          </Box>

          {/* Profile Image */}
          <Box>
            <Avatar alt="Profile" src="/path-to-your-profile-image.jpg" />
          </Box>
        </Toolbar>
      </AppBar>
      <main
        style={{
          marginTop: "35px", 
          padding: "10px",
        }}
      >
        
        <DashboardView/>
      </main>
        </Box>;
}
