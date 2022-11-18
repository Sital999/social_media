import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import postReducer from "../features/postSlice";
import modalReducer from "../features/modalSlice";
import commentReducer from "../features/commentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    modal: modalReducer,
    comment: commentReducer,
  },
});

export default store;
