import cl from "./myCarusel.module.css";
import Link from "next/link";

export default function Carusel({ data }) {
    const sortedArray = data.sort(() => Math.random() - 0.5);
    return (
        <div className={cl.main_container}>
            <div className={cl.window}>
                <div className={cl.all_pages_container}>
                    {sortedArray.map((child) => (
                        <Link
                            key={child._id}
                            href={child.siteUrl}
                            className={cl.item}
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            <img
                                src={
                                    child?.images[0]
                                        ? child?.images[0].url
                                        : "/images/default_product.png"
                                }
                                alt={child.name}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
