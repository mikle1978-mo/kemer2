"use client";

import cl from "./myCarusel.module.css";
import { caruselArray } from "@/lib/reclam/reclam";

export default function Carusel() {
    const sortedArray = caruselArray.sort(() => Math.random() - 0.5);
    return (
        <div className={cl.main_container}>
            <div className={cl.window}>
                <div className={cl.all_pages_container}>
                    {sortedArray.map((child) => (
                        <div
                            key={child.id}
                            className={cl.item}
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `${child.link}`;
                            }}
                        >
                            <img src={child.img} alt={child.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
