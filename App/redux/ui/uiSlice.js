import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showInvalidCredentialsModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleShowInvalidCredentialsModal: (state, action) => {
      state.showInvalidCredentialsModal = action.payload;
    },
  },
});

export const { toggleShowInvalidCredentialsModal } = uiSlice.actions;
export default uiSlice.reducer;
