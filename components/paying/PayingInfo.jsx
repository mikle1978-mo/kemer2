
import Image from "next/image";

const PayingInfo = () => {
    return (
        <div className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
            <header className="lg:flex justify-between mb-4">
                <div className="mb-4 lg:mb-0">
                    Реквизиты для оплаты
                </div>
            </header>
            <div className="grid md:grid-cols-2 gap-2">
                <div>
                    <p className="text-gray-400 mb-1">Оплата по номеру IBAN</p>
                    <p className="text-400 mb-1"> IBAN №:{" "}<span>TR700001009010631799905001</span></p>
                    <p className="text-400 mb-1"> Имя:{" "}<span>MIKHAIL GROMOV</span></p>

                </div>
                <div>
                    <p className="text-gray-400 mb-1">Оплата криптовалютой - Tether USDT </p>
                    <p className="text-400 mb-1">Адрес:{" "}<span>TCGugMUKZ8DZhhDGcFncvaebRCkcqg5TNY</span></p>
                    <p className="text-400 mb-1">Сеть:{" "}<span>USDT-TRC20</span></p>
                    <Image
                        className="w-auto"
                        src="/images/QR/QR_USDT.webp"
                        height={120}
                        width={120}
                        alt="Kemer-online"
                    />
                </div>

            </div>
        </div>
    );
};

export default PayingInfo;
