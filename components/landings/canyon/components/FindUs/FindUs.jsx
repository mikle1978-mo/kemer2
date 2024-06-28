import React from "react";

import SubHeading from "../layout/subheading/SubHeading";
import images from "../../constants/images";

const FindUs = () => (
    <div className='app__bg app__wrapper section__padding' id='contact'>
        <div className='app__wrapper_info'>
            <SubHeading title='Контакты' />
            <h1
                className='headtext__cormorant'
                style={{ marginBottom: "1rem" }}
            >
                Найти нас
            </h1>
            <div className='app__wrapper-content'>
                <p className='p__opensans'>Kuzdere, 07982 Kemer/Antalya</p>
                <p
                    className='p__cormorant'
                    style={{ color: "#DCCA87", margin: "2rem 0" }}
                >
                    Мы открыты
                </p>
                <p className='p__opensans'>Пн - Пт: 10:00 - 01:00 </p>
                <p className='p__opensans'>Сб - Вс: 10:00 - 02:00 </p>
            </div>
            <a></a>
            <a
                href='tel:+905322347560'
                target='_blank'
                type='button'
                className='custom__button'
                style={{ marginTop: "2rem" }}
            >
                Посетите нас
            </a>
        </div>

        <a
            href='https://maps.app.goo.gl/ZxngLKwFCSq7Kum78'
            className='app__wrapper_img'
        >
            <img src={images.findus.src} alt='findus_img' />
        </a>
    </div>
);

export default FindUs;
