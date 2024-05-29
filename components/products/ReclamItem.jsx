import { useContext } from "react";
import Link from "next/link";
import CartContext from "@/context/CartContext";
import dynamic from "next/dynamic";
import cl from "./ReclamItem.module.css";

const ReclamItem = ({ product }) => {
    console.log("!!!!!!!!!!!!!", product);
    return (
        <article className={cl.card}>
            <Link href={product.link} className={cl.card__top}>
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

                <div className={cl.card__label}>{product?.discount}Реклама</div>
            </Link>
            <div className={cl.card__bottom}>
                <span className={cl.card__titleName}>{product.title}</span>
                <span className={cl.card__subtitle}>{product.subtitle}</span>
                <span className={cl.card__titleSeller}>
                    {product.site}
                    {" >"}
                </span>
            </div>
        </article>
    );
};

export default ReclamItem;
