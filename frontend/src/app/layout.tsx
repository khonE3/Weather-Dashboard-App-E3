import type { Metadata, Viewport } from 'next';
import './globals.css';
import MountainBackground from '@/components/MountainBackground';

export const metadata: Metadata = {
    title: 'พยากรณ์อากาศ หนองบัวลำภู | Weather Dashboard',
    description: 'แอปพยากรณ์อากาศประเทศไทย ครอบคลุม 77 จังหวัด — สะอาด รวดเร็ว แม่นยำ',
    keywords: ['weather', 'thailand', 'พยากรณ์อากาศ', 'หนองบัวลำภู'],
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="th">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="antialiased">
                {/* Nong Bua Lam Phu Mountain Landscape */}
                <MountainBackground />

                <main className="relative z-10 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
