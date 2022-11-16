import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMessageModal: false,
  showSnackbar: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleShowMessageModal: (state, action) => {
      state.showMessageModal = action.payload;
    },
    toggleShowSnackbar: (state, action) => {
      state.showSnackbar = action.payload;
    },
  },
});

export const { toggleShowMessageModal, toggleShowSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
