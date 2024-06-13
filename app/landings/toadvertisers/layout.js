import ToAdvertiserHeader from "@/components/landings/toadvertisers/ToAdvertisersHeader";

export default function toSellersLayout({ children }) {
    return (
        <>
            <div className='container'>
                <div className='section'>
                    <ToAdvertiserHeader />
                    {children}
                </div>
            </div>
        </>
    );
}
