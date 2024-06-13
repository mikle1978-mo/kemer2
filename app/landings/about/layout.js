import AboutHeader from "@/components/landings/toadvertisers/ToAdvertisersHeader";

export default function AboutLayout({ children }) {
    return (
        <>
            <div className='container'>
                <div className='section'>
                    <AboutrHeader />
                    {children}
                </div>
            </div>
        </>
    );
}
