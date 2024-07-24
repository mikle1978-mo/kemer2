import cl from "./caruselAds.module.css";
import Link from "next/link";
import Image from "next/image";

export default function CaruselAds(adsData) {
    let sortedAds = [];

    if (adsData && Array.isArray(adsData.ads)) {
        sortedAds = adsData.ads.sort(() => Math.random() - 0.5);
    }

    return (
        <div className={cl.main_container}>
            <div className={cl.window}>
                <div className={cl.all_pages_container}>
                    {sortedAds.map((child) => (
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
