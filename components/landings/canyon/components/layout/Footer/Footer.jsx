import React from "react";
import { FiFacebook, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import FooterOverlay from "./FooterOverlay";
import Newsletter from "./Newsletter";
import images from "../../../constants/images";
import "./Footer.css";

const Footer = () => (
    <div className='app__footer section__padding' id='login'>
        <FooterOverlay />
        <Newsletter />

        <div className='app__footer-links'>
            <div className='app__footer-links_contact'>
                <h2 className='app__footer-headtext'>Свяжитесь с нами</h2>
                <p className='p__opensans'>Kuzdere, 07982 Kemer/Antalya</p>
                <a href='tel:+905322347560' target='_blank' rel='noopener noreferrer'>
                    <p className='p__phone'>+90 532 234 75 60</p>
                </a>
                <a href='tel:+905322347560' target='_blank' rel='noopener noreferrer'>
                    <p className='p__phone'>+90 532 234 75 60</p>
                </a>
            </div>

            <div className='app__footer-links_logo'>
                <img src={images.gericht.src} alt='footer_logo' />
                <p className='p__opensans'>
                    &quot;Исключительный вкус с видом на вековые тайны&quot;
                </p>
                <img
                    src={images.spoon.src}
                    className='spoon__img'
                    style={{ marginTop: 15 }}
                    alt='spoon_footer'
                />
                <div className='app__footer-links_icons'>
                    <a
                        href='mailto:kesmebogazi@gmail.com?subject=Important-mail:&body=Hello.'
                        type='email'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FiMail />
                    </a>
                    <a
                        href='https://wa.me/905322347560'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaWhatsapp />
                    </a>
                    <a
                        href='https://www.instagram.com/kemerkesmebogazi?igsh=c295bWtuMnZnYnF2'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FiInstagram />
                    </a>
                </div>
            </div>

            <div className='app__footer-links_work'>
                <h2 className='app__footer-headtext'>Рабочие часы</h2>
                <p className='p__opensans'>Понедельник-Пятница:</p>
                <p className='p__opensans'>10:00 - 01:00 </p>
                <p className='p__opensans'>Суббота-Воскресенье:</p>
                <p className='p__opensans'>10:00 - 02:00</p>
            </div>
        </div>

        <div className='footer__copyright'>
            <p className='p__opensans'>
                &copy;2024 Canion. All Rights reserved.
            </p>
        </div>
    </div>
);

export default Footer;
