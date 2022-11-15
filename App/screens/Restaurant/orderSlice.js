import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import orderService from "./orderAPI";

const initialState = {
  orders: [],
  orderStatusState: null,
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getOrders = createAsyncThunk(`order/restaurant`, async (param) =>
  orderService.getOrders(param)
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: () => initialState,
    changeOrderStatusState: (state, action) => {
      state.orderStatusState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.orders = action.payload.orders;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.orders = [];
        state.errorMsg = action.error.errorMsg;
      });
  },
});
export const { changeOrderStatusState } = orderSlice.actions;
export default orderSlice.reducer;
