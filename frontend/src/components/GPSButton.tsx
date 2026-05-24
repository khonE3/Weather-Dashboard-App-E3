'use client';

import React, { useState } from 'react';
import { Navigation, Loader2 } from 'lucide-react';

interface GPSButtonProps { onSuccess: (lat: number, lon: number) => void; }

export default function GPSButton({ onSuccess }: GPSButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = () => {
        if (!navigator.geolocation) { setError('ไม่รองรับ GPS'); return; }
        setLoading(true); setError(null);
        navigator.geolocation.getCurrentPosition(
            (pos) => { setLoading(false); onSuccess(pos.coords.latitude, pos.coords.longitude); },
            (err) => {
                setLoading(false);
                const msgs: Record<number, string> = { 1: 'กรุณาอนุญาตสิทธิ์ GPS', 2: 'ระบุตำแหน่งไม่ได้', 3: 'หมดเวลา' };
                setError(msgs[err.code] || 'เกิดข้อผิดพลาด');
                setTimeout(() => setError(null), 4000);
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
        );
    };

    return (
        <div className="relative flex-shrink-0">
            <button onClick={handleClick} disabled={loading} className="btn-primary flex items-center gap-2 px-4 py-2.5 text-sm whitespace-nowrap">
                {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>กำลังค้นหา</span></>
                ) : (
                    <><Navigation className="w-3.5 h-3.5" /><span>GPS</span></>
                )}
            </button>
            {error && (
                <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 whitespace-nowrap animate-fade-in">
                    {error}
                </div>
            )}
        </div>
    );
}
