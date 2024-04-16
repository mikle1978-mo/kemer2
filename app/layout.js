import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Inter } from "next/font/google";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: "Кемер-онлайн, продукты, товары и услуги в Кемере",
        template: "%s - Кемер-онлайн",
    },
    description:
        "Онлайн магазин в Кемере, Анталия, Турция, бесплатная доставка по городу Кемер",
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <head>
                <meta name='yandex-verification' content='bfa50507e825995b' />
                {/* Add Google Analytics script */}
                <script
                    async
                    src='https://www.googletagmanager.com/gtag/js?id=G-RBNVCFN9DR'
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-RBNVCFN9DR');
                        `,
                    }}
                />
            </head>
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
