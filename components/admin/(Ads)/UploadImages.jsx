"use client";

import AdsContext from "@/context/AdsContext";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import cl from "./UploadImages.module.css";
import MyButton from "../../UI/myButton/myButton";

const UploadImages = ({ id }) => {
    const { uploadAdsImages, error, loading, clearErrors } =
        useContext(AdsContext);

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [
                        ...oldArray,
                        reader.result,
                    ]);
                }
            };

            setImages((oldArray) => [...oldArray, file]);
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        images.forEach((image) => {
            formData.append("image", image);
        });

        uploadAdsImages(formData, id);
    };

    return (
        <div style={{ maxWidth: "480px" }} className={cl.wrap}>
            <form onSubmit={submitHandler}>
                <h2 className={cl.title}>Загрузка изображений товаров</h2>

                <div className={cl.input_cont}>
                    <div className={cl.input_wrap}>
                        <input
                            className={cl.input}
                            type='file'
                            id='formFile'
                            multiple
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className={cl.preview}>
                    {imagesPreview?.map((img) => (
                        <Image
                            src={img}
                            key={img}
                            alt='Preview'
                            className={cl.img}
                            width='50'
                            height='50'
                        />
                    ))}
                </div>
                <MyButton type='submit' disabled={loading ? true : false}>
                    {loading ? "Uploading..." : "Upload"}
                </MyButton>
            </form>
        </div>
    );
};

export default UploadImages;
