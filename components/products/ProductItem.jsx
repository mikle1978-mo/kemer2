import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import { mark } from "@/lib/const/const";
import dynamic from 'next/dynamic';
import cl from "./ProductItem.module.css"

const ProductItem = ({ product }) => {
  const StarRatings = dynamic(() => import('react-star-ratings'), { ssr: false });
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      seller: product.seller,
    });
  };

  return (
    <article>
      <div className={cl.card}>
        <div className={cl.card__top}>
          <div className={cl.card__image}>
            <img
              src={
                product?.images[0]
                  ? product?.images[0].url
                  : "/images/default_product.png"
              }
              alt={product?.name}
            // height="240"
            // width="240"
            />
          </div>
          {/* -- Скидка на товар -- */}
          <div class={cl.card__label}>-10%</div>
        </div>
        <div className={cl.card__bottom}>
          <div className={cl.card__prices}>
            <span className={cl.card__priceDiscount}>
              {mark}{product?.price.toFixed(2)}
            </span>
            <span className={cl.card__priceCommon}>
              {mark}{product?.price.toFixed(2)}
            </span>
          </div>
        </div>
        <h2 className={cl.card__titleBox}>
          <Link
            href={`/product/${product._id}`}
            className="hover:text-blue-600"
          >
            <span className={cl.card__titleSeller}>{product.seller}</span>/
            <span className={cl.card__titleName}>{product.name}</span>
          </Link>

          <div className="flex flex-wrap items-center space-x-2 mb-2">
            <div className="ratings">
              <div className="my-1">
                <StarRatings
                  rating={product?.ratings}
                  starRatedColor="#ffb829"
                  numberOfStars={1}
                  starDimension="18px"
                  starSpacing="1px"
                  name={`rating-${product?._id}`}
                />
              </div>
            </div>
            <b className="text-gray-300">•</b>
            <span className="ml-0.5 text-yellow-500">{product?.ratings}</span>
          </div>
          {/* <p className="text-gray-500 mb-2">
              {product?.description.substring(0, 150)}...
            </p> */}
        </h2>
        <div className={cl.card__add}>
          <a
            onClick={addToCartHandler}
          >
            В Корзину
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
