"use client";

import cl from "./Congratulation.module.css";
import MyButton from "../UI/myButton/myButton";

const Congratulation = () => {
    return (
        <>
            <h3 className='title'>Поздравляем !</h3>
            <div className={cl.text}>
                Ваш заказ успешно оформлен. В ближайшее время с Вами свяжется
                наш специалист. Ожидайте.
            </div>
            <div className={cl.red_text}>
                Спасибо, что выбрали Кемер-онлайн!
            </div>

            <div className={cl.text}>
                {" "}
                Состояние заказа вы можете отслеживать в Вашем личном кабинете
                на вкладке "заказы".
            </div>
            <MyButton
                type='button'
                style={{ backgroundColor: "green" }}
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/`;
                }}
            >
                На главную
            </MyButton>
            <br />
            <MyButton
                type='button'
                style={{ backgroundColor: "gray" }}
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/me/orders?order_success=true`;
                }}
            >
                Заказы
            </MyButton>
        </>
    );
};

export default Congratulation;
