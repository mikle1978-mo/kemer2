import Sidebar from "@/components/layouts/Sidebar";
import cl from "./layout.module.css";

export default function UserLayout({ children }) {
    return (
        <>
            <section className={cl.me}>
                <div className='container'>
                    <h1 className={cl.me_title}>Личный кабинет</h1>
                </div>
            </section>

            <section className={cl.section}>
                <div className='container'>
                    <div className={cl.me_wrap}>
                        <Sidebar />
                        <main className={cl.main}>
                            <article className='border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5'>
                                {children}
                            </article>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
}
