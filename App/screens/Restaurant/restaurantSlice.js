import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import restaurantService from "./restaurantAPI";

const initialState = {
  restaurants: [],
  dishes: [],
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getAllDishes = createAsyncThunk("dish", async () => restaurantService.getAllDishes());

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDishes.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getAllDishes.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.dishes = action.payload;
        console.log("Lol: ", action.payload);
      })
      .addCase(getAllDishes.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      });
  },
});

export default restaurantSlice.reducer;
