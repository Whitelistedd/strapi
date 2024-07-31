import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userStateType } from "./auth.types";
import { userType } from "@/types/user";
import { AppDispatch } from "@/stores/store";
import { authApi } from "@/api/auth";
import { LoginFieldType } from "@/features/auth/login-form/login-form.types";
import { setToken } from "@/helpers/tokens";
import { RegisterFieldType } from "@/features/auth/register-form/register-form.types";

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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;

export const loginUser =
  ({ email, password }: LoginFieldType) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await authApi.login(email, password);
      setToken(res.data.jwt);
      dispatch(setUser(res.data.user));
    } catch (err) {
      console.error(err);
      dispatch(setLoading(false));
      throw new Error();
    }
    dispatch(setLoading(false));
  };

export const registerUser =
  ({ username, email, password }: RegisterFieldType) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await authApi.register(username, email, password);
      setToken(res.data.jwt);
      dispatch(setUser(res.data.user));
    } catch (err) {
      console.error(err);
      dispatch(setLoading(false));
      throw new Error();
    }
    dispatch(setLoading(false));
  };

export const getUser = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await authApi.fetchUser();
    dispatch(setUser(res.data));
  } catch (err) {
    console.error(err);
    dispatch(setLoading(false));
    throw new Error();
  }
  dispatch(setLoading(false));
};

export default authSlice.reducer;
