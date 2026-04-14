import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/tasks";

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching tasks");
    }
  }
);

// Add a new task
export const addTaskPost = createAsyncThunk(
  "task/addTaskPost",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding task");
    }
  }
);

const initialState = {
  taskData: [],
  loading: false,
  error: null,
  searchQuery: "",
  notifications: [
    { id: 1, text: "Welcome to TaskFlow!", type: "info", time: "Just now" },
    { id: 2, text: "Your daily streak is at 5 days. Keep it up!", type: "success", time: "2h ago" }
  ],
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        time: "Just now",
        ...action.payload
      });
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  },

  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.taskData = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Task
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

export const { setSearchQuery, addNotification, clearNotifications } = TaskSlice.actions;
export default TaskSlice.reducer;