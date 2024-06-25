"use client";

import Image from "next/image";

import { useState } from "react";
import "./Gallery.css";
import MyModal from "@/components/UI/myButton/myModal";

export default function GallerySlider({ image }) {
    const [isOpenGallery, setIsOpenGallery] = useState(false);
    const toggleOpen = () => setIsOpenGallery(!isOpenGallery);

    return (
        <div className='app__gallery-images_card flex__center'>
            <Image
                onClick={toggleOpen}
                src={image.src}
                alt='gallery_image'
                width='602'
                height='894'
            />

            <MyModal isOpen={isOpenGallery} toggleOpen={toggleOpen}>
                <div className='card__image'>
                    <Image
                        sizes='(max-width: 768px) 30vw, (max-width: 1200px)  33vw'
                        fill
                        src={image.src}
                        alt='gallery_image'
                    />
                </div>
            </MyModal>
        </div>
    );
}
