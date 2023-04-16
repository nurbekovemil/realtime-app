import { IUserInitialState } from "./../../models/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../services/user";

const initialState: IUserInitialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.searchUsers.matchFulfilled,
      (state, { payload }) => {
        state.users = payload;
      }
    );
  },
});
export default userSlice.reducer;
