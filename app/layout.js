import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Inter } from "next/font/google";
import { GlobalProvider } from "./GlobalProvider";
import Navigation from "@/components/layouts/Navigation/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: "Интернет магазин 'Кемер-онлайн'",
        template: "%s - Кемер-онлайн",
    },
    description:
        "Онлайн магазин в Кемере, Анталия, Турция, бесплатная доставка по городу Кемер",
    keywords: [
        `Продать в Кемере`,
        "Интернет магазин в Кемере",
        "Продукты в Кемере",
        "Товары в Кемере",
        "Продавать в Кемере",
        "Купить онлайн в Кемере",
        "Купить в Кемере",
        "Торговая площадка",
    ],
};

export default async function RootLayout({ children }) {
    return (
        <html lang='ru'>
            <head>
                <meta
                    httpEquiv='content-type'
                    content='text/html; charset=UTF-8'
                />
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
                {/* <meta name='yandex-verification' content='bfa50507e825995b' /> */}
                <meta name='yandex-verification' content='4910d4d4a23be827' />
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
                {/*Yandex.Metrika counter*/}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(97637253, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });
              `,
                    }}
                />
                <noscript>
                    <div>
                        <img
                            src='https://mc.yandex.ru/watch/97637253'
                            style={{ position: "absolute", left: "-9999px" }}
                            alt=''
                        />
                    </div>
                </noscript>
                {/* /Yandex.Metrika counter */}
            </head>
            <body>
                <GlobalProvider>
                    <Header />
                    <Navigation />
                    <div className='container'>
                        <div className='section'>{children}</div>
                    </div>
                    <Footer />
                </GlobalProvider>
            </body>
        </html>
    );
}
