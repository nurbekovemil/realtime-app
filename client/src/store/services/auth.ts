import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IRegistrationRequest,
  IAuthResponse,
  ILoginRequest,
} from "../../models/IAuth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8088/auth" }),
  endpoints: (builder) => ({
    registration: builder.mutation<IAuthResponse, IRegistrationRequest>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<IAuthResponse, ILoginRequest>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authApi;
