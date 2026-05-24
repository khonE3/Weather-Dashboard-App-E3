'use client';

import React from 'react';

export default function Header() {
    return (
        <button
            onClick={() => window.location.reload()}
            className="mascot flex-shrink-0"
            title="รีเฟรช"
        >
            <svg width="42" height="42" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="hBodyG" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#CD853F" />
                        <stop offset="100%" stopColor="#8B4513" />
                    </linearGradient>
                    <linearGradient id="hHeadG" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#DEB887" />
                        <stop offset="100%" stopColor="#CD853F" />
                    </linearGradient>
                    <linearGradient id="hBellG" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#b8860b" />
                        <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                </defs>
                <ellipse cx="50" cy="63" rx="26" ry="20" fill="url(#hBodyG)" />
                <path d="M 72 58 Q 88 44 86 56 Q 84 65 72 61" fill="url(#hBodyG)" className="dog-tail" style={{ transformOrigin: '72px 58px' }} />
                <circle cx="50" cy="36" r="22" fill="url(#hHeadG)" />
                <g className="dog-ear-left" style={{ transformOrigin: '32px 26px' }}>
                    <ellipse cx="32" cy="22" rx="8" ry="13" fill="#8B4513" />
                    <ellipse cx="32" cy="23" rx="5" ry="9" fill="#FFB6C1" />
                </g>
                <g className="dog-ear-right" style={{ transformOrigin: '68px 26px' }}>
                    <ellipse cx="68" cy="22" rx="8" ry="13" fill="#8B4513" />
                    <ellipse cx="68" cy="23" rx="5" ry="9" fill="#FFB6C1" />
                </g>
                <circle cx="34" cy="41" r="5" fill="#FFB6C1" opacity="0.75" className="dog-cheek" />
                <circle cx="66" cy="41" r="5" fill="#FFB6C1" opacity="0.75" className="dog-cheek" />
                <circle cx="41" cy="33" r="5" fill="#1a1a2e" />
                <circle cx="39.5" cy="31" r="2" fill="white" />
                <circle cx="42" cy="34" r="0.9" fill="white" />
                <circle cx="59" cy="33" r="5" fill="#1a1a2e" />
                <circle cx="57.5" cy="31" r="2" fill="white" />
                <circle cx="60" cy="34" r="0.9" fill="white" />
                <ellipse cx="50" cy="42" rx="9" ry="6" fill="#F5F5DC" />
                <ellipse cx="50" cy="39" rx="4" ry="2.8" fill="#1a1a2e" />
                <path d="M 45 42.5 Q 50 47 55 42.5" stroke="#1a1a2e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M 48 43.5 Q 50 47.5 52 43.5" fill="#FF6B81" />
                <path d="M 39 52 Q 50 56 61 52" stroke="#CD5C5C" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="50" cy="55" r="3.5" fill="url(#hBellG)" />
            </svg>
        </button>
    );
}
