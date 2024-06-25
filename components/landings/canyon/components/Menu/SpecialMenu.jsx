import React from "react";

import SubHeading from "../layout/subheading/SubHeading";
import images from "../../constants/images";
import data from "../../constants/data";
import "./SpecialMenu.css";
import MenuItem from "../layout/MenuItem/MenuItem";

const SpecialMenu = () => (
    <div className='app__specialMenu flex__center section__padding' id='menu'>
        <div className='app__specialMenu-title'>
            <SubHeading title='Меню по вашему вкусу' />
            <h1 className='headtext__cormorant'>Предложение дня</h1>
        </div>

        <div className='app__specialMenu-menu'>
            <div className='app__specialMenu-menu_wine  flex__center'>
                <p className='app__specialMenu-menu_heading'>Вино & Пиво</p>
                <div className='app__specialMenu_menu_items'>
                    {data.wines.map((wine, index) => (
                        <MenuItem
                            key={wine.title + index}
                            title={wine.title}
                            price={wine.price}
                            tags={wine.tags}
                        />
                    ))}
                </div>
            </div>

            <div className='app__specialMenu-menu_img'>
                <img src={images.menu.src} alt='menu__img' />
            </div>

            <div className='app__specialMenu-menu_cocktails  flex__center'>
                <p className='app__specialMenu-menu_heading'>Коктейли</p>
                <div className='app__specialMenu_menu_items'>
                    {data.cocktails.map((cocktail, index) => (
                        <MenuItem
                            key={cocktail.title + index}
                            title={cocktail.title}
                            price={cocktail.price}
                            tags={cocktail.tags}
                        />
                    ))}
                </div>
            </div>
        </div>

        <div style={{ marginTop: 15 }}>
            <button type='button' className='custom__button'>
                Посмотреть больше
            </button>
        </div>
    </div>
);

export default SpecialMenu;
