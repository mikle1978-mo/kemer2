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
                Состояние заказа Вы можете отслеживать в Вашем личном кабинете
                на вкладке "заказы".
            </div>
            <div className={cl.btns_wrap}>
                <MyButton
                    type='button'
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/`;
                    }}
                >
                    На главную
                </MyButton>

                <MyButton
                    type='button'
                    style={{
                        backgroundColor: "var(--primary-4)",
                        border: "1px solid var(--primary-3)",
                        color: "black",
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/me/orders?order_success=true`;
                    }}
                >
                    Заказы
                </MyButton>
            </div>
        </>
    );
};

export default Congratulation;
