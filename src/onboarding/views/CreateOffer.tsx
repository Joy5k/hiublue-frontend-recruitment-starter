"use client";

import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  Box,
  Autocomplete,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

type OfferData = {
  plan_type: string;
  additions: string[];
  user_id: string;
  expired: string;
  price: number;
};

const CreateOffer = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const token = localStorage.getItem("token");
  // Set up react-hook-form
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitted, isLoading },
  } = useForm<OfferData>();
  console.log({ errors, isLoading, isSubmitted });

  // Fetch users based on the search input
  const fetchUsers = async (search: string) => {
    const token = localStorage.getItem("token");

    if (!search) {
      setUsers([]);
      return;
    }

    try {
      // API call to search users based on the search term
      const response = await fetch(
        `https://dummy-1.hiublue.com/api/users?search=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data?.data) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const handleFormSubmit = async (data: OfferData) => {
  
    // Ensure 'additions' is an array of selected values
    const additions = [];
    if (Array.isArray(data.additions)) {
      // Check each addition if it's true, add it to the array
      if (data.additions.includes("refundable")) additions.push("refundable");
      if (data.additions.includes("on_demand")) additions.push("on_demand");
      if (data.additions.includes("negotiable")) additions.push("negotiable");
    }
    const offerData = {
      plan_type: data.plan_type,
      additions: additions, 
      user_id: selectedUser?.id, 
      expired: data.expired ? new Date(data.expired).toISOString().split("T")[0] : new Date().toISOString().split("T")[0], 
      price: Number(data.price), 
    };
  
    console.log("Formatted offer data:", offerData);
  
    try {
      const response = await fetch("https://dummy-1.hiublue.com/api/offers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerData),
      });
  
      if (response.ok) {
        const result = await response.json();
        toast.success("Successfully Created the Offer!");
        console.log("Offer created successfully:", result);
      } else {
        const error = await response.json();
        const errorMessage = error?.message ?? "Something went wrong!";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error?.message ?? "Something went wrong!";
      toast.error(errorMessage);
    }
  };
  
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            maxWidth: 1500,
            width: "100%",
            margin: "auto",
            padding: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <h2>Create Offer</h2>
          <p>Send onboarding offer to new user</p>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
              <Controller
                name="plan_type"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="pay_as_you_go"
                      control={
                        <Radio
                          sx={{
                            color: "#00a76f",
                            "&.Mui-checked": { color: "#00a76f" },
                          }}
                        />
                      }
                      label="Pay As You Go"
                    />
                    <FormControlLabel
                      value="monthly"
                      control={
                        <Radio
                          sx={{
                            color: "#00a76f",
                            "&.Mui-checked": { color: "#00a76f" },
                          }}
                        />
                      }
                      label="Monthly"
                    />
                    <FormControlLabel
                      value="yearly"
                      control={
                        <Radio
                          sx={{
                            color: "#00a76f",
                            "&.Mui-checked": { color: "#00a76f" },
                          }}
                        />
                      }
                      label="Yearly"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>

            {/* Additions */}
            <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
              <Controller
                name="additions"
                control={control}
                render={({ field }) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          value="refundable"
                          sx={{
                            color: "#00a76f",
                            "&.Mui-checked": { color: "#00a76f" },
                          }}
                        />
                      }
                      label="Refundable"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          value="on_demand"
                          sx={{
                            color: "#00a76f",
                            "&.Mui-checked": { color: "#00a76f" },
                          }}
                        />
                      }
                      label="On demand"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          value="negotiable"
                          sx={{
                            color: "#00a76f",
                            "&.Mui-checked": { color: "#00a76f" },
                          }}
                        />
                      }
                      label="Negotiable"
                    />
                  </>
                )}
              />
            </FormControl>

            {/* User Selection */}
            <Controller
              name="user_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  value={field.value}
                  onChange={(e, value) => {
                    field.onChange(value);
                    setSelectedUser(value);
                  }}
                  options={users}
                  getOptionLabel={(option: any) => option.name}
                  onInputChange={(_, value) => fetchUsers(value)}
                  renderInput={(params) => <TextField {...params} label="Select User" />}
                  isOptionEqualToValue={(option: any, value: any) => option.id === value?.id}
                />
              )}
            />

            {/* Expiry Date */}
            <Controller
  name="expired"
  control={control}
  render={({ field }) => (
    <DesktopDatePicker
      {...field}
      label="Expired"
      format="DD MMM YYYY"
      value={field.value ? dayjs(field.value) : selectedDate}  
      onChange={(date) => {
        setSelectedDate(date);
        field.onChange(date); 
      }}
      slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
    />
  )}
/>


            {/* Price */}
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  fullWidth
                  margin="normal"
                  InputProps={{ startAdornment: "$" }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    field.onChange(value);
                  }}
                />
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "#00a76f" },
                backgroundColor: "black",
                width: "110px",
                alignItems: "end",
                mt: 2,
                right: 0,
              }}
            >
              Send Offer
            </Button>
          </form>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default CreateOffer;
