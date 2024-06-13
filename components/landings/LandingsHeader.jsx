"use client";

import cl from "./LandingsHeader.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ToSellersHeader({ navLinks }) {
    const pathname = usePathname() || "";

    return (
        <nav className={cl.menu}>
            {navLinks.map((link) => {
                const isActive = pathname.includes(link.href);

                return (
                    <Link
                        href={link.href}
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
