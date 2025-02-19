"use client";

import React, { useEffect, useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { TrendingDown } from "@mui/icons-material";
import { formatNumber } from "@/utils/formatNumber";
import { IMainData } from "@/types";
import { calculatePercentage } from "@/utils/calculatePercentage";

interface DataStatus {
  active_users: number;
  clicks: number;
  appearance: number;
}



const StatCard = ({ searchQuery }: { searchQuery: string }) => {
    const [data, setData] = useState<DataStatus>({
        active_users: 0,
        clicks: 0,
        appearance: 0,
      });
      const [mainData, setMainData] = useState<IMainData | null>(null); 
      const [showPercentage, setShowPercentage] = useState<DataStatus | null>(null); 
    
      // fetching data from the API
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `https://dummy-1.hiublue.com/api/dashboard/summary?filter=${searchQuery}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
          setMainData(result); // Set mainData here
    
          if (searchQuery === "prev-week") {
            setData(result.previous);
          } else {
            setData(result.current);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [searchQuery]);
    
    // calculating the percentage for clicks ,Users and appearance
      useEffect(() => {
        // Calculate percentages only when mainData changes (and is not null)
        if (mainData) {
          const userPercentage = calculatePercentage(
            Number(mainData.current.active_users),
            Number(mainData.previous.active_users)
          );
          const clickPercentage = calculatePercentage(
            Number(mainData.current.clicks),
            Number(mainData.previous.clicks) 
          );
          const appearancePercentage = calculatePercentage(
            Number(mainData.current.appearance),
            Number(mainData.previous.appearance) 
          );
          setShowPercentage({
            active_users: parseFloat(userPercentage),
            clicks: parseFloat(clickPercentage),
            appearance: parseFloat(appearancePercentage),
          });
        }
      }, [mainData]); 
    
      if (!showPercentage) {
        return <div>Loading...</div>; 
      }
  return (
    <Card>
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 2,
      
      gap: 2,
      "@media (max-width: 700px)": {
        flexDirection: "column",
        alignItems: "center",
      },
    }}
  >
    {/* Active Users */}
    <Box
      sx={{
        width: "280px",
        border: "1px solid #E5E5E5",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Typography component="h3" sx={{ fontSize: "13px", fontWeight: "600", color: "#1C252E", lineHeight: "22px" }}>
        Total Active Users
      </Typography>
      <Typography component="p" sx={{ fontSize: "20px", fontWeight: "700", lineHeight: "40px" }}>
        {formatNumber(data.active_users)}
      </Typography>
      <Typography component="p" sx={{ fontSize: "10px", fontWeight: "400", display: "flex", alignItems: "center" }}>
        {showPercentage.active_users > 0 ? (
          <TrendingUpIcon sx={{ color: "#22c55e" }} />
        ) : (
          <TrendingDown sx={{ color: "red" }} />
        )}
        <Typography component="span" sx={{ fontWeight: "700", fontSize: "10px", marginRight: "5px" }}>
          {showPercentage.active_users}%
        </Typography>
        Previous month
      </Typography>
    </Box>

    {/* Clicks */}
    <Box
      sx={{
        width: "280px",
        border: "1px solid #E5E5E5",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Typography component="h3" sx={{ fontSize: "13px", fontWeight: "600", color: "#1C252E", lineHeight: "22px" }}>
        Total Clicks
      </Typography>
      <Typography component="p" sx={{ fontSize: "20px", fontWeight: "700", lineHeight: "40px" }}>
        {formatNumber(data.clicks)}
      </Typography>
      <Typography component="p" sx={{ fontSize: "10px", fontWeight: "400", display: "flex", alignItems: "center" }}>
        {showPercentage.clicks > 0 ? (
          <TrendingUpIcon sx={{ color: "#22c55e" }} />
        ) : (
          <TrendingDown sx={{ color: "red" }} />
        )}
        <Typography component="span" sx={{ fontWeight: "700", fontSize: "10px", marginRight: "5px" }}>
          {showPercentage.clicks}%
        </Typography>
        Previous month
      </Typography>
    </Box>

    {/* Appearance */}
    <Box
      sx={{
        width: "280px",
        border: "1px solid #E5E5E5",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Typography component="h3" sx={{ fontSize: "13px", fontWeight: "600", color: "#1C252E", lineHeight: "22px" }}>
        Total Appearance
      </Typography>
      <Typography component="p" sx={{ fontSize: "20px", fontWeight: "700", lineHeight: "40px" }}>
        {formatNumber(data.appearance)}
      </Typography>
      <Typography component="p" sx={{ fontSize: "10px", fontWeight: "400", display: "flex", alignItems: "center" }}>
        {showPercentage.appearance > 0 ? (
          <TrendingUpIcon sx={{ color: "#22c55e" }} />
        ) : (
          <TrendingDown sx={{ color: "red" }} />
        )}
        <Typography component="span" sx={{ fontWeight: "700", fontSize: "10px", marginRight: "5px" }}>
          {showPercentage.appearance}%
        </Typography>
        Previous month
      </Typography>
    </Box>
  </Box>
</Card>

  );
};

export default StatCard;
