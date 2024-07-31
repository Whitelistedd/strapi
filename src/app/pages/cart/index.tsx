import { Product } from "@/features/product";
import styles from "./cart.module.scss";
import { useGetCartProductsQuery } from "@/api/cart";
import { useFetchUserQuery } from "@/api/auth";
import { MainLayout } from "@/components/layouts/main-layout";

export const CartRoute = () => {
  const { data, isLoading: cartProductsLoading } =
    useGetCartProductsQuery(null);
  const { isLoading: userLoading } = useFetchUserQuery(null);

  if (userLoading || cartProductsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <h1>Cart Products</h1>
      <div className={styles.products}>
        {data?.products?.map(({ id, image, price, title }) => (
          <Product
            key={id}
            id={id}
            image={image.url}
            price={price}
            title={title}
          />
        ))}
      </div>
    </MainLayout>
  );
};
