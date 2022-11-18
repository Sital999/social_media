import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  showUpdateModal: false,
  updateId: "",
  clickEllipsis: false,
  showComments: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // to toggle modal
    setShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    // to toggle update  modal
    setShowUpdateModal: (state) => {
      state.showUpdateModal = !state.showUpdateModal;
    },
    // since update id cant be passed through map fn in jsx coz it always sends the last id
    setUpdate: (state, action) => {
      state.updateId = action.payload;
    },
    // toggle 3 button after which edit and delete is added
    setClickEllipsis: (state) => {
      state.clickEllipsis = !state.clickEllipsis;
    },
    // toggle comments
    setShowComments: (state) => {
      state.showComments = !state.showComments;
    },
  },
});

export default modalSlice.reducer;
export const {
  setShowModal,
  setShowUpdateModal,
  setUpdate,
  setClickEllipsis,
  setShowComments,
} = modalSlice.actions;
