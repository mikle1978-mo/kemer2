import cl from "./myCarusel.module.css";
import { caruselArray } from "@/lib/reclam/reclam";

export default function Carusel() {
    const sortedArray = caruselArray.sort(() => Math.random() - 0.5);
    return (
        <div className={cl.main_container}>
            <div className={cl.window}>
                <div className={cl.all_pages_container}>
                    {sortedArray.map((child) => (
                        <a key={child.id} href={child.link} className={cl.item}>
                            <img src={child.img} alt={child.name} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
