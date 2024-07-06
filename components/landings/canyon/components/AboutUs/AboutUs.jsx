"use client";
import React from "react";

import images from "../../constants/images";
import "./AboutUs.css";
import MyModal from "@/components/UI/myButton/myModal";
import { useState } from "react";

export default function AboutUs() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    return (
        <>
            <div
                className='app__aboutus app__bg flex__center section__padding'
                id='about'
            >
                <div className='app__aboutus-content flex__center'>
                    <div className='app__aboutus-content_about'>
                        <h2 className='headtext__cormorant'>О нас</h2>
                        <img
                            src={images.spoon.src}
                            alt='about_spoon'
                            className='spoon__img'
                        />
                        <p className='p__opensans'>
                            Ресторан расположен в живописном каньоне у берега
                            горной реки, окружённый величественными скалами и
                            бурлящими водопадами. В этом историческом месте, где
                            можно увидеть древние артефакты и{" "}
                            <i>мост Александра Македонского,</i>а также
                            искупаться в <i>чистой пресной воде</i>, вы сможете
                            насладиться изысканными блюдами из свежих местных
                            ингредиентов. Уютная терраса с панорамным видом
                            создаёт идеальную атмосферу для отдыха и праздников,
                            погружая гостей в уникальную гармонию природы и
                            истории.
                        </p>
                        <button
                            type='button'
                            className='custom__button'
                            onClick={toggleOpen}
                        >
                            Узнать больше
                        </button>
                        <MyModal isOpen={isOpen} toggleOpen={toggleOpen}>
                            <div className='modalAbout'>
                                <h2 className='modalAbout_title'>О нас</h2>
                                <div className='modal_box'>
                                    <p>
                                        «Каньон» — это идеальное место для
                                        романтических ужинов, семейных
                                        праздников и торжественных мероприятий.
                                        Здесь каждый гость найдёт для себя
                                        уголок уюта и гармонии с природой.
                                        Вечерами ресторан наполняется живой
                                        музыкой, что придаёт особое очарование
                                        вашему визиту.
                                    </p>
                                    <p>
                                        Посетив наш ресторан, вы окунетесь в
                                        атмосферу спокойствия и умиротворения,
                                        наслаждаясь великолепными видами и
                                        вкусной едой. Добро пожаловать в
                                        «Каньон» — место, где природа и
                                        гастрономия встречаются в идеальной
                                        гармонии.
                                    </p>
                                    <p>
                                        В этом историческом месте можно увидеть
                                        древние артефакты,{" "}
                                        <i>мост Александра Македонского,</i> а
                                        также искупаться в{" "}
                                        <i>чистой пресной воде</i>.
                                    </p>
                                    <p>
                                        {" "}
                                        История моста, построенного более двух
                                        тысяч лет назад, окутана загадками: от
                                        прохода через него войск Александра
                                        Македонского до путешествия известного
                                        римского императора Адриана по Ликии.
                                        Завораживающие виды на древнюю
                                        архитектуру и природные окрестности,
                                        включая местный водопад, делают наше
                                        место идеальным для тех, кто ищет не
                                        только вкус, но и вдохновение.
                                    </p>
                                    <p>
                                        {" "}
                                        Уютная терраса создаёт идеальную
                                        атмосферу для отдыха и праздников,
                                        погружая гостей в уникальную гармонию
                                        природы и истории.
                                    </p>
                                    <p>
                                        Наши шеф-повара используют только самые
                                        свежие и местные ингредиенты, чтобы
                                        каждое блюдо стало отражением
                                        уникального духа этого места. Приходите
                                        в ресторан "Каньон" и ощутите волшебство
                                        истории, наслаждаясь отличной кухней в
                                        окружении величественных природных
                                        красот.
                                    </p>
                                    <p>
                                        Не упустите возможность забронировать
                                        стол и превратить обед или ужин в
                                        незабываемое путешествие через века и
                                        водопад впечатлений.
                                    </p>
                                </div>
                            </div>
                        </MyModal>
                    </div>
                </div>
            </div>
        </>
    );
}
