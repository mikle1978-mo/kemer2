import React from "react";

import SubHeading from "../../components/layout/subheading/SubHeading";
import images from "../../constants/images";
import "./Chef.css";

const Chef = () => (
    <div className='app__bg app__wrapper section__padding'>
        <div className='app__wrapper_img app__wrapper_img-reverse'>
            <img src={images.chef.src} alt='chef_image' />
        </div>
        <div className='app__wrapper_info'>
            <SubHeading title='мир шеф-повара' />
            <h1 className='headtext__cormorant'>Во что мы верим</h1>

            <div className='app__chef-content'>
                <div className='app__chef-content_quote'>
                    <img src={images.quote.src} alt='quote_image' />
                    <p className='p__opensans'>
                        Для меня, как повара, турецкая кухня — это больше, чем
                        просто еда.{" "}
                    </p>
                </div>
                <p className='p__opensans'>
                    {" "}
                    Каждый ингредиент, каждая специя и каждый рецепт имеют свою
                    историю и душу. Когда я готовлю, я стремлюсь создать не
                    просто блюдо, а настоящий кулинарный шедевр, который
                    расскажет вам о нашей культуре и оставит незабываемое
                    впечатление. В нашем ресторане мы с гордостью предлагаем
                    аутентичные турецкие блюда, приготовленные с любовью и
                    уважением к многовековым традициям.{" "}
                </p>
            </div>

            <div className='app__chef-sign'>
                <p>Orhan Baba Özel</p>
                <p className='p__opensans'>Шеф & Управляющий</p>
                <img src={images.sign.src} alt='sign_image' />
            </div>
        </div>
    </div>
);

export default Chef;
