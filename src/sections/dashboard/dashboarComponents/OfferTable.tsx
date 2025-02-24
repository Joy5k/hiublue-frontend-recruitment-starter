"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Chip,
  IconButton,
  TablePagination,
  Typography,
  Box,
  ButtonGroup,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IOffer } from "@/types";

const OfferTable = () => {
  const [data, setData] = useState<IOffer[]>([]);
  const [totalRecords, setTotalRecords] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<keyof IOffer>("user_name");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  console.log(page + 1, 'page number',data);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://dummy-1.hiublue.com/api/offers?page=${page + 1}&per_page=${rowsPerPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (data.data.length === 0 && page > 0) {
        setPage((prev) => Math.max(0, prev - 1));
      } else {
        setData(data.data);
        setTotalRecords(data.meta.total); // Total number of records
        setTotalPages(Math.ceil(data.meta.total / rowsPerPage)); // Total pages calculation
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const filteredData = data.filter((offer) => {
    const searchTerm = search.toLowerCase();
    const fieldValue = String(offer[searchField]).toLowerCase();
    return (
      fieldValue.includes(searchTerm) &&
      (typeFilter === "All" || offer.type.toLowerCase() === typeFilter.toLowerCase()) &&
      (statusFilter === "All" || offer.status.toLowerCase() === statusFilter.toLowerCase())
    );
  });

  const handlePageChange = (_event: unknown, newPage: number) => {
    if (newPage < totalPages) {
      console.log(newPage);
      setPage(newPage);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ maxWidth: 900, margin: "auto", padding: 2, marginTop: "20px" }}>
      <Typography component="h4" sx={{ fontWeight: "700", margin: "10px 0", fontSize: 20 }}>
        Offer Lists
      </Typography>

      <Box>
        <ButtonGroup
          size="small"
          sx={{
            border: 'none',
            backgroundColor: "transparent",
            borderRadius: "0",
            margin: "20px 0",
          }}
        >
          {["All", "accepted", "rejected", "pending"].map((status) => (
            <Button
              key={status}
              onClick={() => setStatusFilter(status)}
              variant="text"
              sx={{
                textTransform: 'capitalize',
                color: statusFilter === status ? '#000' : 'gray',
                borderBottom: statusFilter === status ? '2px solid black' : 'none',
                backgroundColor: 'transparent',
                textDecoration: 'none',
                borderRadius: '0',
                '&:hover': {
                  backgroundColor: 'transparent',
                  borderBottom: statusFilter === status ? '2px solid black' : 'none',
                  color: statusFilter === status ? '#000' : 'gray',
                },
              }}
            >
              {status}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={searchField} onChange={(e) => setSearchField(e.target.value as keyof IOffer)} size="small">
            <MenuItem value="user_name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
            <MenuItem value="company">Company</MenuItem>
            <MenuItem value="jobTitle">Job Title</MenuItem>
            <MenuItem value="type">Type</MenuItem>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Typography sx={{ display: "flex", alignItems: "center" }}>Type:</Typography>
          <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} size="small">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="pay as you go">Pay As You Go</MenuItem>
          </Select>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <TableContainer sx={{ maxWidth: "825px", margin: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                filteredData
                .map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell>
                      <div>
                        <div>{offer.user_name}</div>
                        <div style={{ color: "#666", fontSize: "0.875rem" }}>
                          {offer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{offer.phone}</TableCell>
                    <TableCell>{offer.company}</TableCell>
                    <TableCell>{offer.jobTitle}</TableCell>
                    <TableCell>{offer.type}</TableCell>
                    <TableCell>
                      <Chip label={offer.status} color={getStatusColor(offer.status)} />
                    </TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        my: "auto",
                      }}
                    >
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 30, 50]}
        component="div"
        count={totalRecords} 
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        nextIconButtonProps={{ disabled: page >= totalPages - 1 }}
      />
    </Paper>
  );
};

export default OfferTable;
