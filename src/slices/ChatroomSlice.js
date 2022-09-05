import { createSlice } from "@reduxjs/toolkit";

const chatroomSlice = createSlice({
  name: "chatroom",
  initialState: {
    chatrooms: [],
  },
  reducers: {
    addChatroom: (state, action) => {
      console.log(action.payload);
      state.chatrooms = action.payload.slice();
    },
  },
});
export const { addChatroom } = chatroomSlice.actions;
export default chatroomSlice.reducer;
