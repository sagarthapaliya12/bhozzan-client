import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import reservationService from "./reservationAPI";

const initialState = {
  reservationList: [],
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getReservationByTableCustomer = createAsyncThunk(
  `getReservationForCustomer`,
  async (tableId) => reservationService.getReservationByTableCustomer(tableId)
);

export const getReservationByTableRestaurant = createAsyncThunk(
  `getReservationForRestaurant`,
  async (tableId) => reservationService.getReservationByTableRestaurant(tableId)
);

export const getMyReservation = createAsyncThunk(`getMyReservation`, async () =>
  reservationService.getMyReservation()
);

export const createReservation = createAsyncThunk(`createReservation`, async (reservationDetail) =>
  reservationService.createReservation(reservationDetail)
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Reservation By Table -- Customer
      .addCase(getReservationByTableCustomer.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getReservationByTableCustomer.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.reservationList = action.payload.reservations;
      })
      .addCase(getReservationByTableCustomer.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Get Reservation By Table -- Restaurant
      .addCase(getReservationByTableRestaurant.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getReservationByTableRestaurant.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.reservationList = action.payload.reservations;
      })
      .addCase(getReservationByTableRestaurant.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Get My Reservation
      .addCase(getMyReservation.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getMyReservation.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.reservationList = action.payload.reservations;
      })
      .addCase(getMyReservation.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Create Reservation
      .addCase(createReservation.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.successMsg = action.payload.message;
        state.reservationList.push(action.payload.reservation);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      });
  },
});

export const { reset } = reservationSlice.actions;
export default reservationSlice.reducer;
