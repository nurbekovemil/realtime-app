import { IMessage } from "./../../models/IMessage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8088/chat",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || "";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Chats"],
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chats"],
    }),
    getUserChats: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Chats"],
    }),
    getChatMessages: builder.query({
      query: (chatId) => `/${chatId}`,
    }),
  }),
});

export const {
  useCreateChatMutation,
  useLazyGetUserChatsQuery,
  useLazyGetChatMessagesQuery,
} = chatApi;
