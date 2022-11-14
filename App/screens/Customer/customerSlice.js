import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import customerService from "./customerAPI";

const initialState = {
  user: {},
  favoriteRestaurants: [],
  searchedRestaurantId: null,
  searchedRestaurantInfo: {},
  basketRestaurantSearch: null,
  basketRestaurants: [],
  basketDishes: [],
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

export const getBasketRestaurants = createAsyncThunk("basket/getBasketRestaurants", async () =>
  customerService.getBasketRestaurants()
);

export const getBasketDishes = createAsyncThunk("basket/getBasketDishes", async (restaurantId) =>
  customerService.getBasketDishes(restaurantId)
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    reset: () => initialState,
    setSearch: (state, action) => {
      state.searchedRestaurantId = action.payload;
    },
    setBasketRestaurantSearch: (state, action) => {
      state.basketRestaurantSearch = action.payload;
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
        state.errorMsg = action.error.message;
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
        // state.basketDishes.push(action.payload.dish);
        // console.log("action: ", action);
        state.successMsg = action.payload.message;
      })
      .addCase(addToBasket.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      })

      //Get Basket Restaurants
      .addCase(getBasketRestaurants.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getBasketRestaurants.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.basketRestaurants = action.payload.basket.restaurant;
      })
      .addCase(getBasketRestaurants.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Get Basket Dishes
      .addCase(getBasketDishes.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getBasketDishes.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.basketDishes = action.payload.dish;
      })
      .addCase(getBasketDishes.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      });
  },
});

export const { reset, setSearch, setBasketRestaurantSearch } = customerSlice.actions;
export default customerSlice.reducer;
