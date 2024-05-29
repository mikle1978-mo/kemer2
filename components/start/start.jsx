import cl from "./start.module.css";

const Start = () => {
    return (
        <>
            <div className={cl.img_wrap}>
                <img className={cl.img} src='/images/reclam/start.webp' />
            </div>
            <h1 className='title'>Интернет магазин "Кемер-онлайн"</h1>
            <div className={cl.text}>
                "Приветствуем вас в Кemer-online - вашем новом интернет
                магазине, где каждый товар создан, чтобы удовлетворить ваши
                потребности прямо здесь, в нашем уютном городе Кемер!
            </div>
            <div className={cl.text}>
                {" "}
                Мы понимаем, что ваше время - это ценный ресурс, поэтому мы
                соберем все, что вам может понадобиться, в одном месте. От
                товаров для дома и бытовой техники до модной одежды и подарков -
                мы предлагаем широкий ассортимент товаров высокого качества по
                доступным ценам.{" "}
            </div>
            <div className={cl.text}>
                {" "}
                Мы гордимся нашими надежными партнерами и оперативной службой
                доставки, гарантируя вам, что ваш заказ будет доставлен прямо к
                вашему дому в кратчайшие сроки.
            </div>
            <div className={cl.text}>
                {" "}
                Присоединяйтесь к довольным клиентоам, которые уже выбрали
                удобство и надежность Кemer-online. Начните покупать прямо
                сейчас и наслаждайтесь беззаботным шоппингом!{" "}
            </div>
            <div className={cl.red_text}>
                Доставка доступна только в городе Кемер.
            </div>
            <div className={cl.text}>
                Начните ваше онлайн путешествие с нами - Кemer-online, ваш
                магазин №1 в Кемере!"
            </div>

            <div className={cl.bold_text}>
                Приглашаем к сотрудничеству рекламодателей из города Кемер!!!{" "}
                тел.: 90 (535) 606 26 42
            </div>
        </>
    );
};

export default Start;
