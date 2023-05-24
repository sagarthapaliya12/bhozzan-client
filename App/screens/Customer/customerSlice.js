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
  todaysDishes: [],
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

export const removeFavoriteRestaurant = createAsyncThunk(
  "user/removeFavorite",
  async (restaurantId) => customerService.removeFavoriteRestaurant(restaurantId)
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

export const getOrderHistory = createAsyncThunk("order/my-orders", async () =>
  customerService.getOrderHistory()
);
export const getTodays = createAsyncThunk("dish/best-selling", async () =>
  customerService.getTodays()
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    reset: () => initialState,
    // setSearch: (state, action) => {
    //   state.searchedRestaurantId = action.payload;
    // },
    setBasketRestaurantSearch: (state, action) => {
      state.basketRestaurantSearch = action.payload;
    },
    resetStatus: (state, _action) => {
      state.status = StatusStateEnum.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get User Details
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

      // Get Restaurant Details
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

      // Add Favourite Restaurant
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

      // Get Favourite Restaurant
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

      // Remove Favourite Restaurant
      .addCase(removeFavoriteRestaurant.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(removeFavoriteRestaurant.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        console.log("sads", action.payload);
        state.favoriteRestaurants = state.favoriteRestaurants.filter(
          (item) => item._id !== action.payload.restaurantId
        );
      })
      .addCase(removeFavoriteRestaurant.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Add To Basket
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

      // Get Basket Count
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
        // console.log("fdfddfs", action.payload);
        state.basketDishes = state.basketDishes.filter(
          (item) => item.dish._id !== action.payload.dishId
        );
        state.basketCount--;
      })
      .addCase(removeBasketDish.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      })

      // //Add/Place Order
      // .addCase(placeOrder.pending, (state, _action) => {
      //   state.status = StatusStateEnum.LOADING;
      // })
      // .addCase(placeOrder.fulfilled, (state, action) => {
      //   state.status = StatusStateEnum.SUCCESS;
      //   // state.basketDishes.push(action.payload.dish);
      //   // console.log("action: ", action);
      //   state.successMsg = action.payload.message;
      // })
      // .addCase(placeOrder.rejected, (state, action) => {
      //   state.status = StatusStateEnum.FAILED;
      //   state.errorMsg = action.error.message;
      // })

      //Get Todays Best-Selling
      .addCase(getTodays.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getTodays.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.todaysDishes = action.payload.todays;
      })
      .addCase(getTodays.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      });
  },
});

export const { reset, setBasketRestaurantSearch, resetStatus } = customerSlice.actions;
export default customerSlice.reducer;
