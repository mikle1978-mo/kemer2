import "./canyon.css";
import Header from "@/components/landings/canyon/components/Header/Header";
import SpecialMenu from "@/components/landings/canyon/components/Menu/SpecialMenu";
import AboutUs from "@/components/landings/canyon/components/AboutUs/AboutUs";
import Chef from "@/components/landings/canyon/components/Chef/Chef";
import Gallery from "@/components/landings/canyon/components/Gallery/Gallery";
import FindUs from "@/components/landings/canyon/components/FindUs/FindUs";
import Footer from "@/components/landings/canyon/components/layout/Footer/Footer";

export const metadata = {
    title: {
        default: "Ресторан Каньон в Кемере",
    },
    description:
        "Ресторан Каньон в Кемере. Ресторан расположен в живописном каньоне у берега горной реки, окружённый величественными скалами и бурлящими водопадами.",
    alternates: {
        canonical: `${process.env.API_URL}/landings/canyon`,
    },
};

export default function Canyon() {
    return (
        <>
            <Header />
            <AboutUs />
            <SpecialMenu />
            <Chef />
            <Gallery />
            <FindUs />
            <Footer />
        </>
    );
}
