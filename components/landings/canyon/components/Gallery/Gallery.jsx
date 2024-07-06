"use client";

import React from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

import SubHeading from "../layout/subheading/SubHeading";
import { useRef } from "react";
import images from "../../constants/images";
import "./Gallery.css";
import GallerySlider from "./GallerySlider";

const Gallery = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;

        if (direction === "left") {
            current.scrollLeft -= 300;
        } else {
            current.scrollLeft += 300;
        }
    };

    return (
        <div className='app__gallery flex__center'>
            <div className='app__gallery-content'>
                <SubHeading title='Instagram' />
                <h2 className='headtext__cormorant'>Фото галерея</h2>
                <p
                    className='p__opensans'
                    style={{ color: "#AAAAAA", marginTop: "2rem" }}
                >
                    Погрузитесь в атмосферу нашего уникального ресторана через
                    нашу фотогалерею. Оцените наши фото и следите за нами в
                    Instagram, чтобы не упустить новые впечатления и
                    предложения!
                </p>
                <a
                    type='button'
                    className='custom__button'
                    href='https://www.instagram.com/kemerkesmebogazi?igsh=c295bWtuMnZnYnF2'
                    target='blank'
                >
                    Смотреть больше
                </a>
            </div>
            <div className='app__gallery-images'>
                <div className='app__gallery-images_container' ref={scrollRef}>
                    {[
                        images.gallery01,
                        images.gallery02,
                        images.gallery03,
                        images.gallery04,
                        images.gallery05,
                        images.gallery06,
                        images.gallery07,
                        images.gallery08,
                        images.gallery09,
                        images.gallery10,
                    ].map((image, index) => (
                        <GallerySlider
                            image={image}
                            key={`gallery_image-${index + 1}`}
                        />
                    ))}
                </div>
                <div className='app__gallery-images_arrows'>
                    <BsArrowLeftShort
                        className='gallery__arrow-icon'
                        onClick={() => scroll("left")}
                    />
                    <BsArrowRightShort
                        className='gallery__arrow-icon'
                        onClick={() => scroll("right")}
                    />
                </div>
            </div>
        </div>
    );
};

export default Gallery;
