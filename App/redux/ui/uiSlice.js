import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showInformationModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleShowInformationModal: (state, action) => {
      state.showInformationModal = action.payload;
    },
  },
});

export const { toggleShowInformationModal } = uiSlice.actions;
export default uiSlice.reducer;
