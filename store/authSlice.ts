import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  auth: boolean;
};

const initialState: AuthState = {
  auth: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
