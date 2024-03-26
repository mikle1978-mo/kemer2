import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import { mark } from "@/lib/const/const";
import dynamic from "next/dynamic";
import cl from "./ProductItem.module.css";
import MyButton from "../UI/myButton/myButton";

const ProductItem = ({ product }) => {
    const StarRatings = dynamic(() => import("react-star-ratings"), {
        ssr: false,
    });
    const { addItemToCart } = useContext(CartContext);

    const addToCartHandler = () => {
        addItemToCart({
            product: product._id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            image: product.images[0].url,
            stock: product.stock,
            seller: product.seller,
        });
    };

    return (
        <article className={cl.card}>
            <Link href={`/product/${product._id}`} className={cl.card__top}>
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
                {product?.discount ? (
                    <div className={cl.card__label}>-{product?.discount}%</div>
                ) : (
                    <div> </div>
                )}
            </Link>
            <div className={cl.card__bottom}>
                <div className={cl.card__prices}>
                    {product?.discount ? (
                        <>
                            <span className={cl.card__priceDiscount}>
                                {mark}
                                {product?.price.toFixed(2)}
                            </span>
                            <span className={cl.card__priceCommon}>
                                {mark}
                                {(
                                    (product?.price * 100) /
                                    (100 - product?.discount)
                                ).toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span className={cl.card__priceDiscount}>
                            {mark}
                            {product?.price.toFixed(2)}
                        </span>
                    )}
                </div>

                <h2 className={cl.card__titleBox}>
                    <span className={cl.card__titleSeller}>
                        {product.seller}
                    </span>
                    /<span className={cl.card__titleName}>{product.name}</span>
                </h2>

                <div className={cl.card__rating}>
                    <div className={cl.card__ratingStar}>
                        &#9733;{/*  звездочка */}
                        <span>{product?.ratings}</span>
                    </div>
                    <span className={cl.card__ratingStock}>
                        на складе: {product?.stock} шт.
                    </span>
                </div>
            </div>

            <MyButton className={cl.card__add} onClick={addToCartHandler}>
                В Корзину
            </MyButton>
        </article>
    );
};

export default ProductItem;
