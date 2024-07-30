import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userStateType } from "./user.types";
import { userType } from "@/types/user";

const initialState: userStateType = {
  user: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
