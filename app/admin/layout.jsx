import Sidebar from "@/components/layouts/Sidebar";
import cl from "./layout.module.css";

export default function AdminLayout({ children }) {
    return (
        <>
            <section className={cl.title_section}>
                <div className='container'>
                    <h1 className={cl.title}>Admin Dashboard</h1>
                </div>
            </section>

            <section className={cl.main_section}>
                <Sidebar />
                <div className='container'>
                    <div className={cl.main_wrap}>
                        <main className={cl.main}>
                            <article className={cl.article}>{children}</article>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
}
