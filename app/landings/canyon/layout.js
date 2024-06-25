import Navbar from "@/components/landings/canyon/components/layout/navbar/Navbar";

export default function CanyonLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
