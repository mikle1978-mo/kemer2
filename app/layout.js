import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <head />
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
