'use client';

import React from 'react';
import { WeatherData, getWeatherInfo } from '@/types/weather';

interface CurrentWeatherProps {
    data: WeatherData;
    provinceName: string;
}

export default function CurrentWeather({ data, provinceName }: CurrentWeatherProps) {
    const current = data.current;
    const weatherInfo = getWeatherInfo(current.weather_code);

    const formatTime = (timeString: string) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDate = (timeString: string) => {
        const date = new Date(timeString);
        return date.toLocaleDateString('th-TH', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="glass-card p-6 text-center">
            {/* Location & Time */}
            <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-shadow flex items-center justify-center gap-2">
                    <span>📍</span>
                    <span>{provinceName}</span>
                </h2>
                <p className="text-white/70 text-sm mt-1">
                    {formatDate(current.time)} • {formatTime(current.time)}
                </p>
            </div>

            {/* Main Temperature Display */}
            <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-6xl sm:text-7xl">{weatherInfo.icon}</span>
                <div>
                    <div className="text-5xl sm:text-6xl font-bold text-shadow">
                        {Math.round(current.temperature_2m)}°
                    </div>
                    <div className="text-white/80">
                        รู้สึกเหมือน {Math.round(current.apparent_temperature)}°
                    </div>
                </div>
            </div>

            {/* Weather Description */}
            <div className="text-lg font-medium mb-4">
                {weatherInfo.description}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl">💧</div>
                    <div className="font-medium">{current.relative_humidity_2m}%</div>
                    <div className="text-white/60 text-xs">ความชื้น</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl">💨</div>
                    <div className="font-medium">{Math.round(current.wind_speed_10m)} km/h</div>
                    <div className="text-white/60 text-xs">ความเร็วลม</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl">🌧️</div>
                    <div className="font-medium">{current.precipitation} mm</div>
                    <div className="text-white/60 text-xs">ปริมาณฝน</div>
                </div>
            </div>
        </div>
    );
}
