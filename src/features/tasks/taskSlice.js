// src/features/tasks/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch tasks from a mock API
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=5'
  );
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return await response.json();
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
  },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
