import React from "react";

import "./MenuItem.css";
import { mark } from "@/lib/const/const";

const MenuItem = ({ title, price, description }) => (
    <div className='app__menuitem'>
        <div className='app__menuitem-head'>
            <div className='app__menuitem-name'>
                <p className='p__cormorant' >
                    {title}
                </p>
            </div>
            <div className='app__menuitem-dash' />
            <div className='app__menuitem-price'>
                <p className='p__cormorant'>
                    {mark}
                    {price}
                </p>
            </div>
        </div>

        <div className='app__menuitem-sub'>
            <p className='p__opensans' >
                {description}
            </p>
        </div>
    </div>
);

export default MenuItem;
