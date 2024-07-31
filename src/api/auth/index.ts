import { getToken } from "@/helpers/tokens";
import { userType } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    headers: { Authorization: `Bearer ${getToken()}` },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<
      userType,
      { username: string; email: string; password: string }
    >({
      query: ({ email, password, username }) => ({
        method: "POST",
        url: "/auth/local/register",
        body: {
          email,
          password,
          username,
        },
      }),
    }),
    login: builder.mutation<userType, { email: string; password: string }>({
      query: ({ email, password }) => ({
        method: "POST",
        url: "/auth/local/login",
        body: {
          email,
          password,
        },
      }),
    }),
    fetchUser: builder.query<userType, null>({
      query: () => "/users/me",
    }),
  }),
});

export const { useFetchUserQuery, useLoginMutation, useRegisterMutation } =
  authApi;
