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
import { fetchWeather, findNearestProvince } from '@/lib/api';
import { CloudSun } from 'lucide-react';

export default function Home() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [isRaining, setIsRaining] = useState(false);
    const [hasCheckedLocal, setHasCheckedLocal] = useState(false);

    const loadWeather = useCallback(async (lat: number, lon: number, provinceName?: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchWeather(lat, lon);
            setWeather(data);
            const nameToSet = provinceName || 'ตำแหน่งปัจจุบัน';
            const updatedProvince = { name: nameToSet, lat, lon };
            setSelectedProvince(updatedProvince);
            if (provinceName && provinceName !== 'ตำแหน่งปัจจุบัน') {
                localStorage.setItem('last_province', JSON.stringify(updatedProvince));
            }
            const code = data.current?.weather_code;
            setIsRaining(code >= 51 && code <= 99);
        } catch (err) {
            setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('last_province');
            if (saved) {
                try {
                    const p = JSON.parse(saved) as Province;
                    loadWeather(p.lat, p.lon, p.name);
                } catch { /* ignore */ }
            }
            setHasCheckedLocal(true);
        }
    }, [loadWeather]);

    const handleGPSSuccess = (lat: number, lon: number) => {
        const nearest = findNearestProvince(lat, lon);
        loadWeather(lat, lon, nearest.name);
    };
    const handleProvinceSelect = (p: Province) => {
        setSelectedProvince(p);
        loadWeather(p.lat, p.lon, p.name);
    };

    return (
        <div className="min-h-screen text-[#e8edf5]">
            {isRaining && <RainEffect />}

            {/* Top Nav Bar */}
            <nav className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#05070d]/75 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
                    <Header />
                    <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1">
                            <SearchBar onSelect={handleProvinceSelect} />
                        </div>
                        <GPSButton onSuccess={handleGPSSuccess} />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                {loading && <LoadingSpinner />}

                {error && (
                    <div className="card p-4 mb-6 border-red-500/20 bg-red-500/5 animate-fade-in">
                        <p className="text-red-400 text-sm font-medium text-center">{error}</p>
                    </div>
                )}

                {weather && !loading && (
                    <div className="space-y-4 animate-slide-up">
                        <CurrentWeather data={weather} provinceName={selectedProvince?.name || 'ไม่ระบุ'} />
                        <WeatherDetails data={weather} />
                        <HourlyForecast data={weather} />
                        <DailyForecast data={weather} />
                    </div>
                )}

                {!weather && !loading && !error && hasCheckedLocal && (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                        <CloudSun className="w-20 h-20 text-[#4f8ef7]/40 mb-6 select-none" />
                        <h2 className="text-xl font-semibold text-[#f0f2f5] mb-2">เลือกจังหวัดเพื่อดูสภาพอากาศ</h2>
                        <p className="text-[#8b90a0] text-sm mb-8">ค้นหาจังหวัด หรือกดปุ่ม GPS เพื่อใช้ตำแหน่งปัจจุบัน</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                { name: 'หนองบัวลำภู', lat: 17.2216, lon: 102.4260 },
                                { name: 'กรุงเทพมหานคร', lat: 13.7563, lon: 100.5018 },
                                { name: 'เชียงใหม่', lat: 18.7883, lon: 98.9853 },
                                { name: 'ภูเก็ต', lat: 7.8804, lon: 98.3923 },
                                { name: 'ขอนแก่น', lat: 16.4419, lon: 102.8360 },
                            ].map((p) => (
                                <button
                                    key={p.name}
                                    onClick={() => handleProvinceSelect(p)}
                                    className="btn-ghost px-4 py-2 text-sm"
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <footer className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 mt-4">
                <hr className="divider mb-6" />
                <div className="flex items-center justify-between text-xs text-[#4a5068]">
                    <span>พยากรณ์อากาศ 77 จังหวัด · {selectedProvince?.name || 'หนองบัวลำภู'}</span>
                    <span>Open-Meteo API</span>
                </div>
            </footer>
        </div>
    );
}
