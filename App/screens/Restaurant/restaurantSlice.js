import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import restaurantService from "./restaurantAPI";

const initialState = {
  restaurantUser: {},
  restaurantUserId: null,
  restaurantList: [],
  unVerifiedRestaurants: [],
  search: null, //move this to  customer
  rating: null,
  dishes: [],
  allDishes: [],
  categoryState: null,
  dishToUpdate: {},
  categoryDish: [],
  noOfSeats: 0,
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const getAllRestaurants = createAsyncThunk("restaurant/list", async () =>
  restaurantService.getAllRestaurants()
);

export const getUnverifiedRestaurants = createAsyncThunk("restaurant/list/unverifiee", async () =>
  restaurantService.getUnverifiedRestaurants()
);

export const getRestaurantDetails = createAsyncThunk("restaurant", async (restaurantId) =>
  restaurantService.getRestaurantDetails(restaurantId)
);

export const updateRestaurantDetails = createAsyncThunk(
  "restaurant/update",
  async (restaurantDetails) => restaurantService.updateRestaurantDetails(restaurantDetails)
);

export const getRestaurantUserId = createAsyncThunk("user/my-details", async () =>
  restaurantService.getRestaurantUserId()
);

export const getAllDishes = createAsyncThunk("dish", async () => restaurantService.getAllDishes());

export const getDishesByRestaurantId = createAsyncThunk("dish/restaurant", async (restaurantId) =>
  restaurantService.getDishesByRestaurantId(restaurantId)
);

export const getDishesByCategory = createAsyncThunk("dish/category", async (categoryName) =>
  restaurantService.getDishesByCategory(categoryName)
);

export const addDish = createAsyncThunk("dish/add", async (dish) =>
  restaurantService.addDish(dish)
);

export const updateDish = createAsyncThunk("/dish/update", async (update) =>
  restaurantService.updateDish(update)
);

export const verifyRestaurant = createAsyncThunk("restaurant/verify", async (restaurantId) =>
  restaurantService.verifyRestaurant(restaurantId)
);

export const refuteRestaurant = createAsyncThunk("restaurant/refute", async (restaurantId) =>
  restaurantService.refuteRestaurant(restaurantId)
);

export const getRestaurantRating = createAsyncThunk("restaurant/rating", async (restaurantId) =>
  restaurantService.getRestaurantRating(restaurantId)
);

export const rateRestaurant = createAsyncThunk("restaurant/rate", async (detail) =>
  restaurantService.rateRestaurant(detail)
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    reset: () => initialState,
    changeCategoryState: (state, action) => {
      state.categoryState = action.payload;
    },
    addSeats: (state, action) => {
      state.noOfSeats = action.payload;
    },
    setDishToUpdate: (state, action) => {
      state.dishToUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Restaurants
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

      // Get Unverified Restaurants
      .addCase(getUnverifiedRestaurants.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getUnverifiedRestaurants.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.unVerifiedRestaurants = action.payload.restaurants;
      })
      .addCase(getUnverifiedRestaurants.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Get Restaurant Details
      .addCase(getRestaurantDetails.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getRestaurantDetails.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.restaurantUser = action.payload.restaurant;
      })
      .addCase(getRestaurantDetails.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Update Restaurant Details
      .addCase(updateRestaurantDetails.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(updateRestaurantDetails.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.restaurantUser = action.payload.restaurant;
      })
      .addCase(updateRestaurantDetails.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Get Restaurant Id
      .addCase(getRestaurantUserId.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getRestaurantUserId.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.restaurantUserId = action.payload;
      })
      .addCase(getRestaurantUserId.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Get All Dishes
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

      // Get Dishes By RestaurantId
      .addCase(getDishesByRestaurantId.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getDishesByRestaurantId.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.dishes = action.payload.result;
      })
      .addCase(getDishesByRestaurantId.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Get Dishes By Category
      .addCase(getDishesByCategory.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getDishesByCategory.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.categoryDish = action.payload.dishes;
      })
      .addCase(getDishesByCategory.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Add dish
      .addCase(addDish.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.categoryDish;
        state.successMsg = action.payload.message;
      })
      .addCase(addDish.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Update dish
      .addCase(updateDish.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.successMsg = action.payload.message;
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Verify Restaurant
      .addCase(verifyRestaurant.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(verifyRestaurant.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.restaurantList.push(action.payload.restaurant);
        state.unVerifiedRestaurants = state.unVerifiedRestaurants.filter(
          (item) => item._id !== action.payload.restaurant._id
        );
        state.successMsg = action.payload.message;
      })
      .addCase(verifyRestaurant.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      })

      // Refute Restaurant
      .addCase(refuteRestaurant.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(refuteRestaurant.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.unVerifiedRestaurants.push(action.payload.restaurant);
        state.restaurantList = state.restaurantList.filter(
          (item) => item._id !== action.payload.restaurant._id
        );
        state.successMsg = action.payload.message;
      })
      .addCase(refuteRestaurant.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      })

      // Get Restaurant Rating
      .addCase(getRestaurantRating.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(getRestaurantRating.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        console.log("Sdfsd", action.payload);
        state.rating = action.payload;
      })
      .addCase(getRestaurantRating.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      // Add Restaurant Rating
      .addCase(rateRestaurant.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(rateRestaurant.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
      })
      .addCase(rateRestaurant.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      });
  },
});

export const { reset, changeCategoryState, addSeats, setDishToUpdate } = restaurantSlice.actions;
export default restaurantSlice.reducer;
