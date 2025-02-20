


import Navbar from "@/sections/dashboard/dashboarComponents/Navbar";
import DashboardView from "@/sections/dashboard/views/dashboard-view";
import { Box } from "@mui/material";

export const metadata = {
  title: "Dashboard",
};

export default function Page() {
 

  return (
    <Box>
    <Navbar></Navbar>

      <main style={{ marginTop: "35px", padding: "10px" }}>
        <DashboardView />
      </main>
    </Box>
  );
}
