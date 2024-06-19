import CanyonHeader from "@/components/landings/canyon/CanyonHeader";

export default function CanyonLayout({ children }) {
    return (
        <>
            <CanyonHeader />
            {children}
        </>
    );
}
