import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
  session_id: ""
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.session_id = localStorage.getItem('session_id')
    }
  }
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
