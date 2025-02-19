import DashboardView from "@/sections/dashboard/views/dashboard-view";
import { Box } from "@mui/material";

export const metadata = {
    title: 'Dashbord',
};


export default function Page() {
    return <Box><DashboardView/></Box>;
}
