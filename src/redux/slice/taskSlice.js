import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 🔥 API call
export const addTaskPost = createAsyncThunk(
  "task/addTaskPost",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://task-lh70.onrender.com/tasks",
        taskData
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

const initialState = {
  taskData: [],
  loading: false,
  error: null,
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addTaskPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTaskPost.fulfilled, (state, action) => {
        state.loading = false;
        state.taskData.push(action.payload);
      })
      .addCase(addTaskPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default TaskSlice.reducer;