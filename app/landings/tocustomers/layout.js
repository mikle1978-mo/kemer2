import LandingsHeader from "@/components/landings/LandingsHeader";

export default function toCustomersLayout({ children }) {
    const navLinks = [
        { name: "Условия", href: "conditions" },
        { name: "Тарифы", href: "prices" },
        { name: "Карточки товара", href: "productcard" },
    ];
    return (
        <>
            <LandingsHeader navLinks={navLinks} />
            {children}
        </>
    );
}
