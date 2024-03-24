import Image from "next/image";
import cl from "./PayingCripto.module.css";

const PayingInfo = () => {
    return (
        <>
            <h3 className='title'>Реквизиты для оплаты</h3>

            <div className={cl.wrap}>
                <Image
                    className='w-auto'
                    src='/images/QR/QR_USDT.webp'
                    height={120}
                    width={120}
                    alt='Kemer-online'
                />
                <div>
                    <p className={cl.subtitle}>
                        Оплата криптовалютой - Tether USDT{" "}
                    </p>
                    <p className={cl.p}>
                        Адрес: <span>TCGugMUKZ8DZhhDGcFncvaebRCkcqg5TNY</span>
                    </p>
                    <p className={cl.p}>
                        Сеть: <span>USDT-TRC20</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default PayingInfo;
