import cl from "./myCarusel.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default async function Carusel() {
    const response = await axios.get(`${process.env.API_URL}/api/ads`);
    const data = response.data.allAds;
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
                            <Image
                                src={
                                    child?.images[0]
                                        ? child?.images[0].url
                                        : "/images/default_product.png"
                                }
                                alt={child.name}
                                width={854}
                                height={480}
                                priority
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
