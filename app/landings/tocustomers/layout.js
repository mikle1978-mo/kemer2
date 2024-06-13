import ToCustomersHeader from "@/components/landings/tocustomers/ToCustomersHeader";

export default function toCustomersLayout({ children }) {
    return (
        <>
            <div className='container'>
                <div className='section'>
                    <ToCustomersHeader />
                    {children}
                </div>
            </div>
        </>
    );
}
