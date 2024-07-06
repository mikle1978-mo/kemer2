import React from "react";

import images from "../../../canyon/constants/images";
import SubHeading from "../layout/subheading/SubHeading";
import "./Header.css";

export default function Header() {
    return (
        <div className='app__header app__wrapper section__padding' id='home'>
            <div className='app__wrapper_info'>
                <SubHeading title='Ищите новый вкус' />
                <h2 className='app__header-h1'>Гармония вкус Природа</h2>
                <p className='p__opensans' style={{ margin: "1rem 0" }}>
                    Добро пожаловать в ресторан "Каньон", где каждое блюдо — это
                    путешествие во времени и вкуса. Расположенный у подножия
                    величественного Римского моста Кесме, наш ресторан
                    предлагает уникальное сочетание изысканной кухни и
                    потрясающего видового водопада.
                </p>
                <a href='#menu' type='button' className='custom__button'>
                    Изучить меню
                </a>
            </div>

            <div className='app__wrapper_img'>
                <img src={images.welcome.src} alt='header_img' />
            </div>
        </div>
    );
}
