import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
    const response = await axios.post(
        `${BASE_URL}/auth/register`,
        userData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;