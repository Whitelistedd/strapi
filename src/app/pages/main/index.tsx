import styles from "./main.module.scss";
import { Product } from "@/features/product";
import { Pagination } from "antd";
import { useGetProductsQuery } from "@/api/products";
import { useState } from "react";
import { useGetCartProductsQuery } from "@/api/cart";
import { useFetchUserQuery } from "@/api/auth";
import { MainLayout } from "@/components/layouts/main-layout";

export const MainRoute = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data, isLoading } = useGetProductsQuery({ page, pageSize });
  const { isLoading: cartLoading } = useGetCartProductsQuery(null);
  const { isLoading: userLoading } = useFetchUserQuery(null);

  if (isLoading || userLoading || cartLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <h1>Products</h1>
      <div className={styles.products}>
        {data?.data?.map(({ id, attributes: { image, price, title } }) => (
          <Product
            key={id}
            id={id}
            image={image.data.attributes.url}
            price={price}
            title={title}
          />
        ))}
      </div>
      <Pagination
        onChange={(page) => setPage(page)}
        pageSize={pageSize}
        defaultCurrent={1}
        current={page}
        total={data?.meta.pagination.total}
      />
    </MainLayout>
  );
};
