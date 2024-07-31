import { productType } from "@/types/product";
import { strapiPaginationType } from "@/types/strapi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      { data: productType[]; meta: strapiPaginationType },
      { page: number; pageSize?: number }
    >({
      query: ({ page = 1, pageSize = 10 }) =>
        `/products?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
