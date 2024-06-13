import ToSellersHeader from "@/components/landings/tosellers/ToSellersHeader";

export default function toSellersLayout({ children }) {
    const navLinks = [
        { name: "Условия", href: "conditions" },
        { name: "Тарифы", href: "prices" },
        { name: "Карточки товара", href: "productcard" },
    ];
    return (
        <>
            <ToSellersHeader navLinks={navLinks} />
            {children}
        </>
    );
}
