import Sidebar from "@/components/layouts/Sidebar";
import cl from "./layout.module.css";

export default function UserLayout({ children }) {
    return (
        <>
            <h1 className='title'>Личный кабинет</h1>

            <Sidebar />
            <main className='main'>{children}</main>
        </>
    );
}
