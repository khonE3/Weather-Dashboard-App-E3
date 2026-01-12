'use client';

import React from 'react';

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            {/* Dog Running Animation */}
            <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 flex items-center justify-center animate-bounce">
                    <svg width="60" height="60" viewBox="0 0 100 100">
                        {/* Simple running dog */}
                        <ellipse cx="50" cy="50" rx="25" ry="18" fill="#8B4513" />
                        <circle cx="70" cy="40" r="12" fill="#A0522D" />
                        <ellipse cx="62" cy="35" rx="5" ry="8" fill="#8B4513" />
                        <ellipse cx="78" cy="35" rx="5" ry="8" fill="#8B4513" />
                        <circle cx="75" cy="40" r="2" fill="#1a1a2e" />
                        <ellipse cx="80" cy="43" rx="3" ry="2" fill="#1a1a2e" />
                        {/* Legs in motion */}
                        <rect x="35" y="58" width="4" height="15" rx="2" fill="#8B4513" className="animate-pulse" />
                        <rect x="45" y="58" width="4" height="12" rx="2" fill="#8B4513" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
                        <rect x="55" y="58" width="4" height="15" rx="2" fill="#8B4513" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <rect x="65" y="58" width="4" height="12" rx="2" fill="#8B4513" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                        {/* Tail */}
                        <path d="M 25 45 Q 10 35 15 50" stroke="#8B4513" strokeWidth="5" fill="none" className="animate-wag" />
                    </svg>
                </div>
            </div>

            {/* Loading Text */}
            <div className="text-center">
                <div className="text-lg font-medium mb-2">กำลังโหลดข้อมูลสภาพอากาศ...</div>
                <div className="flex justify-center gap-1">
                    <span className="w-2 h-2 bg-isan-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 bg-isan-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-2 h-2 bg-isan-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
            </div>
        </div>
    );
}
