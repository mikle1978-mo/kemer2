"use client";

import cl from "./ToSellersHeader.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ToSellersHeader({ navLinks }) {
    const pathname = usePathname() || "";

    return (
        <nav className={cl.menu}>
            {navLinks.map((link) => {
                // Приведение путей к единому формату для сравнения
                const fullPath = `/landings/tosellers/${link.href.replace(
                    /^\//,
                    ""
                )}`;

                const isActive = pathname.startsWith(fullPath);

                return (
                    <Link
                        href={fullPath}
                        key={link.name}
                        className={isActive ? cl.active : ""}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
}
