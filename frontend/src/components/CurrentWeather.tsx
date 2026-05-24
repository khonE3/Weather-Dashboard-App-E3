'use client';

import React from 'react';
import { WeatherData, getWeatherInfo } from '@/types/weather';
import WeatherIcon from '@/components/WeatherIcon';
import { Droplets, Wind, CloudRain } from 'lucide-react';

interface CurrentWeatherProps { data: WeatherData; provinceName: string; }

export default function CurrentWeather({ data, provinceName }: CurrentWeatherProps) {
    const current = data.current;
    const weatherInfo = getWeatherInfo(current.weather_code);
    const temp = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);

    const formatTime = (t: string) => new Date(t).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
    const formatDate = (t: string) => new Date(t).toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const getTempPill = () => {
        if (temp >= 35) return { label: 'ร้อนจัด', cls: 'pill-red' };
        if (temp >= 29) return { label: 'ร้อน', cls: 'pill-amber' };
        if (temp >= 22) return { label: 'อบอุ่น', cls: 'pill-green' };
        return { label: 'เย็น', cls: 'pill-purple' };
    };
    const pill = getTempPill();

    const getMascotMessage = () => {
        const code = current.weather_code;
        if (code >= 51 && code <= 99) return 'ฝนตกแล้วจ้า อย่าลืมพกร่มเด้อ!';
        if (temp >= 35) return 'ร้อนตับแลบเลย! ทาครีมกันแดด และดื่มน้ำบ่อยๆ นะจ้า';
        if (temp >= 29) return 'อากาศร้อนพอสมควร หลบแดดหน่อยนะมนุษย์!';
        if (temp <= 22) return 'อากาศเย็นสบาย ใส่เสื้อกันหนาวไว้ด้วยนะจ้า';
        if (current.wind_speed_10m >= 20) return 'ลมแรงนะวันนี้ ระวังของปลิวด้วยเด้อ!';
        return 'อากาศดี เหมาะกับการออกไปข้างนอกมากเลย!';
    };

    return (
        <div className="card-accent p-6">
            {/* Header row */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h2 className="text-lg font-semibold text-[#f0f2f5]">{provinceName}</h2>
                    <p className="text-sm text-[#8b90a0] mt-0.5">{formatDate(current.time)} · {formatTime(current.time)} น.</p>
                </div>
                <span className={`pill ${pill.cls}`}>{pill.label}</span>
            </div>

            {/* Temp + Icon */}
            <div className="flex items-center gap-5 mb-5">
                <WeatherIcon code={current.weather_code} className="w-16 h-16 select-none" />
                <div>
                    <div className="flex items-start">
                        <span className="text-6xl font-bold tracking-tight text-[#f0f2f5]">{temp}</span>
                        <span className="text-2xl font-medium text-[#8b90a0] mt-2 ml-1">°C</span>
                    </div>
                    <p className="text-sm text-[#8b90a0]">รู้สึกเหมือน <span className="text-[#f0f2f5] font-medium">{feelsLike}°</span></p>
                    <p className="text-sm text-[#8b90a0] mt-0.5">{weatherInfo.description}</p>
                </div>
            </div>

            <hr className="divider mb-4" />

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                    { label: 'ความชื้น', value: `${current.relative_humidity_2m}%`, icon: <Droplets className="w-5 h-5 text-sky-400" /> },
                    { label: 'ความเร็วลม', value: `${Math.round(current.wind_speed_10m)} km/h`, icon: <Wind className="w-5 h-5 text-teal-400" /> },
                    { label: 'ปริมาณฝน', value: `${current.precipitation} mm`, icon: <CloudRain className="w-5 h-5 text-blue-400" /> },
                ].map((s) => (
                    <div key={s.label} className="bg-[#1a1d26] rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-1.5">
                        <div>{s.icon}</div>
                        <div className="text-sm font-semibold text-[#f0f2f5]">{s.value}</div>
                        <div className="text-xs text-[#4a5068] mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Mascot speech bubble */}
            <div className="flex items-start gap-3 bg-[#1a1d26] rounded-2xl p-3.5">
                <span className="text-2xl select-none flex-shrink-0">🐕</span>
                <p className="text-sm text-[#8b90a0] leading-relaxed">{getMascotMessage()}</p>
            </div>
        </div>
    );
}
