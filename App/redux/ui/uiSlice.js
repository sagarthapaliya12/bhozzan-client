import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showInvalidCredentialsModal: false,
  showSnackbar: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleShowInvalidCredentialsModal: (state, action) => {
      state.showInvalidCredentialsModal = action.payload;
    },
    toggleShowSnackbar: (state, action) => {
      state.showSnackbar = action.payload;
    },
  },
});

export const { toggleShowInvalidCredentialsModal, toggleShowSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
