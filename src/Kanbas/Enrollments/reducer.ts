import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as enrollmentsClient from "./client";
import { Enrollment } from "../types";

export const fetchEnrollmentsForUser = createAsyncThunk(
  "enrollments/fetchForUser",
  async (userId: string) => {
    const data = await enrollmentsClient.findEnrollmentsForUser(userId);
    return data;
  }
);

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: [] as Enrollment[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEnrollmentsForUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default enrollmentsSlice.reducer;
