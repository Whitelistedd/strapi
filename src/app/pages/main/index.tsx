import styles from "./main.module.scss";
import { Product } from "@/components/ui/Product";
import { Button, Pagination } from "antd";
import { useGetProductsQuery } from "@/api/products";
import { useState } from "react";
import {
  useUpdateCartProductsMutation,
  useGetCartProductsQuery,
} from "@/api/cart";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUserQuery } from "@/api/auth";
import { MainLayout } from "@/components/layouts/main-layout";

export const MainRoute = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data, isLoading } = useGetProductsQuery({ page, pageSize });
  const {
    data: cartData,
    isLoading: cartLoading,
    refetch,
  } = useGetCartProductsQuery(null);
  const { data: userData, isLoading: userLoading } = useFetchUserQuery(null);
  const [updateCartProducts] = useUpdateCartProductsMutation();
  const navigate = useNavigate();
  const cartProductIds = cartData?.products?.map((product) => product.id);

  const handleAddProductToCart = (productId: number) => {
    if (!userData?.id) navigate("/login");
    updateCartProducts({
      userId: Number(userData?.id),
      productIds: [...(cartProductIds ? cartProductIds : []), productId],
    });
    refetch();
  };

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

  if (isLoading || userLoading || cartLoading) {
    return <p>Loading...</p>;
  }

  return (
    <MainLayout>
      <Link to={"/cart"}>cart page</Link>
      <h1>Products</h1>
      <div className={styles.products}>
        {data?.data?.map(({ id, attributes: { image, price, title } }) => (
          <div>
            <Product
              key={id}
              image={image.data.attributes.url}
              price={price}
              title={title}
            />
            {cartProductIds?.includes(id) ? (
              <Button onClick={() => handleRemoveProductFromCart(id)}>
                Remove from cart
              </Button>
            ) : (
              <Button onClick={() => handleAddProductToCart(id)}>
                Add to cart
              </Button>
            )}
          </div>
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
