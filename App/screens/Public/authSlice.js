import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authAPI";
import StatusStateEnum from "../../enums/statusEnum";

export const UserRoleEnum = {
  CUSTOMER: "customer",
  MANAGER: "manager",
  ADMIN: "admin",
};

// const user = JSON.parse(localStorage.getItem("user"));
const user = { id: "6019e133h3e3sj72837283", name: "Jack Blah Blah Blah", role: "customer" };

const initialState = {
  user: user ? user : null,
  status: StatusStateEnum.IDLE,
  errorMsg: null,
  successMsg: null,
};

export const loginUser = createAsyncThunk("user/login", async ({ username, password }) =>
  authService.login(username, password)
);

export const logoutUser = createAsyncThunk("user/logout", async (_, { dispatch }) =>
  authService.logout(dispatch)
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.status = StatusStateEnum.SUCCESS;
        state.successMsg = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = StatusStateEnum.FAILED;
        state.errorMsg = action.error.message;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
