import { getStrapiImg } from "@/helpers/getStrapiImg";
import styles from "./Product.module.scss";

interface Props {
  title: string;
  image: string;
  price: number;
}

export const Product = ({ title, image, price }: Props) => {
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
    </div>
  );
};
