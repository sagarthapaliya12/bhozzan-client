import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import reservationService from "./reservationAPI";

const initialState = {
  reservationList: [],
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getReservationByTable = createAsyncThunk(`getReservation`, async (tableId) =>
  reservationService.getReservationByTable(tableId)
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Reservation By Table
      .addCase(getReservationByTable.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getReservationByTable.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.reservationList = action.payload.reservations;
      })
      .addCase(getReservationByTable.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      });
  },
});

export const { reset } = reservationSlice.actions;
export default reservationSlice.reducer;
