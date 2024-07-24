"use client";

import React, { useContext } from "react";
import AdsContext from "@/context/AdsContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencil,
    faPlus,
    faImage,
} from "@fortawesome/free-solid-svg-icons";
import cl from "./AdsList.module.css";
import MyIconButton from "../../UI/myButton/myIconButton";
import MyButton from "../../UI/myButton/myButton";
import Link from "next/link";

const AdsList = ({ data }) => {
    const { deleteAds } = useContext(AdsContext);
    if (!deleteAds) {
        throw new Error(" components admin ads adslist ошибка контекста");
    }

    const router = useRouter();

    const deleteHandler = (id) => {
        deleteAds(id);
        toast.success("Реклама удалена");
        router.refresh();
    };
    return (
        <>
            <div className={cl.wrap}>
                <h1 className={cl.title}>
                    Количество рекламы {data?.adsCount}
                </h1>
                <table className={cl.table}>
                    <thead className={cl.table_head}>
                        <tr>
                            <th scope='col' className={cl.th}>
                                ID
                            </th>
                            <th scope='col' className={cl.th}>
                                Тип
                            </th>
                            <th scope='col' className={cl.th}>
                                Дата
                            </th>
                            <th scope='col' className={cl.th}>
                                Клиент
                            </th>
                            <th scope='col' className={cl.th}>
                                Продукт
                            </th>
                            <th scope='col' className={cl.th}>
                                Контакт
                            </th>
                            <th scope='col' className={cl.th}>
                                Тел
                            </th>
                            <th scope='col' className={cl.th}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.allAds?.map((ads) => (
                            <tr key={ads._id} className={cl.tr}>
                                <td className={cl.td}>
                                    {ads?._id.substring(0, 6)}
                                </td>
                                <td className={cl.td}>{ads?.type}</td>
                                <td className={cl.td}>
                                    {new Date(
                                        ads?.createdAt
                                    ).toLocaleDateString("ru", {
                                        // weekday: "",
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                    })}
                                </td>
                                <td className={cl.td}>{ads?.advertiser}</td>
                                <td className={cl.td}>{ads?.name}</td>
                                <td className={cl.td}>{ads?.contactName}</td>
                                <td className={cl.td}>{ads?.contactPhone}</td>
                                <td className={cl.td}>
                                    <div className={cl.btn_wrap}>
                                        <MyIconButton
                                            type='button'
                                            style={{ color: "green" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = `/me/admin/ads/${ads?._id}/upload_images`;
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faImage} />
                                        </MyIconButton>
                                        <MyIconButton
                                            type='button'
                                            style={{ color: "#d97706" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = `/me/admin/ads/${ads?._id}`;
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPencil} />
                                        </MyIconButton>
                                        <MyIconButton
                                            style={{ color: "red" }}
                                            onClick={() =>
                                                deleteHandler(ads?._id)
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
            <Link href='/me/admin/ads/new'>
                <MyButton>
                    <FontAwesomeIcon icon={faPlus} className={cl.icon} />{" "}
                    Добавить новую рекламу
                </MyButton>
            </Link>
        </>
    );
};

export default AdsList;
