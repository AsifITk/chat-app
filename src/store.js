import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import chatroomReducer from "./slices/ChatroomSlice.js";
const store = configureStore({
  reducer: {
    loginInfo: loginReducer,
    chatRooms: chatroomReducer,
  },
});
export default store;
