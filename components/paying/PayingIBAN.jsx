import Image from "next/image";
import cl from "./PayingCripto.module.css";

const PayingIBAN = () => {
    return (
        <>
            <h3 className='title'>Реквизиты для оплаты</h3>
            <div className='wrap'>
                <Image
                    className='w-auto'
                    src='/images/QR/Ziraat.webp'
                    height={120}
                    width={120}
                    alt='Kemer-online'
                />
                <p className={cl.subtitle}>Оплата по номеру IBAN</p>
                <p className={cl.p}>
                    {" "}
                    IBAN №: <span>TR700001009010631799905001</span>
                </p>
                <p className={cl.p}>
                    {" "}
                    Имя: <span>MIKHAIL GROMOV</span>
                </p>
            </div>
        </>
    );
};

export default PayingIBAN;
