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
        <html lang='ru'>
            <head>
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/images/favicon/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/images/favicon/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/images/favicon/favicon-16x16.png'
                />
                <link rel='manifest' href='/site.webmanifest' />

                <link
                    rel='mask-icon'
                    href='/images/favicon/safari-pinned-tab.svg'
                    color='#5bbad5'
                />
                <meta name='msapplication-TileColor' content='#00aba9' />
                <meta name='theme-color' content='#ffffff' />
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
