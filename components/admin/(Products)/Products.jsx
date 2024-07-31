"use client";

import { useContext, useEffect, useState } from "react";
import ProductContext from "@/context/ProductContext";
import CategoryContext from "@/context/CategoryContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencil,
    faImage,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { mark } from "@/lib/const/const";
import cl from "./Products.module.css";
import MyIconButton from "../../UI/myButton/myIconButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCategoryName, formatDate } from "@/helpers/helpers";
import BackButton from "@/components/UI/myButton/backButton";

const Products = ({
    data = { products: [], filteredProductsCount: 0, ProductsCount: 0 },
}) => {
    const { deleteProduct, error, clearErrors } = useContext(ProductContext);
    const { categories } = useContext(CategoryContext);
    const [sortConfig, setSortConfig] = useState({
        key: "createdAt",
        direction: "desc",
    });
    const router = useRouter();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const deleteHandler = (id) => {
        if (confirm("Удалить продукт?")) {
            deleteProduct(id);
            toast.success("Продукт удален");
        }
    };

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedProducts = Array.isArray(data?.products)
        ? [...data.products].sort((a, b) => {
              if (typeof a[sortConfig.key] === "number") {
                  return sortConfig.direction === "asc"
                      ? a[sortConfig.key] - b[sortConfig.key]
                      : b[sortConfig.key] - a[sortConfig.key];
              }
              if (sortConfig.key === "createdAt") {
                  const dateA = new Date(a[sortConfig.key]);
                  const dateB = new Date(b[sortConfig.key]);
                  return sortConfig.direction === "asc"
                      ? dateA - dateB
                      : dateB - dateA;
              }
              return (
                  (a[sortConfig.key] || "").localeCompare(
                      b[sortConfig.key] || "",
                      "ru",
                      {
                          sensitivity: "base",
                      }
                  ) * (sortConfig.direction === "asc" ? 1 : -1)
              );
          })
        : [];

    return (
        <div className={cl.products}>
            <div className={cl.top_row}>
                <BackButton />
                <h2 className='title'>
                    {" "}
                    Всего наименований: {data?.products.length} шт.
                </h2>

                <button
                    type='button'
                    className={cl.newProduct_button}
                    onClick={(e) => {
                        e.preventDefault();
                        router.push(`/me/admin/products/new`);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            <table className={cl.table}>
                <thead className={cl.table_head}>
                    <tr>
                        <th scope='col' className={cl.head_item}>
                            Рис
                        </th>
                        <th scope='col' className={cl.head_item}>
                            (шт)
                        </th>
                        <th
                            scope='col'
                            className={cl.head_item}
                            onClick={() => requestSort("name")}
                        >
                            Название{" "}
                            {sortConfig.key === "name" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            scope='col'
                            className={cl.head_item}
                            onClick={() => requestSort("brand")}
                        >
                            Марка{" "}
                            {sortConfig.key === "brand" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            scope='col'
                            className={cl.head_item}
                            onClick={() => requestSort("stock")}
                        >
                            Скл{" "}
                            {sortConfig.key === "stock" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            scope='col'
                            className={cl.head_item}
                            onClick={() => requestSort("price")}
                        >
                            ₽{" "}
                            {sortConfig.key === "price" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            scope='col'
                            className={cl.head_item}
                            onClick={() => requestSort("categoryId")}
                        >
                            Кат{" "}
                            {sortConfig.key === "categoryId" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            scope='col'
                            className={cl.head_item}
                            onClick={() => requestSort("createdAt")}
                        >
                            дата{" "}
                            {sortConfig.key === "createdAt" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            scope='col'
                            className={cl.head_item}
                            onClick={() => requestSort("sellerId")}
                        >
                            SellerID{" "}
                            {sortConfig.key === "sellerId" &&
                                (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th scope='col' className={cl.head_item}>
                            Дей
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((product) => (
                        <tr key={product._id} className={cl.table_row}>
                            <td className={cl.item}>
                                <Image
                                    src={
                                        product?.images[0]
                                            ? product?.images[0].url
                                            : "/images/default_product.png"
                                    }
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
                            <td className={cl.item}>
                                {" "}
                                {getCategoryName(
                                    product?.categoryId,
                                    categories
                                )}
                            </td>
                            <td className={cl.item}>
                                {formatDate(product?.createdAt)}
                            </td>
                            <td className={cl.item}>
                                {product?.sellerId.slice(0, 6)}
                            </td>
                            <td className={cl.item}>
                                <div className={cl.btn_wrap}>
                                    <MyIconButton
                                        type='button'
                                        style={{ color: "green" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.push(
                                                `/me/admin/products/${product?._id}/upload_images`
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faImage} />
                                    </MyIconButton>
                                    <MyIconButton
                                        type='button'
                                        style={{ color: "orange" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log("click!!!");
                                            router.push(
                                                `/me/admin/products/${product?._id}`
                                            );
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
