import Sidebar from "@/components/layouts/Sidebar";
import cl from "./layout.module.css";

export default function AdminLayout({ children }) {
    return (
        <>
            <h1 className='title'>Admin Dashboard</h1>

            <Sidebar />
            <div className={cl.main_wrap}>
                <main className={cl.main}>
                    <article className={cl.article}>{children}</article>
                </main>
            </div>
        </>
    );
}
