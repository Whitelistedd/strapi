import styles from "./main.module.scss";
import { Product } from "@/components/ui/Product";
import { Button, Pagination } from "antd";
import { useGetProductsQuery } from "@/api/products";
import { useEffect, useState } from "react";
import {
  useAddProductToCartMutation,
  useGetCartProductsQuery,
} from "@/api/cart";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { getUser } from "@/stores/slices/auth";
import { Link } from "react-router-dom";

export const MainRoute = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { data, isLoading } = useGetProductsQuery({ page, pageSize });
  const {
    data: cartData,
    isLoading: cartLoading,
    refetch,
  } = useGetCartProductsQuery(null);
  const { user, loading } = useAppSelector((state) => state.auth);
  const [addProductToCart] = useAddProductToCartMutation();
  const cartProductIds = cartData?.products?.map((product) => product.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isLoading || loading || cartLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <section className={styles.container}>
        <Link to={"/cart"}>cart</Link>
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
                <Button
                  onClick={() => {
                    const newCartProductIds = cartProductIds.filter(
                      (cartProductId) => cartProductId !== id
                    );
                    addProductToCart({
                      userId: Number(user?.id),
                      productIds: [
                        ...(cartProductIds ? newCartProductIds : []),
                      ],
                    });
                    refetch();
                  }}
                >
                  Remove from cart
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    addProductToCart({
                      userId: Number(user?.id),
                      productIds: [
                        ...(cartProductIds ? cartProductIds : []),
                        id,
                      ],
                    });
                    refetch();
                  }}
                >
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
      </section>
    </main>
  );
};
