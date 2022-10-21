import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import restaurantService from "./restaurantAPI";

const initialState = {
  restaurantList: [],
  search: null,
  restaurant: {},
  dishes: [],
  allDishes: [],
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getAllRestaurants = createAsyncThunk("restaurant/list", async () =>
  restaurantService.getAllRestaurants()
);

export const getRestaurantDetails = createAsyncThunk("restaurant", async (restaurantId) =>
  restaurantService.getRestaurantDetails(restaurantId)
);

export const getAllDishes = createAsyncThunk("dish", async () => restaurantService.getAllDishes());

export const getDishesByRestaurantId = createAsyncThunk("dish/restaurant", async (restaurantId) =>
  restaurantService.getDishesByRestaurantId(restaurantId)
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    reset: () => initialState,
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get All Restaurants
      .addCase(getAllRestaurants.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getAllRestaurants.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.restaurantList = action.payload.restaurants;
      })
      .addCase(getAllRestaurants.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Get Restaurant Details
      .addCase(getRestaurantDetails.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getRestaurantDetails.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.restaurant = action.payload.restaurant;
      })
      .addCase(getRestaurantDetails.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Get All Dishes
      .addCase(getAllDishes.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getAllDishes.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.allDishes = action.payload;
      })
      .addCase(getAllDishes.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Get Dishes By RestaurantId
      .addCase(getDishesByRestaurantId.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getDishesByRestaurantId.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.dishes = action.payload.dishes;
      })
      .addCase(getDishesByRestaurantId.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      });
  },
});

export const { reset, setSearch } = restaurantSlice.actions;
export default restaurantSlice.reducer;
