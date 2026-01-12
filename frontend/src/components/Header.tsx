'use client';

import React from 'react';

export default function Header() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <header className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
            {/* Dog Mascot Logo - Click to refresh */}
            <button
                onClick={handleRefresh}
                className="mascot cursor-pointer relative group hover:scale-110 transition-transform"
                title="รีเฟรชหน้าเว็บ"
            >
                <svg
                    width="80"
                    height="80"
                    viewBox="0 0 100 100"
                    className="drop-shadow-lg"
                >
                    {/* Dog Body */}
                    <ellipse cx="50" cy="60" rx="30" ry="25" fill="#8B4513" />

                    {/* Dog Head */}
                    <circle cx="50" cy="35" r="25" fill="#A0522D" />

                    {/* Dog Ears */}
                    <ellipse
                        cx="28"
                        cy="25"
                        rx="10"
                        ry="15"
                        fill="#8B4513"
                        className="dog-ear origin-bottom"
                        style={{ transformOrigin: '28px 35px' }}
                    />
                    <ellipse
                        cx="72"
                        cy="25"
                        rx="10"
                        ry="15"
                        fill="#8B4513"
                        className="dog-ear origin-bottom"
                        style={{ transformOrigin: '72px 35px' }}
                    />

                    {/* Dog Eyes */}
                    <circle cx="40" cy="32" r="5" fill="white" />
                    <circle cx="60" cy="32" r="5" fill="white" />
                    <circle cx="41" cy="33" r="3" fill="#1a1a2e" />
                    <circle cx="61" cy="33" r="3" fill="#1a1a2e" />
                    <circle cx="42" cy="32" r="1" fill="white" />
                    <circle cx="62" cy="32" r="1" fill="white" />

                    {/* Dog Nose */}
                    <ellipse cx="50" cy="42" rx="6" ry="4" fill="#1a1a2e" />

                    {/* Dog Mouth - Eating */}
                    <path
                        d="M 42 48 Q 50 55 58 48"
                        stroke="#1a1a2e"
                        strokeWidth="2"
                        fill="none"
                    />

                    {/* Rice Bowl */}
                    <ellipse cx="50" cy="82" rx="18" ry="8" fill="#DAA520" />
                    <ellipse cx="50" cy="78" rx="15" ry="6" fill="#F5F5DC" />
                    <ellipse cx="50" cy="76" rx="12" ry="4" fill="white" />

                    {/* Rice in Bowl */}
                    <circle cx="46" cy="75" r="2" fill="#F5F5DC" />
                    <circle cx="50" cy="74" r="2" fill="#F5F5DC" />
                    <circle cx="54" cy="75" r="2" fill="#F5F5DC" />

                    {/* Dog Tail */}
                    <path
                        d="M 78 55 Q 95 45 92 60"
                        stroke="#8B4513"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="dog-tail origin-left"
                        style={{ transformOrigin: '78px 55px' }}
                    />

                    {/* Collar */}
                    <rect x="38" y="52" width="24" height="5" rx="2" fill="#CD5C5C" />
                    <circle cx="50" cy="57" r="3" fill="#DAA520" />
                </svg>
            </button>

            {/* Title */}
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-shadow">
                    🌤️ พยากรณ์อากาศ
                </h1>
                <p className="text-sm sm:text-base text-white/80 font-medium">
                    หนองบัวลำภู • อีสาน
                </p>
            </div>
        </header>
    );
}
