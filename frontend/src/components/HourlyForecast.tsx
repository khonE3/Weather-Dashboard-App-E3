'use client';

import React from 'react';
import { WeatherData, getWeatherInfo } from '@/types/weather';

interface HourlyForecastProps {
    data: WeatherData;
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
    const hourly = data.hourly;

    // Get next 24 hours starting from current hour
    const currentHour = new Date().getHours();
    const startIndex = hourly.time.findIndex(t => {
        const hour = new Date(t).getHours();
        return hour === currentHour;
    }) || 0;

    const next24Hours = Array.from({ length: 24 }, (_, i) => {
        const index = startIndex + i;
        if (index >= hourly.time.length) return null;
        return {
            time: hourly.time[index],
            temp: hourly.temperature_2m[index],
            weatherCode: hourly.weather_code[index],
            precipitation: hourly.precipitation_probability[index],
        };
    }).filter(Boolean);

    const formatHour = (timeString: string) => {
        const date = new Date(timeString);
        const hour = date.getHours();
        if (hour === new Date().getHours()) return 'ตอนนี้';
        return `${hour.toString().padStart(2, '0')}:00`;
    };

    return (
        <div className="glass-card p-4">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>🕐</span>
                <span>พยากรณ์รายชั่วโมง</span>
            </h3>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {next24Hours.map((hour, index) => {
                    if (!hour) return null;
                    const weatherInfo = getWeatherInfo(hour.weatherCode);
                    const isNow = index === 0;

                    return (
                        <div
                            key={index}
                            className={`
                flex-shrink-0 flex flex-col items-center p-3 rounded-xl min-w-[70px]
                transition-all duration-300 hover:scale-105
                ${isNow ? 'bg-isan-gold/30 ring-2 ring-isan-gold' : 'bg-white/10'}
              `}
                        >
                            <div className="text-xs text-white/70 mb-1">
                                {formatHour(hour.time)}
                            </div>
                            <div className="text-2xl my-1">
                                {weatherInfo.icon}
                            </div>
                            <div className="font-bold">
                                {Math.round(hour.temp)}°
                            </div>
                            {hour.precipitation > 0 && (
                                <div className="text-xs text-blue-300 mt-1">
                                    💧 {hour.precipitation}%
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
