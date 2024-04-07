import cl from "./layout.module.css";
import LkHeader from "@/components/layouts/Lk_header";

export default function AdminLayout({ children }) {
    return (
        <>
            <h1 className='title'>Admin Dashboard</h1>
            <LkHeader />
            <div className={cl.main_wrap}>
                <main className={cl.main}>
                    <article className={cl.article}>{children}</article>
                </main>
            </div>
        </>
    );
}
