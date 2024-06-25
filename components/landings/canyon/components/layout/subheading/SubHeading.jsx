import React from "react";

import images from "../../../constants/images";

export default function SubHeading({ title }) {
    return (
        <>
            <div style={{ marginBottom: "1rem" }}>
                <p className='p__cormorant'>{title}</p>
                <img
                    src={images.spoon.src}
                    alt='spoon_image'
                    className='spoon__img'
                />
            </div>
        </>
    );
}
