import './globals.css';
import Navbar from './components/Navbar/index'; // Aquest és el teu nou Navbar
import Footer from './components/Footer/index';
import Head from 'next/head'; // Import correcte

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
        <Navbar />
        {children}
        <Footer />
        </body>
        </html>
    );
}
