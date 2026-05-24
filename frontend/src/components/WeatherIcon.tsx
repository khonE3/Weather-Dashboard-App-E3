'use client';

import React from 'react';
import {
    Sun,
    CloudSun,
    Cloud,
    CloudFog,
    CloudRain,
    CloudSnow,
    CloudSunRain,
    CloudLightning,
    HelpCircle
} from 'lucide-react';

interface WeatherIconProps {
    code: number;
    className?: string;
}

export default function WeatherIcon({ code, className = 'w-6 h-6' }: WeatherIconProps) {
    // 0: ท้องฟ้าใส
    if (code === 0) {
        return <Sun className={`${className} text-amber-400`} />;
    }
    // 1, 2: ส่วนใหญ่ใส / เมฆบางส่วน
    if (code === 1 || code === 2) {
        return <CloudSun className={`${className} text-sky-300`} />;
    }
    // 3: เมฆมาก
    if (code === 3) {
        return <Cloud className={`${className} text-slate-400`} />;
    }
    // 45, 48: หมอก
    if (code === 45 || code === 48) {
        return <CloudFog className={`${className} text-slate-300`} />;
    }
    // 51, 53, 55, 56, 57, 61, 63, 65, 66, 67: กลุ่มฝนตก/ฝนเยือกแข็ง
    if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67)) {
        return <CloudRain className={`${className} text-sky-400`} />;
    }
    // 71, 73, 75, 77, 85, 86: กลุ่มหิมะ/ลูกเห็บ
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
        return <CloudSnow className={`${className} text-blue-100`} />;
    }
    // 80, 81, 82: ฝนตกเป็นพักๆ
    if (code >= 80 && code <= 82) {
        return <CloudSunRain className={`${className} text-sky-400`} />;
    }
    // 95, 96, 99: พายุฝนฟ้าคะนอง
    if (code >= 95 && code <= 99) {
        return <CloudLightning className={`${className} text-purple-400`} />;
    }

    // Default icon
    return <HelpCircle className={`${className} text-slate-400`} />;
}
