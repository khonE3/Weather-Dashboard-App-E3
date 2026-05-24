'use client';

import React from 'react';
import { WeatherData } from '@/types/weather';
import WeatherIcon from '@/components/WeatherIcon';
import { Droplets, Sunrise, Sunset } from 'lucide-react';

interface DailyForecastProps { data: WeatherData; }

export default function DailyForecast({ data }: DailyForecastProps) {
    const daily = data.daily;

    const fmtDay = (t: string, i: number) => {
        if (i === 0) return 'วันนี้';
        if (i === 1) return 'พรุ่งนี้';
        return new Date(t).toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric', month: 'short' });
    };
    const fmtTime = (t: string) => new Date(t).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });

    return (
        <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#f0f2f5]">พยากรณ์ 7 วัน</h3>
            </div>
            <div className="space-y-1">
                {daily.time.map((t, i) => {
                    const isToday = i === 0;
                    return (
                        <div key={i} className={`flex items-center px-3 py-3 rounded-xl transition-colors hover:bg-[#1a1d26] ${
                            isToday ? 'bg-[#4f8ef7]/06' : ''
                        }`}>
                            <span className={`w-24 text-sm font-medium ${isToday ? 'text-[#7eb3ff]' : 'text-[#f0f2f5]'}`}>{fmtDay(t, i)}</span>
                            <div className="flex items-center gap-2 w-20">
                                <WeatherIcon code={daily.weather_code[i]} className="w-6 h-6 select-none" />
                                {daily.precipitation_probability_max[i] > 0 && (
                                    <span className="text-[10px] font-bold text-[#38bdf8] flex items-center gap-0.5">
                                        <Droplets className="w-2.5 h-2.5 text-[#38bdf8]" />
                                        {daily.precipitation_probability_max[i]}%
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 flex items-center justify-end gap-3">
                                <span className="text-sm font-medium text-[#38bdf8]">{Math.round(daily.temperature_2m_min[i])}°</span>
                                <div className="w-14 h-1 bg-gradient-to-r from-[#38bdf8] to-[#f59e0b] rounded-full" />
                                <span className="text-sm font-medium text-[#f59e0b]">{Math.round(daily.temperature_2m_max[i])}°</span>
                            </div>
                            <div className="hidden md:flex items-center gap-3 ml-4 text-xs text-[#4a5068]">
                                <span className="flex items-center gap-1"><Sunrise className="w-3.5 h-3.5 text-amber-500" /> {fmtTime(daily.sunrise[i])}</span>
                                <span className="flex items-center gap-1"><Sunset className="w-3.5 h-3.5 text-orange-500" /> {fmtTime(daily.sunset[i])}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
