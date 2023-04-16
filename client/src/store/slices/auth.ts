import { PayloadAction } from "@reduxjs/toolkit/src/createAction";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { IAuthInitialState, IAuthResponse } from "../../models/IAuth";
import { IUser } from "../../models/IUser";

const initialState: IAuthInitialState = {
  isAuthenticated: false,
  user: null,
};

const setUserData = (
  state: IAuthInitialState,
  { payload }: PayloadAction<IAuthResponse>
) => {
  state.isAuthenticated = true;
  state.user = payload.user;
  localStorage.setItem("token", payload.token.access);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.registration.matchFulfilled,
      setUserData
    );
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, setUserData);
  },
});

export default authSlice.reducer;
