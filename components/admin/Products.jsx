"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import CustomPagination from "../layouts/CustomPagination";
import ProductContext from "@/context/ProductContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faImage } from "@fortawesome/free-solid-svg-icons";
import { mark } from "@/lib/const/const";
import cl from "./Products.module.css";

const Products = ({ data }) => {
    const { deleteProduct, error, clearErrors } = useContext(ProductContext);
    const router = useRouter();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const deleteHandler = (id) => {
        deleteProduct(id);
        router.refresh();
        toast.success("Продукт удален");
    };
    return (
        <div className={cl.products}>
            <h1 className={cl.title}>{data?.productsCount} Продуктов</h1>
            <table className={cl.table}>
                <thead className={cl.table_head}>
                    <tr>
                        <th scope='col' className={cl.head_item}>
                            Название
                        </th>
                        <th scope='col' className={cl.head_item}>
                            Скл
                        </th>
                        <th scope='col' className={cl.head_item}>
                            ₽
                        </th>
                        <th scope='col' className={cl.head_item}>
                            Кат
                        </th>
                        <th scope='col' className={cl.head_item}>
                            Дей
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products?.map((product) => (
                        <tr key={product._id} className={cl.table_row}>
                            <td className={cl.item}>{product?.name}</td>
                            <td className={cl.item}>{product?.stock}</td>
                            <td className={cl.item}>
                                {mark}
                                {product?.price}
                            </td>
                            <td className={cl.item}>{product?.category}</td>
                            <td className={cl.item}>
                                <div className={cl.btn_wrap}>
                                    <Link
                                        href={`/admin/products/${product?._id}/upload_images`}
                                        className={cl.btn_img}
                                        style={{ color: "green" }}
                                    >
                                        <FontAwesomeIcon icon={faImage} />
                                    </Link>

                                    <Link
                                        href={`/admin/products/${product?._id}`}
                                        className={cl.btn_img}
                                        style={{ color: "orange" }}
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </Link>
                                    <a
                                        className={cl.btn_img}
                                        style={{ color: "red" }}
                                        onClick={() =>
                                            deleteHandler(product?._id)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
