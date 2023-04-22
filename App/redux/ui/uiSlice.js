import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMessageModal: false,
  showSnackbar: false,
  restaurantIdSearch: null,
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
    setRestaurantSearch: (state, action) => {
      state.restaurantIdSearch = action.payload;
    },
  },
});

export const { toggleShowMessageModal, toggleShowSnackbar, setRestaurantSearch } = uiSlice.actions;
export default uiSlice.reducer;
