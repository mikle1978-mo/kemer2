"use client";

import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import images from "../../../constants/images";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className='app__navbar'>
            <div className='app__navbar-logo'>
                <img src={images.gericht.src} alt='app__logo' />
            </div>
            <ul className='app__navbar-links'>
                <li className='p__opensans'>
                    <a href='#home'>Главная</a>
                </li>
                <li className='p__opensans'>
                    <a href='#about'>О нас</a>
                </li>
                <li className='p__opensans'>
                    <a href='#menu'>Меню</a>
                </li>

                <li className='p__opensans'>
                    <a href='#contact'>Контакты</a>
                </li>
            </ul>
            <div className='app__navbar-login'>
                <a href='#login' className='p__opensans'>
                    Log In / Registration
                </a>
                <div />
                <a href='/' className='p__opensans'>
                    Book Table
                </a>
            </div>
            <div className='app__navbar-smallscreen'>
                <GiHamburgerMenu
                    color='#fff'
                    fontSize={27}
                    onClick={() => setToggleMenu(true)}
                />
                {toggleMenu && (
                    <div className='app__navbar-smallscreen_overlay slide-bottom'>
                        <MdOutlineRestaurantMenu
                            fontSize={27}
                            className='overlay__close'
                            onClick={() => setToggleMenu(false)}
                        />
                        <ul className='app__navbar-smallscreen_links'>
                            <li>
                                <a
                                    href='#home'
                                    onClick={() => setToggleMenu(false)}
                                >
                                    Главная
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#about'
                                    onClick={() => setToggleMenu(false)}
                                >
                                    О нас
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#menu'
                                    onClick={() => setToggleMenu(false)}
                                >
                                    Меню
                                </a>
                            </li>

                            <li>
                                <a
                                    href='#contact'
                                    onClick={() => setToggleMenu(false)}
                                >
                                    Контакты
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#login'
                                    onClick={() => setToggleMenu(false)}
                                >
                                    Заказать столик
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
