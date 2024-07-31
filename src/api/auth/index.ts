import { getToken } from "@/helpers/tokens";
import { userType } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
  }),
  endpoints: (builder) => ({
    register: builder.mutation<
      { jwt: string; user: userType },
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
    login: builder.mutation<
      { jwt: string; user: userType },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        method: "POST",
        url: "/auth/local",
        body: {
          identifier: email,
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
