import { getStrapiImg } from "@/helpers/getStrapiImg";
import styles from "./Product.module.scss";
import {
  useGetCartProductsQuery,
  useUpdateCartProductsMutation,
} from "@/api/cart";
import { useFetchUserQuery } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

interface Props {
  title: string;
  image: string;
  price: number;
  id: number;
}

export const Product = ({ id, title, image, price }: Props) => {
  const { data: cartData, refetch } = useGetCartProductsQuery(null);
  const { data: userData } = useFetchUserQuery(null);
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

  return (
    <div className={styles.product}>
      <img
        className={styles.image}
        width={200}
        height={200}
        src={getStrapiImg(image)}
        alt={`${title} image`}
      />
      <h2>{title}</h2>
      <p>${price}</p>
      {cartProductIds?.includes(id) ? (
        <Button onClick={() => handleRemoveProductFromCart(id)}>
          Remove from cart
        </Button>
      ) : (
        <Button onClick={() => handleAddProductToCart(id)}>Add to cart</Button>
      )}
    </div>
  );
};
