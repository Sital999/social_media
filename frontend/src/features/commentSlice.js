import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./services/commentService";

const initialState = {
  comment: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get comment
export const getComments = createAsyncThunk(
  "comment/getComments",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await commentService.getComments(postId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// add comment
export const addComment = createAsyncThunk(
  "comment/addComment",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const { postId, text } = data;
      const body = text;
      return await commentService.addComment(postId, body, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comment = action.payload.comments;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comment.push(action.payload.comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
