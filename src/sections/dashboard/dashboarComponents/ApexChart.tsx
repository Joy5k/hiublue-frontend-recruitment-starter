import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme } from "@mui/material";

// Load ApexCharts dynamically to prevent SSR issues in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ApexChart = ({ searchQuery }: { searchQuery: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [websiteVisitsSeries, setWebsiteVisitsSeries] = useState<any[]>([]);
  const [offersSentSeries, setOffersSentSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://dummy-1.hiublue.com/api/dashboard/stat?filter=${searchQuery}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.website_visits && data.offers_sent) {
          // Extracting categories (days of the week)
          const days = Object.keys(data.website_visits);

          // Extracting series data
          const desktopData = days.map((day) => data.website_visits[day].desktop);
          const mobileData = days.map((day) => data.website_visits[day].mobile);
          const offersData = days.map((day) => data.offers_sent[day]);

          setCategories(days.map((day) => day.charAt(0).toUpperCase() + day.slice(1,3))); // Capitalizing days
          setWebsiteVisitsSeries([
            { name: "Desktop", data: desktopData },
            { name: "Mobile", data: mobileData },
          ]);
          setOffersSentSeries([{ name: "Offers Sent", data: offersData }]);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  // Website Visits Chart Options
  const websiteVisitsOptions: ApexCharts.ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    colors: ["#339385", "#ffbc33"],
    plotOptions: { bar: { columnWidth: "50%", borderRadius: 4 } },
    dataLabels: { enabled: false },
    xaxis: { categories },
    legend: { position: "top", markers: { size: 4 } },
  };

  // Offers Sent Chart Options
  const offersSentOptions: ApexCharts.ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#000"],
    xaxis: { categories },
    dataLabels: { enabled: false },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Website Visits Chart */}
      <Card sx={{ width: isMobile ? "100%" : "48%", minWidth: "300px" }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Website visits
          </Typography>
          {websiteVisitsSeries.length > 0 && (
            <Chart options={websiteVisitsOptions} series={websiteVisitsSeries} type="bar" height={250} />
          )}
        </CardContent>
      </Card>

      {/* Offers Sent Chart */}
      <Card sx={{ width: isMobile ? "100%" : "48%", minWidth: "300px" }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Offers sent
          </Typography>
          {offersSentSeries.length > 0 && (
            <Chart options={offersSentOptions} series={offersSentSeries} type="line" height={250} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ApexChart;
