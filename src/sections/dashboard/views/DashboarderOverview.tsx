'use client';

import { Box, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import StatCard from "../dashboarComponents/StatCart";
import ApexChart from "../dashboarComponents/ApexChart";
import OfferTable from "../dashboarComponents/OfferTable";




const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSearchQuery(event.target.value as string);
  };
  return (
    <Box>
      {/*  Dashboard header with searchQuery select */}
     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
     <Typography component="h1" sx={{ fontSize:"20px", fontWeight:"700"}}>Dashboard</Typography>

      <FormControl sx={{ minWidth: 120, marginTop: 2 }}>
        <InputLabel id="searchQuery-select-label">searchQuery</InputLabel>
        <Select
          labelId="searchQuery-select-label"
          id="searchQuery-select"
          value={searchQuery}
          label="This Week"
          onChange={handleChange}
          defaultValue="this-week"
        >
          <MenuItem value="this-week">This Week</MenuItem>
          <MenuItem value="prev-week">Previous Week</MenuItem>
        </Select>
      </FormControl>
     </Box>

      {/* Stat cards */}
     
    <StatCard searchQuery={searchQuery}></StatCard>

      {/* Apex Chart */}
      <Box sx={{ mt: 4 }}>
      <ApexChart searchQuery={searchQuery}></ApexChart>
      </Box>
      <Box>
        <OfferTable></OfferTable>
      </Box>
    </Box>
  );
};

export default DashboardPage;
