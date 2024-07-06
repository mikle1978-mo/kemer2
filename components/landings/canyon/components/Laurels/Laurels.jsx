import React from "react";

import data from "../../constants/data";
import images from "../../constants/images";
import SubHeading from "../layout/subheading/SubHeading";
import "./Laurels.css";

const AwardCard = ({ award: { imgUrl, title, subtitle } }) => (
    <div className='app__laurels_awards-card'>
        <img src={imgUrl} alt='awards' />
        <div className='app__laurels_awards-card_content'>
            <p className='p__cormorant' style={{ color: "#DCCA87" }}>
                {title}
            </p>
            <p className='p__opensans'>{subtitle}</p>
        </div>
    </div>
);

const Laurels = () => (
    <div className='app__bg app__wrapper section__padding' id='awards'>
        <div className='app__wrapper_info'>
            <SubHeading title='Достижения & признание' />
            <h2 className='headtext__cormorant'>Наши награды</h2>

            <div className='app__laurels_awards'>
                {data.awards.map((award) => (
                    <AwardCard award={award} key={award.title} />
                ))}
            </div>
        </div>

        <div className='app__wrapper_img'>
            <img src={images.laurels.src} alt='laurels_img' />
        </div>
    </div>
);

export default Laurels;
