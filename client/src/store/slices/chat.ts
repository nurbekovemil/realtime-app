import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatInitialState } from "../../models/IChat";
import { chatApi } from "../services/chat";
import { IMessage } from "../../models/IMessage";

const initialState: IChatInitialState = {
  currentChat: null,
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, { payload }) => {
      state.currentChat = payload;
    },
    addMessageCurrentChat: (state, { payload }) => {
      if (state.currentChat) {
        state.currentChat.messages = [...state.currentChat.messages, payload];
      }
    },
    addLastMessageChatList: (state, { payload }) => {
      state.chats = state.chats.map((chat) => {
        if (chat.id == payload.chatId) {
          return { ...chat, messages: [payload] };
        }
        return chat;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.createChat.matchFulfilled,
      (state, { payload }) => {
        state.currentChat = payload;
      }
    );
    builder.addMatcher(
      chatApi.endpoints.getUserChats.matchFulfilled,
      (state, { payload }) => {
        state.chats = payload;
      }
    );
    builder.addMatcher(
      chatApi.endpoints.getChatMessages.matchFulfilled,
      (state, { payload }) => {
        if (state.currentChat) {
          state.currentChat.messages = payload.messages;
        }
      }
    );
  },
});
export const { setCurrentChat, addMessageCurrentChat, addLastMessageChatList } =
  chatSlice.actions;
export default chatSlice.reducer;
