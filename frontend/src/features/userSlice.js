import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const user = localStorage.getItem("user");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  isLogin: user ? true : false,
};

const API_URL = "/api/users/";

// register
export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      let token;
      const response = await axios.post(API_URL, userData);

      return response.data;
    } catch (error) {
      // sends back the error msg as payload
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// login
export const login = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + "login", userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      // sends back the error msg as payload
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

// logout
export const logout = createAsyncThunk("user/logout", async () => {
  return localStorage.removeItem("user");
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },

  extraReducers: (builders) => {
    builders
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLogin = false;
      });
  },
});

// action type name is same as that of reducer name
export const { reset } = userSlice.actions;
export default userSlice.reducer;
