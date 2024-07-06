"use client";

import React from "react";

import SubHeading from "../layout/subheading/SubHeading";
import images from "../../constants/images";
import data from "../../constants/data";
import "./SpecialMenu.css";
import MenuItem from "../layout/MenuItem/MenuItem";
import MyModal from "@/components/UI/myButton/myModal";
import { useState } from "react";

export default function SpecialMenu() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const toggleOpen = () => setIsOpenMenu(!isOpenMenu);
    return (
        <>
            <div
                className='app__specialMenu flex__center section__padding'
                id='menu'
            >
                <div className='app__specialMenu-title'>
                    <SubHeading title='Меню по вашему вкусу' />
                    <h2 className='headtext__cormorant'>Предложение дня</h2>
                </div>

                <div className='app__specialMenu-menu'>
                    <div className='app__specialMenu-menu_wine  flex__center'>
                        <p className='app__specialMenu-menu_heading'>Жаркое</p>
                        <div className='app__specialMenu_menu_items'>
                            {data.wines.map((wine, index) => (
                                <MenuItem
                                    key={wine.title + index}
                                    title={wine.title}
                                    price={wine.price}
                                    description={wine.description}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='app__specialMenu-menu_img'>
                        <img src={images.menu.src} alt='menu__img' />
                    </div>

                    <div className='app__specialMenu-menu_cocktails  flex__center'>
                        <p className='app__specialMenu-menu_heading'>
                            Морепродукты
                        </p>
                        <div className='app__specialMenu_menu_items'>
                            {data.cocktails.map((cocktail, index) => (
                                <MenuItem
                                    key={cocktail.title + index}
                                    title={cocktail.title}
                                    price={cocktail.price}
                                    description={cocktail.description}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 15 }}>
                    <button
                        type='button'
                        className='custom__button'
                        onClick={toggleOpen}
                    >
                        Посмотреть больше
                    </button>
                </div>
            </div>
            <MyModal isOpen={isOpenMenu} toggleOpen={toggleOpen}>
                {" "}
                <div className='modalMenu'>
                    <h2 className='modalMenu_title'>Меню</h2>
                    <div className='modal_box'>
                        <div className='app__specialMenu-menu_cocktails  flex__center'>
                            <div className='app__specialMenu_menu_items'>
                                {data.menu.map((item, index) => (
                                    <MenuItem
                                        key={item.title + index}
                                        title={item.title}
                                        price={item.price}
                                        description={item.description}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </MyModal>
        </>
    );
}
