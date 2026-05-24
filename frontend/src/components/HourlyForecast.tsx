'use client';

import React from 'react';
import { WeatherData } from '@/types/weather';
import WeatherIcon from '@/components/WeatherIcon';
import { Droplets } from 'lucide-react';

interface HourlyForecastProps { data: WeatherData; }

export default function HourlyForecast({ data }: HourlyForecastProps) {
    const hourly = data.hourly;
    const currentHour = new Date().getHours();
    const startIndex = hourly.time.findIndex(t => new Date(t).getHours() === currentHour) || 0;

    const items = Array.from({ length: 24 }, (_, i) => {
        const idx = startIndex + i;
        if (idx >= hourly.time.length) return null;
        return { time: hourly.time[idx], temp: hourly.temperature_2m[idx], code: hourly.weather_code[idx], rain: hourly.precipitation_probability[idx] };
    }).filter(Boolean) as { time: string; temp: number; code: number; rain: number }[];

    const fmtHour = (t: string) => {
        const h = new Date(t).getHours();
        return h === currentHour ? 'ตอนนี้' : `${String(h).padStart(2,'0')}:00`;
    };

    return (
        <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#f0f2f5]">พยากรณ์รายชั่วโมง</h3>
                <span className="text-xs text-[#4a5068]">24 ชม.</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
                {items.map((item, i) => {
                    const isNow = i === 0;
                    return (
                        <div key={i} className={`flex-shrink-0 flex flex-col items-center gap-2 px-3 py-3 rounded-2xl min-w-[72px] ${
                            isNow ? 'bg-[#4f8ef7]/10 border border-[#4f8ef7]/25' : 'hover:bg-[#1a1d26] transition-colors'
                        }`}>
                            <span className={`text-xs font-medium ${isNow ? 'text-[#7eb3ff]' : 'text-[#8b90a0]'}`}>{fmtHour(item.time)}</span>
                            <WeatherIcon code={item.code} className="w-6 h-6 select-none" />
                            <span className="text-sm font-semibold text-[#f0f2f5]">{Math.round(item.temp)}°</span>
                            {item.rain > 0 ? (
                                <span className="text-[10px] font-medium text-[#38bdf8] flex items-center gap-0.5">
                                    <Droplets className="w-2.5 h-2.5 text-[#38bdf8]" />
                                    {item.rain}%
                                </span>
                            ) : (
                                <span className="text-[10px] text-[#4a5068]">—</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
