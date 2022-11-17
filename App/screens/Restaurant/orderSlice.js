import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import orderService from "./orderAPI";

const initialState = {
  orders: [],
  orderHistories: [],
  orderStatusState: null,
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getOrders = createAsyncThunk(`order/restaurant`, async (param) =>
  orderService.getOrders(param)
);

export const getOrderHistory = createAsyncThunk("order/my-orders", async () =>
  orderService.getOrderHistory()
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
      })

      //Get Order History
      .addCase(getOrderHistory.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.orderHistories = action.payload.orders;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      });
  },
});
export const { changeOrderStatusState } = orderSlice.actions;
export default orderSlice.reducer;
