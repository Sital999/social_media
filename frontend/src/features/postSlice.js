import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./services/postService";

const initialState = {
  post: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// get all posts
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (__, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postService.getPosts(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// get specific users posts
export const searchPosts = createAsyncThunk(
  "post/searchPosts",
  async (userName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postService.searchPosts(userName, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// get user's own post
export const userPosts = createAsyncThunk(
  "user/userPosts",
  async (__, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postService.userPosts(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// create post
export const createPost = createAsyncThunk(
  "user/createPost",
  async (post, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postService.createPost(post, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// delete post
export const deletePost = createAsyncThunk(
  "user/deletePost",
  async (postID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await postService.deletePost(postID, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// update post
export const updatePost = createAsyncThunk(
  "user/updatePost",
  async (data, thunkAPI) => {
    try {
      const { postId, post } = data;
      const token = thunkAPI.getState().user.user.token;
      return await postService.updatePost(postId, post, token);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(searchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(userPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(userPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.post.posts.push(action.payload.post);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.post.posts = state.post.posts.filter((p) => p.id != payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const post = state.post.posts.filter(
          (p) => p.id != action.payload.post.id
        );
        state.post.posts = [...post, action.payload.post];
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default postSlice.reducer;
export const { reset } = postSlice.actions;
