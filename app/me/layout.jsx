import LkHeader from "@/components/layouts/Lk_header";

export default function UserLayout({ children }) {
    return (
        <>
            <h1 className='title'>Личный кабинет</h1>
            <LkHeader />

            <main className='main'>{children}</main>
        </>
    );
}
