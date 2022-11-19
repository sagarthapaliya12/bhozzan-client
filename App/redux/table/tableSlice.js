import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import tableService from "./tableAPI";

const initialState = {
  tableList: [],
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getTablesByRestaurant = createAsyncThunk(
  `getTablesByRestaurant`,
  async (restaurantId) => tableService.getTablesByRestaurant(restaurantId)
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Tables By Restaurant
      .addCase(getTablesByRestaurant.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getTablesByRestaurant.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.tableList = action.payload.tables;
      })
      .addCase(getTablesByRestaurant.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.tableList = [];
        state.errorMsg = action.error.errorMsg;
      });
  },
});
export const { reset } = tableSlice.actions;
export default tableSlice.reducer;
