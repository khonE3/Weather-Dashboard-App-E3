'use client';

import React from 'react';
import { WeatherData, getWeatherInfo } from '@/types/weather';

interface DailyForecastProps {
    data: WeatherData;
}

export default function DailyForecast({ data }: DailyForecastProps) {
    const daily = data.daily;

    const formatDay = (timeString: string, index: number) => {
        if (index === 0) return 'วันนี้';
        if (index === 1) return 'พรุ่งนี้';

        const date = new Date(timeString);
        return date.toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric', month: 'short' });
    };

    const formatTime = (timeString: string) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div className="glass-card p-4">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>📅</span>
                <span>พยากรณ์ 7 วัน</span>
            </h3>

            <div className="space-y-2">
                {daily.time.map((time, index) => {
                    const weatherInfo = getWeatherInfo(daily.weather_code[index]);
                    const isToday = index === 0;

                    return (
                        <div
                            key={index}
                            className={`
                flex items-center justify-between p-3 rounded-xl
                transition-all duration-300 hover:bg-white/10
                ${isToday ? 'bg-isan-gold/20' : 'bg-white/5'}
              `}
                        >
                            {/* Day */}
                            <div className="w-20 font-medium">
                                {formatDay(time, index)}
                            </div>

                            {/* Weather Icon & Precipitation */}
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{weatherInfo.icon}</span>
                                {daily.precipitation_probability_max[index] > 0 && (
                                    <span className="text-xs text-blue-300">
                                        💧{daily.precipitation_probability_max[index]}%
                                    </span>
                                )}
                            </div>

                            {/* Temperature Range */}
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-blue-300">
                                    {Math.round(daily.temperature_2m_min[index])}°
                                </span>
                                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full" />
                                <span className="text-orange-300">
                                    {Math.round(daily.temperature_2m_max[index])}°
                                </span>
                            </div>

                            {/* Sunrise/Sunset (hidden on mobile) */}
                            <div className="hidden sm:flex items-center gap-3 text-xs text-white/60">
                                <span>🌅 {formatTime(daily.sunrise[index])}</span>
                                <span>🌇 {formatTime(daily.sunset[index])}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
