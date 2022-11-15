import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import orderService from "./orderAPI";

const initialState = {
  pendingOrders: [],
  orderStatusState: null,
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getPendingOrders = createAsyncThunk("/order/restaurant?status=pending", async () =>
  orderService.getPendingOrders()
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
      .addCase(getPendingOrders.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getPendingOrders.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.pendingOrders = action.payload.orders;
      })
      .addCase(getPendingOrders.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      });
  },
});
export const { changeOrderStatusState } = orderSlice.actions;
export default orderSlice.reducer;
