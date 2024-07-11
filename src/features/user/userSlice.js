import { createSlice, isPending } from "@reduxjs/toolkit";

const defaultState = {
  user: null,
  authReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    isAuthReady: (state, { payload }) => {
      state.authReady = payload;
    },
  },
});

export const { login, isAuthReady } = userSlice.actions;
export default userSlice.reducer;
