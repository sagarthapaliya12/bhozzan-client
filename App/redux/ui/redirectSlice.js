import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  redirect: null,
}

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirect(state, action) {
      state.redirect = action.payload
    },
  },
})

export const redirectActions = redirectSlice.actions
export default redirectSlice.reducer