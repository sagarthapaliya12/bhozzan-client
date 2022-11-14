import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusStateEnum from "../../enums/statusEnum";
import restaurantService from "./restaurantAPI";

const initialState = {
  restaurantUser: {},
  restaurantUserId: null,
  restaurantList: [],
  search: null, //move this to  customer
  // restaurant: {},
  orderStatusState: null,
  dishes: [],
  allDishes: [],
  categoryState: null,
  categoryDish: [],
  noOfSeats: 0,
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

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    reset: () => initialState,
    // setSearch: (state, action) => {
    //   state.search = action.payload;
    // },
    changeCategoryState: (state, action) => {
      state.categoryState = action.payload;
    },
    changeOrderStatusState: (state, action) => {
      state.orderStatusState = action.payload;
    },
    addSeats: (state, action) => {
      state.noOfSeats = action.payload;
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
        state.restaurantUser = action.payload.restaurant;
      })
      .addCase(getRestaurantDetails.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Get Restaurant Id
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
        state.dishes = action.payload.result;
      })
      .addCase(getDishesByRestaurantId.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      })

      //Get Dishes By Category
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

      //Add dish
      .addCase(addDish.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        // state.categoryDish = action.payload.dishes;////////////incomplete
        state.successMsg = action.payload.message;
      })
      .addCase(addDish.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.errorMsg;
      });
  },
});

export const { reset, changeCategoryState, changeOrderStatusState, addSeats } = restaurantSlice.actions;
export default restaurantSlice.reducer;
