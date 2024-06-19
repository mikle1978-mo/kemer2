"use client";

import MyButton from "@/components/UI/myButton/myButton";
import cl from "./CanyonHeader.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CanyonHeader() {
    const nav = [
        {
            nameNav: "Главная",
            link: "#",
        },
        {
            nameNav: "Ресторан",
            link: "#",
        },
        {
            nameNav: "Меню",
            link: "#",
        },
        {
            nameNav: "Галерея",
            link: "#",
        },
        {
            nameNav: "Отзывы",
            link: "#",
        },
        {
            nameNav: "Контакты",
            link: "#",
        },
    ];
    const pathname = usePathname() || "";
    return (
        <nav className={cl.menu_block}>
            <div className={cl.desctop}>
                {nav.map((link) => {
                    const isActive = pathname.includes(link.link);

                    return (
                        <Link
                            href={link.link}
                            key={link.nameNav}
                            className={isActive ? cl.active : ""}
                        >
                            {link.nameNav}
                        </Link>
                    );
                })}
            </div>
            <a className={cl.button} href='#'>
                Позвонить
            </a>
            <div className={cl.menu}>
                <i className={cl.menuicon}>menu</i>
                <i className={cl.closeicon}>close</i>
            </div>
            <div className={cl.header_mobile}>
                <div className={cl.header_mobile_content}>
                    {nav.map((link) => {
                        const isActive = pathname.includes(link.link);

                        return (
                            <Link
                                href={link.link}
                                key={link.nameNav}
                                className={isActive ? cl.active : ""}
                            >
                                {link.nameNav}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
