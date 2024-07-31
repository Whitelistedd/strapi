import { Product } from "@/components/ui/Product";
import styles from "./cart.module.scss";
import { Button } from "antd";
import {
  useGetCartProductsQuery,
  useUpdateCartProductsMutation,
} from "@/api/cart";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUserQuery } from "@/api/auth";
import { MainLayout } from "@/components/layouts/main-layout";

export const CartRoute = () => {
  const {
    data,
    isLoading: cartProductsLoading,
    refetch,
  } = useGetCartProductsQuery(null);
  const { data: userData, isLoading: userLoading } = useFetchUserQuery(null);
  const [updateCartProducts] = useUpdateCartProductsMutation();
  const navigate = useNavigate();
  const cartProductIds = data?.products?.map((product) => product.id);

  const handleRemoveProductFromCart = (productId: number) => {
    if (!userData?.id) navigate("/login");
    if (!cartProductIds) return;
    const newCartProductIds = cartProductIds?.filter(
      (cartProductId) => cartProductId !== productId
    );
    updateCartProducts({
      userId: Number(userData?.id),
      productIds: newCartProductIds,
    });
    refetch();
  };

  if (userLoading || cartProductsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <Link to={"/"}>main page</Link>
      <h1>Cart Products</h1>
      <div className={styles.products}>
        {data?.products?.map(({ id, image, price, title }) => (
          <div key={id}>
            <Product image={image.url} price={price} title={title} />
            <Button onClick={() => handleRemoveProductFromCart(id)}>
              Remove to cart
            </Button>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
