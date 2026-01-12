import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'พยากรณ์อากาศ หนองบัวลำภู | Weather Dashboard',
    description: 'แอปพยากรณ์อากาศประเทศไทย ธีมอีสาน หนองบัวลำภู - ข้อมูลสภาพอากาศแบบเรียลไทม์',
    keywords: ['weather', 'thailand', 'isan', 'nong bua lam phu', 'พยากรณ์อากาศ', 'หนองบัวลำภู'],
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="th">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="antialiased">
                {/* Isan Pattern Overlay */}
                <div className="isan-pattern-overlay" />

                {/* Floating Clouds */}
                <div className="cloud cloud-1">
                    <svg width="120" height="60" viewBox="0 0 120 60" fill="white">
                        <ellipse cx="40" cy="40" rx="30" ry="20" />
                        <ellipse cx="70" cy="35" rx="35" ry="25" />
                        <ellipse cx="90" cy="40" rx="25" ry="18" />
                    </svg>
                </div>
                <div className="cloud cloud-2">
                    <svg width="100" height="50" viewBox="0 0 100 50" fill="white" opacity="0.7">
                        <ellipse cx="30" cy="35" rx="25" ry="15" />
                        <ellipse cx="55" cy="30" rx="30" ry="20" />
                        <ellipse cx="75" cy="35" rx="20" ry="15" />
                    </svg>
                </div>
                <div className="cloud cloud-3">
                    <svg width="80" height="40" viewBox="0 0 80 40" fill="white" opacity="0.5">
                        <ellipse cx="25" cy="28" rx="20" ry="12" />
                        <ellipse cx="45" cy="25" rx="25" ry="15" />
                        <ellipse cx="60" cy="28" rx="18" ry="12" />
                    </svg>
                </div>

                {/* Main Content */}
                <main className="relative z-10 min-h-screen">
                    {children}
                </main>

                {/* Rice Field at Bottom */}
                <div className="rice-field">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="rice-stalk" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                </div>
            </body>
        </html>
    );
}
