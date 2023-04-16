import { chatApi } from "./services/chat";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import chatSlice from "./slices/chat";
import userSlice from "./slices/user";
import { authApi } from "./services/auth";
import { userApi } from "./services/user";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    auth: authSlice,
    chat: chatSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      chatApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
