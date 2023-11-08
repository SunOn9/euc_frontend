import { User } from "@/generated/user/user";
import { createSlice } from "@reduxjs/toolkit";

type UsetState = {
  userInfo: User;
};

const initialState: UsetState = {
  userInfo: User.create(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
