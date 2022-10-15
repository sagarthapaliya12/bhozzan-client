import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authAPI";
import StatusStateEnum from "../../enums/statusEnum";

export const UserRoleEnum = {
  CUSTOMER: "customer",
  MANAGER: "manager",
  ADMIN: "admin",
};

// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // user: user ? user : null,
  user: null,
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const loginUser = createAsyncThunk("user/login", async (credentials) =>
  authService.loginUser(credentials)
);

export const registerUser = createAsyncThunk("user/register", async (credentials) =>
  authService.registerUser(credentials)
);

export const registerRestaurant = createAsyncThunk("user/register", async (credentials) =>
  authService.registerRestaurant(credentials)
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    logout: (state, _action) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //LOGIN USER
      .addCase(loginUser.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      })

      //REGISTER USER
      .addCase(registerUser.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.successMsg = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      })

      //REGISTER RESTAURANT
      .addCase(registerRestaurant.pending, (state, _action) => {
        state.status = StatusStateEnum.LOADING;
      })
      .addCase(registerRestaurant.fulfilled, (state, action) => {
        state.status = StatusStateEnum.SUCCESS;
        state.successMsg = action.payload;
      })
      .addCase(registerRestaurant.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
