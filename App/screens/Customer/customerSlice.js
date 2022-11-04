import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import customerService from "./customerAPI";

const initialState = {
  user: {},
  favoriteRestaurants: [],
  searchedRestaurantId: null,
  searchedRestaurantInfo: {},
  basket: [],
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getUserDetails = createAsyncThunk("user/my-details", async () =>
  customerService.getUserDetails()
);

export const getRestaurantDetails = createAsyncThunk("restaurant", async (restaurantId) =>
  customerService.getRestaurantDetails(restaurantId)
);

export const addFavoriteRestaurant = createAsyncThunk("user/addFavorite", async (restaurantId) =>
  customerService.addFavoriteRestaurant(restaurantId)
);

export const getFavoriteRestaurant = createAsyncThunk("user/getFavorite", async () =>
  customerService.getFavoriteRestaurant()
);

export const addToBasket = createAsyncThunk("basket/addToBasket", async (dishId) =>
  customerService.addToBasket(dishId)
);

export const getBasketDishes = createAsyncThunk("basket/getBasketDishes", async () =>
  customerService.getBasketDishes()
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    reset: () => initialState,
    setSearch: (state, action) => {
      state.searchedRestaurantId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get User Details
      .addCase(getUserDetails.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.user = action.payload.user;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Get Restaurant Details
      .addCase(getRestaurantDetails.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getRestaurantDetails.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.searchedRestaurantInfo = action.payload.restaurant;
      })
      .addCase(getRestaurantDetails.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Add Favourite Restaurant
      .addCase(addFavoriteRestaurant.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(addFavoriteRestaurant.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.favoriteRestaurants.push(action.payload);
      })
      .addCase(addFavoriteRestaurant.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Get Favourite Restaurant
      .addCase(getFavoriteRestaurant.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getFavoriteRestaurant.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.favoriteRestaurants = action.payload.favoriteRestaurants;
      })
      .addCase(getFavoriteRestaurant.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Add To Basket
      .addCase(addToBasket.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(addToBasket.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.basket.push(action.payload.dish);
      })
      .addCase(addToBasket.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Get Basket Dishes
      .addCase(getBasketDishes.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getBasketDishes.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.basket = action.payload.basket.dishes;
      })
      .addCase(getBasketDishes.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      });
  },
});

export const { reset, setSearch } = customerSlice.actions;
export default customerSlice.reducer;
