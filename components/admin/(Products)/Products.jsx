"use client";

import { useContext, useEffect } from "react";

import ProductContext from "@/context/ProductContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faImage } from "@fortawesome/free-solid-svg-icons";
import { mark } from "@/lib/const/const";
import cl from "./Products.module.css";
import MyIconButton from "../../UI/myButton/myIconButton";
import Image from "next/image";

const Products = ({ data }) => {
    const { deleteProduct, error, clearErrors } = useContext(ProductContext);
    const router = useRouter();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    useEffect(() => {
        router.refresh();
    }, [data]);

    const deleteHandler = (id) => {
        if (confirm("Удалить продукт?")) {
            deleteProduct(id);
            toast.success("Продукт удален");
        }
    };
    return (
        <div className={cl.products}>
            <h1 className='title'>{data?.productsCount} Продуктов</h1>
            <table className={cl.table}>
                <thead className={cl.table_head}>
                    <tr>
                        <th scope='col' className={cl.head_item}>
                            Рис
                        </th>
                        <th scope='col' className={cl.head_item}>
                            (шт)
                        </th>
                        <th scope='col' className={cl.head_item}>
                            Название
                        </th>
                        <th scope='col' className={cl.head_item}>
                            Марка
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
                            <td className={cl.item}>
                                <Image
                                    src={product?.images[0]?.url}
                                    alt='иконка'
                                    width={20}
                                    height={20}
                                    className={cl.imgIcon}
                                />
                            </td>
                            <td className={cl.item}>
                                {product?.images.length}
                            </td>
                            <td className={cl.item}>{product?.name}</td>
                            <td className={cl.item}>{product?.brand}</td>
                            <td className={cl.item}>{product?.stock}</td>
                            <td className={cl.item}>
                                {mark}
                                {product?.price}
                            </td>
                            <td className={cl.item}>{product?.category}</td>
                            <td className={cl.item}>
                                <div className={cl.btn_wrap}>
                                    <MyIconButton
                                        type='button'
                                        style={{ color: "green" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/admin/products/${product?._id}/upload_images`;
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faImage} />
                                    </MyIconButton>
                                    <MyIconButton
                                        type='button'
                                        style={{ color: "orange" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/admin/products/${product?._id}`;
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </MyIconButton>
                                    <MyIconButton
                                        type='button'
                                        style={{ color: "red" }}
                                        onClick={() =>
                                            deleteHandler(product?._id)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </MyIconButton>
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
