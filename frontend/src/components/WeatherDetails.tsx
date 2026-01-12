'use client';

import React from 'react';
import { WeatherData } from '@/types/weather';

interface WeatherDetailsProps {
    data: WeatherData;
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
    const current = data.current;
    const hourly = data.hourly;
    const daily = data.daily;

    // Get current hour index for UV
    const currentHour = new Date().getHours();
    const uvIndex = hourly.uv_index?.[currentHour] || 0;

    // Get visibility from current hour
    const visibility = hourly.visibility?.[currentHour] || 0;

    const getUVLevel = (uv: number) => {
        if (uv <= 2) return { level: 'ต่ำ', color: 'text-green-400', advice: 'ปลอดภัย' };
        if (uv <= 5) return { level: 'ปานกลาง', color: 'text-yellow-400', advice: 'ทาครีมกันแดด' };
        if (uv <= 7) return { level: 'สูง', color: 'text-orange-400', advice: 'หลีกเลี่ยงแดดจัด' };
        if (uv <= 10) return { level: 'สูงมาก', color: 'text-red-400', advice: 'ระวังผิวไหม้' };
        return { level: 'รุนแรง', color: 'text-purple-400', advice: 'งดกิจกรรมกลางแจ้ง' };
    };

    const getWindDirection = (degrees: number) => {
        const directions = ['เหนือ', 'ตะวันออกเฉียงเหนือ', 'ตะวันออก', 'ตะวันออกเฉียงใต้', 'ใต้', 'ตะวันตกเฉียงใต้', 'ตะวันตก', 'ตะวันตกเฉียงเหนือ'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    };

    const uvInfo = getUVLevel(uvIndex);

    const detailCards = [
        {
            icon: '☀️',
            title: 'UV Index',
            value: uvIndex.toFixed(1),
            subtitle: uvInfo.level,
            extra: uvInfo.advice,
            colorClass: uvInfo.color,
        },
        {
            icon: '💨',
            title: 'ลม',
            value: `${Math.round(current.wind_speed_10m)} km/h`,
            subtitle: getWindDirection(current.wind_direction_10m),
            extra: `กระโชก ${Math.round(current.wind_gusts_10m)} km/h`,
        },
        {
            icon: '💧',
            title: 'ความชื้น',
            value: `${current.relative_humidity_2m}%`,
            subtitle: current.relative_humidity_2m > 70 ? 'ชื้นมาก' : current.relative_humidity_2m > 40 ? 'ปกติ' : 'แห้ง',
            extra: `จุดน้ำค้าง ${Math.round(current.apparent_temperature - current.temperature_2m + current.temperature_2m)}°`,
        },
        {
            icon: '🌡️',
            title: 'ความกดอากาศ',
            value: `${Math.round(current.pressure_msl)} hPa`,
            subtitle: current.pressure_msl > 1013 ? 'สูง' : 'ต่ำ',
            extra: `พื้นผิว ${Math.round(current.surface_pressure)} hPa`,
        },
        {
            icon: '👁️',
            title: 'ทัศนวิสัย',
            value: visibility >= 10000 ? `${(visibility / 1000).toFixed(0)} km` : `${visibility} m`,
            subtitle: visibility >= 10000 ? 'ดีมาก' : visibility >= 5000 ? 'ดี' : 'จำกัด',
            extra: '',
        },
        {
            icon: '☁️',
            title: 'ปกคลุมเมฆ',
            value: `${current.cloud_cover}%`,
            subtitle: current.cloud_cover > 80 ? 'มืดครึ้ม' : current.cloud_cover > 50 ? 'มีเมฆมาก' : current.cloud_cover > 20 ? 'มีเมฆบางส่วน' : 'ท้องฟ้าใส',
            extra: '',
        },
        {
            icon: '🌅',
            title: 'พระอาทิตย์ขึ้น',
            value: new Date(daily.sunrise[0]).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false }),
            subtitle: 'เช้า',
            extra: '',
        },
        {
            icon: '🌇',
            title: 'พระอาทิตย์ตก',
            value: new Date(daily.sunset[0]).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false }),
            subtitle: 'เย็น',
            extra: '',
        },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {detailCards.map((card, index) => (
                <div
                    key={index}
                    className="glass-card p-4 text-center hover:scale-105 transition-transform duration-300"
                >
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <div className="text-xs text-white/60 mb-1">{card.title}</div>
                    <div className={`text-lg font-bold ${card.colorClass || ''}`}>
                        {card.value}
                    </div>
                    <div className="text-xs text-white/70">{card.subtitle}</div>
                    {card.extra && (
                        <div className="text-xs text-white/50 mt-1">{card.extra}</div>
                    )}
                </div>
            ))}
        </div>
    );
}
