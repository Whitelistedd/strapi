import { getToken } from "@/helpers/tokens";
import { userType } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    headers: { Authorization: `Bearer ${getToken()}` },
  }),
  endpoints: (builder) => ({
    getCartProducts: builder.query<userType, null>({
      query: () => `/users/me?populate[products][populate][0]=image`,
    }),
    updateCartProducts: builder.mutation<
      boolean,
      { userId: number; productIds: number[] }
    >({
      query: ({ userId, productIds }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: {
          products: productIds,
        },
      }),
    }),
  }),
});

export const { useGetCartProductsQuery, useUpdateCartProductsMutation } =
  cartApi;
