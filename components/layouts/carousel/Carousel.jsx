import cl from "./Carousel.module.css";
import ImageWrapper from "./ImageWrapper";

export default function Carousel({ data }) {
    return (
        <div className={cl.main_container}>
            <div className={cl.window}>
                <div className={cl.all_pages_container}>
                    {data.images.map((child) => (
                        <div key={child._id} className={cl.item}>
                            <ImageWrapper child={child} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
