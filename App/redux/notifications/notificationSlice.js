import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: { unviewed: [], viewed: [] },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    reset: () => initialState,
    setUniewedNotifications: (state, action) => state.notifications.unviewed.push(action.payload),
    setViewedNotifications: (state, action) => state.notifications.viewed.push(action.payload),
  },
});

export const { reset, setUniewedNotifications, setViewedNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
