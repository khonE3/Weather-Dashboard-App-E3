'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import GPSButton from '@/components/GPSButton';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import DailyForecast from '@/components/DailyForecast';
import WeatherDetails from '@/components/WeatherDetails';
import RainEffect from '@/components/RainEffect';
import LoadingSpinner from '@/components/LoadingSpinner';
import { WeatherData, Province } from '@/types/weather';
import { fetchWeather } from '@/lib/api';

export default function Home() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [isRaining, setIsRaining] = useState(false);

    const loadWeather = useCallback(async (lat: number, lon: number, provinceName?: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWeather(lat, lon);
            setWeather(data);
            if (provinceName) {
                setSelectedProvince({ name: provinceName, lat, lon });
            }
            // Check if it's raining
            const currentWeatherCode = data.current?.weather_code;
            setIsRaining(currentWeatherCode >= 51 && currentWeatherCode <= 99);
        } catch (err) {
            setError('ไม่สามารถโหลดข้อมูลสภาพอากาศได้ กรุณาลองใหม่อีกครั้ง');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGPSSuccess = (lat: number, lon: number) => {
        loadWeather(lat, lon, 'ตำแหน่งปัจจุบัน');
    };

    const handleProvinceSelect = (province: Province) => {
        setSelectedProvince(province);
        loadWeather(province.lat, province.lon, province.name);
    };

    // Get temperature class for background
    const getTempClass = () => {
        if (!weather?.current?.temperature_2m) return '';
        const temp = weather.current.temperature_2m;
        if (temp >= 35) return 'temp-hot';
        if (temp >= 28) return 'temp-warm';
        if (temp >= 20) return 'temp-cool';
        return 'temp-cold';
    };

    return (
        <div className={`min-h-screen transition-all duration-1000 ${getTempClass()}`}>
            {/* Rain Effect */}
            {isRaining && <RainEffect />}

            <div className="container mx-auto px-4 py-6 max-w-4xl">
                {/* Header with Mascot */}
                <Header />

                {/* Search and GPS */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in">
                    <div className="flex-1">
                        <SearchBar onSelect={handleProvinceSelect} />
                    </div>
                    <GPSButton onSuccess={handleGPSSuccess} />
                </div>

                {/* Loading State */}
                {loading && <LoadingSpinner />}

                {/* Error State */}
                {error && (
                    <div className="glass-card p-4 mb-6 text-center animate-fade-in">
                        <p className="text-red-200">❌ {error}</p>
                    </div>
                )}

                {/* Weather Content */}
                {weather && !loading && (
                    <div className="space-y-6 animate-slide-up">
                        {/* Current Weather */}
                        <CurrentWeather
                            data={weather}
                            provinceName={selectedProvince?.name || 'ไม่ทราบตำแหน่ง'}
                        />

                        {/* Weather Details Grid */}
                        <WeatherDetails data={weather} />

                        {/* Hourly Forecast */}
                        <HourlyForecast data={weather} />

                        {/* Daily Forecast */}
                        <DailyForecast data={weather} />
                    </div>
                )}

                {/* Initial State - No Weather Loaded */}
                {!weather && !loading && !error && (
                    <div className="glass-card p-8 text-center animate-fade-in">
                        <div className="text-6xl mb-4">🌤️</div>
                        <h2 className="text-2xl font-bold mb-2 text-shadow">ยินดีต้อนรับสู่พยากรณ์อากาศอีสาน</h2>
                        <p className="text-white/80 mb-4">
                            เลือกจังหวัดหรือใช้ GPS เพื่อดูสภาพอากาศ
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => handleProvinceSelect({ name: 'หนองบัวลำภู', lat: 17.2216, lon: 102.4260 })}
                                className="px-4 py-2 bg-isan-gold/30 hover:bg-isan-gold/50 rounded-full transition-all"
                            >
                                🏠 หนองบัวลำภู
                            </button>
                            <button
                                onClick={() => handleProvinceSelect({ name: 'กรุงเทพมหานคร', lat: 13.7563, lon: 100.5018 })}
                                className="px-4 py-2 bg-isan-gold/30 hover:bg-isan-gold/50 rounded-full transition-all"
                            >
                                🏙️ กรุงเทพฯ
                            </button>
                            <button
                                onClick={() => handleProvinceSelect({ name: 'เชียงใหม่', lat: 18.7883, lon: 98.9853 })}
                                className="px-4 py-2 bg-isan-gold/30 hover:bg-isan-gold/50 rounded-full transition-all"
                            >
                                ⛰️ เชียงใหม่
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-8 text-center text-white/60 text-sm">
                    <p>🐕 พยากรณ์อากาศอีสาน หนองบัวลำภู</p>
                    <p>ข้อมูลจาก Open-Meteo API • อัปเดตแบบเรียลไทม์</p>
                </footer>
            </div>
        </div>
    );
}
