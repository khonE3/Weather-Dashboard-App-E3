'use client';

import React from 'react';
import { WeatherData } from '@/types/weather';
import { Sun, Wind, Droplets, Compass, Eye, Cloud, Sunrise, Sunset } from 'lucide-react';

interface WeatherDetailsProps { data: WeatherData; }

export default function WeatherDetails({ data }: WeatherDetailsProps) {
    const current = data.current;
    const hourly = data.hourly;
    const daily = data.daily;
    const h = new Date().getHours();
    const uvIndex = hourly.uv_index?.[h] || 0;
    const visibility = hourly.visibility?.[h] || 0;

    const getUVPill = (uv: number) => {
        if (uv <= 2) return { label: `UV ${uv.toFixed(1)} · ต่ำ`, cls: 'pill-green' };
        if (uv <= 5) return { label: `UV ${uv.toFixed(1)} · ปานกลาง`, cls: 'pill-amber' };
        if (uv <= 7) return { label: `UV ${uv.toFixed(1)} · สูง`, cls: 'pill-amber' };
        if (uv <= 10) return { label: `UV ${uv.toFixed(1)} · สูงมาก`, cls: 'pill-red' };
        return { label: `UV ${uv.toFixed(1)} · รุนแรง`, cls: 'pill-red' };
    };

    const windDir = (deg: number) => ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg/45)%8];

    const cards = [
        { icon: <Sun className="w-5 h-5 text-amber-400" />, label: 'UV Index', value: getUVPill(uvIndex).label.split(' · ')[0], sub: getUVPill(uvIndex).label.split(' · ')[1] },
        { icon: <Wind className="w-5 h-5 text-teal-400" />, label: 'ลม', value: `${Math.round(current.wind_speed_10m)} km/h`, sub: windDir(current.wind_direction_10m) },
        { icon: <Droplets className="w-5 h-5 text-sky-400" />, label: 'ความชื้น', value: `${current.relative_humidity_2m}%`, sub: current.relative_humidity_2m > 70 ? 'ชื้น' : current.relative_humidity_2m > 40 ? 'ปกติ' : 'แห้ง' },
        { icon: <Compass className="w-5 h-5 text-rose-400" />, label: 'ความกดอากาศ', value: `${Math.round(current.pressure_msl)}`, sub: 'hPa' },
        { icon: <Eye className="w-5 h-5 text-purple-400" />, label: 'ทัศนวิสัย', value: visibility >= 10000 ? `${(visibility/1000).toFixed(0)} km` : `${visibility} m`, sub: visibility >= 10000 ? 'ดีมาก' : 'จำกัด' },
        { icon: <Cloud className="w-5 h-5 text-slate-400" />, label: 'เมฆปกคลุม', value: `${current.cloud_cover}%`, sub: current.cloud_cover > 80 ? 'ครึ้ม' : current.cloud_cover > 40 ? 'มีเมฆ' : 'ท้องฟ้าโปร่ง' },
        { icon: <Sunrise className="w-5 h-5 text-amber-500" />, label: 'พระอาทิตย์ขึ้น', value: new Date(daily.sunrise[0]).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit',hour12:false}), sub: 'น.' },
        { icon: <Sunset className="w-5 h-5 text-orange-500" />, label: 'พระอาทิตย์ตก', value: new Date(daily.sunset[0]).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit',hour12:false}), sub: 'น.' },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cards.map((c, i) => (
                <div key={i} className="card card-hover p-4 flex flex-col gap-1">
                    <div className="flex-shrink-0">{c.icon}</div>
                    <span className="text-xs text-[#4a5068] font-medium mt-1">{c.label}</span>
                    <span className="text-base font-semibold text-[#f0f2f5]">{c.value}</span>
                    <span className="text-xs text-[#8b90a0]">{c.sub}</span>
                </div>
            ))}
        </div>
    );
}
