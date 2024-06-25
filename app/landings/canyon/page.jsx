import "./canyon.css";
import Header from "@/components/landings/canyon/components/Header/Header";
import SpecialMenu from "@/components/landings/canyon/components/Menu/SpecialMenu";
import AboutUs from "@/components/landings/canyon/components/AboutUs/AboutUs";
import Chef from "@/components/landings/canyon/components/Chef/Chef";
import Intro from "@/components/landings/canyon/components/Intro/Intro";
import Gallery from "@/components/landings/canyon/components/Gallery/Gallery";
import FindUs from "@/components/landings/canyon/components/FindUs/FindUs";
import Footer from "@/components/landings/canyon/components/layout/Footer/Footer";

export default function Canyon() {
    return (
        <>
            <Header />
            <AboutUs />
            <SpecialMenu />
            <Chef />
            <Intro />
            <Gallery />
            <FindUs />
            <Footer />
        </>
    );
}
