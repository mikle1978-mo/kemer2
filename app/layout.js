import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Inter } from "next/font/google";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: "Кемер-онлайн, продукты и товары в Кемере",
        template: "%s - Кемер-онлайн",
    },
    description:
        "Онлайн магазин в Кемере, Анталия, Турция, бесплатная доставка по городу Кемер",
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <GlobalProvider>
                    <Header />
                    <div className='container'>
                        <div className='section'>{children}</div>
                    </div>
                    <Footer />
                </GlobalProvider>
            </body>
        </html>
    );
}
