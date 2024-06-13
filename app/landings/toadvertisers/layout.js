import LandingsContact from "@/components/landings/LandingsContact";
import LandingsHeader from "@/components/landings/LandingsHeader";

export default function toAdvisersLayout({ children }) {
    const navLinks = [
        { name: "Баннер", href: "banner" },
        { name: "Лендинг", href: "landingpage" },
        { name: "Тизер", href: "tizer" },
    ];
    return (
        <>
            <LandingsHeader navLinks={navLinks} />
            {children}
            <LandingsContact />
        </>
    );
}
