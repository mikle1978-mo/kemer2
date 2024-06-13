import cl from "./CartFooter.module.css";
import { cartFooterMenu } from "@/lib/cartFooterMenu/cartFooterMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function CartFooter() {
    return (
        <>
            <div className={cl.cartFooter}>
                {/* <h3 className='title'>Категория</h3> */}
                <ul className={cl.list}>
                    {cartFooterMenu.map((item) => (
                        <li key={item.id} className={cl.li}>
                            <Link href={item.link} className={cl.list_item}>
                                <span className='ml-2 text-gray-500'>
                                    {" "}
                                    {item.item}
                                </span>
                                <span className='ml-2 text-gray-500'>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
