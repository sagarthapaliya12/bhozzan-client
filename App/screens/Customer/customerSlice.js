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
  basketCount: 0,
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

export const getBasketCount = createAsyncThunk("basket/count", async () =>
  customerService.getBasketCount()
);

export const getBasketRestaurants = createAsyncThunk("basket/getBasketRestaurants", async () =>
  customerService.getBasketRestaurants()
);

export const getBasketDishes = createAsyncThunk("basket/getBasketDishes", async (restaurantId) =>
  customerService.getBasketDishes(restaurantId)
);

export const removeBasketDish = createAsyncThunk("basket/removeBasketDish", async (dishId) =>
  customerService.removeBasketDish(dishId)
);

export const placeOrder = createAsyncThunk("order/create", async (order) =>
  customerService.placeOrder(order)
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
        state.basketCount++;
        state.successMsg = action.payload.message;
      })
      .addCase(addToBasket.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      })

      //Get Basket Count
      .addCase(getBasketCount.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getBasketCount.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.basketCount = action.payload.count;
      })
      .addCase(getBasketCount.rejected, (state, action) => {
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
        state.errorMsg = action.error.message;
      })

      //Get Basket Dishes
      .addCase(getBasketDishes.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getBasketDishes.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.basketDishes = action.payload.dish;
        console.log("fsdd", action.payload);
      })
      .addCase(getBasketDishes.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      })

      //Remove Basket Dish
      .addCase(removeBasketDish.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(removeBasketDish.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        // console.log("fsdd", action.payload);
        state.basketDishes = state.basketDishes.filter((item) => item._id !== action.payload);
        // state.basketDishes = action.payload.dish;
      })
      .addCase(removeBasketDish.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      })

      //Add/Place Order
      .addCase(placeOrder.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        // state.basketDishes.push(action.payload.dish);
        // console.log("action: ", action);
        state.successMsg = action.payload.message;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      });
  },
});

export const { reset, setSearch, setBasketRestaurantSearch } = customerSlice.actions;
export default customerSlice.reducer;
