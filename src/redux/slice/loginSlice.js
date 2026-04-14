import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // ✅ FIX: axios import

export const fetchUsers = createAsyncThunk(
  "async/fetchuser",
  async (loginData, thunkAPI) => {
    try {
      const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
      const response = await axios.get(
        `${baseURL}/users?email=${loginData.email}&password=${loginData.password}`
      );
      
      if (response.data.length > 0) {
        return response.data[0]; // Return the first matched user
      } else {
        return thunkAPI.rejectWithValue("Invalid email or password");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error Fetching Users"
      );
    }
  }
);

const initialState = {
  user: null,
  users: [], // (optional, keep if you want)
  loading: false,
  error: null,
  success: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false; // ✅ FIX
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        state.success = true; // ✅ FIX
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false; // ✅ FIX
      });
  },
});

export default loginSlice.reducer;