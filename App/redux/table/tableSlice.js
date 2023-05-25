import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import tableService from "./tableAPI";

const initialState = {
  tableList: [],
  tableId: null,
  tableInfo: {},
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getTablesByRestaurant = createAsyncThunk(
  `getTablesByRestaurant`,
  async (restaurantId) => tableService.getTablesByRestaurant(restaurantId)
);

export const addNewTable = createAsyncThunk("table/add", async (table) =>
  tableService.addNewTable(table)
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    reset: () => initialState,
    setTableId: (state, action) => {
      state.tableId = action.payload;
    },
    setTableInfo: (state, action) => {
      state.tableInfo = action.payload;
    },
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
      })

      // Add new table
      .addCase(addNewTable.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(addNewTable.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.successMsg = action.payload.message;
        state.tableList.push(action.payload.table);
      })
      .addCase(addNewTable.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      });
  },
});

export const { reset, setTableId, setTableInfo } = tableSlice.actions;
export default tableSlice.reducer;
