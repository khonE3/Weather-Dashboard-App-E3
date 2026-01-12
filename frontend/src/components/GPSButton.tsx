'use client';

import React, { useState } from 'react';

interface GPSButtonProps {
    onSuccess: (lat: number, lon: number) => void;
}

export default function GPSButton({ onSuccess }: GPSButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = () => {
        if (!navigator.geolocation) {
            setError('เบราว์เซอร์ไม่รองรับ GPS');
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLoading(false);
                onSuccess(position.coords.latitude, position.coords.longitude);
            },
            (err) => {
                setLoading(false);
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        setError('กรุณาอนุญาตให้เข้าถึงตำแหน่ง');
                        break;
                    case err.POSITION_UNAVAILABLE:
                        setError('ไม่สามารถระบุตำแหน่งได้');
                        break;
                    case err.TIMEOUT:
                        setError('หมดเวลาในการค้นหาตำแหน่ง');
                        break;
                    default:
                        setError('เกิดข้อผิดพลาด');
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                disabled={loading}
                className={`
          px-6 py-3 rounded-xl font-medium transition-all duration-300
          flex items-center gap-2 whitespace-nowrap
          ${loading
                        ? 'bg-white/20 cursor-wait'
                        : 'bg-isan-gold hover:bg-isan-sunset hover:scale-105 active:scale-95'
                    }
          ${!loading && 'animate-pulse-slow hover:animate-none'}
          shadow-lg hover:shadow-xl
        `}
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>กำลังค้นหา...</span>
                    </>
                ) : (
                    <>
                        <span className="text-xl">📍</span>
                        <span>ตำแหน่งปัจจุบัน</span>
                    </>
                )}
            </button>

            {/* Error Tooltip */}
            {error && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-500/90 backdrop-blur-sm rounded-lg text-sm text-center animate-fade-in">
                    ❌ {error}
                </div>
            )}
        </div>
    );
}
