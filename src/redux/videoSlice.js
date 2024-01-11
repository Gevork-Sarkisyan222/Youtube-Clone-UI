import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVideo = createAsyncThunk(
  'video/fetchVideo',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/videos/find/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    like: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex((userId) => userId === action.payload),
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex((userId) => userId === action.payload),
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload;
      })
      .addCase(fetchVideo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { like, dislike } = videoSlice.actions;
export default videoSlice.reducer;
