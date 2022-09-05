import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "userInfo",
  initialState: {
    user: {},
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      localStorage.setItem("currentUser", JSON.stringify(action.payload))
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      console.log("logout");
      state.user = {};
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
