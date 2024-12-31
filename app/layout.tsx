import './globals.css';
import Navbar from './components/Navbar/index'; // Aquest és el teu nou Navbar
import Footer from './components/Footer/index';
import Head from 'next/head'; // Import correcte
import { AuthProvider } from "./components/AuthContext/index";


export const metadata = {
    title: 'Clothy',
    description: 'Cercador de roba',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <link rel="icon" href="/icon.png" />
        </Head>
        <body>
        <AuthProvider>
        <Navbar />
        {children}
        <Footer />
        </AuthProvider>
        </body>
        </html>
    );
}
