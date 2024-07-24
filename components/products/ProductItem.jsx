import { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import { mark } from "@/lib/const/const";
import cl from "./ProductItem.module.css";
import MyButton from "../UI/myButton/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";

const ProductItem = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    if (!addItemToCart) {
        throw new Error(" me page sidebar page ошибка контекста");
    }
    useEffect(() => {
        const savedPosition = sessionStorage.getItem("scrollPosition");
        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition));
            sessionStorage.removeItem("scrollPosition");
        }
    }, []);

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
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    const handleButtonClick = () => {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    return (
        <article className={cl.card}>
            <Link
                href={`/catalog/${product._id}`}
                className={cl.card__top}
                onClick={handleButtonClick}
            >
                <div className={cl.card__image} ref={ref}>
                    {inView ? (
                        <Image
                            src={
                                product?.images[0]
                                    ? product?.images[0].url
                                    : "/images/default_product.png"
                            }
                            alt={product?.name}
                            sizes='(max-width: 768px) 30vw, (max-width: 1200px)  33vw'
                            fill
                            // height="240"
                            // width="240"
                        />
                    ) : (
                        <div></div>
                    )}
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

                                {product?.price?.toFixed(2)}
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
                            {product?.price?.toFixed(2)}
                        </span>
                    )}
                </div>

                <h2 className={cl.card__titleBox}>
                    <span className={cl.card__titleName}>{product.name}</span>
                </h2>

                <div className={cl.card__rating}>
                    <div className={cl.card__ratingStar}>
                        &#9733;{/*  звездочка */}
                        <span>{product?.ratings}</span>
                    </div>
                    <span className={cl.card__titleSeller}>
                        {product.brand}
                    </span>
                </div>
            </div>

            <MyButton
                name='cart'
                className={cl.card__add}
                onClick={addToCartHandler}
            >
                <FontAwesomeIcon icon={faCartShopping} />
            </MyButton>
        </article>
    );
};

export default ProductItem;
