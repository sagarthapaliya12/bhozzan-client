import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showOrder: false,
  // cart: [{ foodID: null, foodName: null, quantity: 0, price: 0 }],
  cart: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleShowOrder: (state, _action) => {
      state.showOrder = !state.showOrder;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
