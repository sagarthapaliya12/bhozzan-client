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

export const acceptOrder = createAsyncThunk(`order/accept`, async (orderId) =>
  orderService.acceptOrder(orderId)
);

export const rejectOrder = createAsyncThunk(`order/reject`, async (orderId) =>
  orderService.rejectOrder(orderId)
);

export const dispatchOrder = createAsyncThunk(`order/dispatch`, async (orderId) =>
  orderService.dispatchOrder(orderId)
);

export const serveOrder = createAsyncThunk(`order/serve`, async (orderId) =>
  orderService.serveOrder(orderId)
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
      // Get Orders
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

      // Accept Orders
      .addCase(acceptOrder.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(acceptOrder.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.orders = state.orders.filter((item) => item._id !== action.payload.order._id);
      })
      .addCase(acceptOrder.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

       // Reject Orders
       .addCase(rejectOrder.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(rejectOrder.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.orders = state.orders.filter((item) => item._id !== action.payload.order._id);
      })
      .addCase(rejectOrder.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

       // Dispatch Orders
       .addCase(dispatchOrder.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(dispatchOrder.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.orders = state.orders.filter((item) => item._id !== action.payload.order._id);
      })
      .addCase(dispatchOrder.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

       // Serve Orders
       .addCase(serveOrder.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(serveOrder.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.orders = state.orders.filter((item) => item._id !== action.payload.order._id);
      })
      .addCase(serveOrder.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      });
  },
});
export const { changeOrderStatusState } = orderSlice.actions;
export default orderSlice.reducer;
