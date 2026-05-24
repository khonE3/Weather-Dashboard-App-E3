import { WeatherData } from '@/types/weather';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
    // Use Open-Meteo API directly for simplicity (no API key needed)
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'is_day',
            'precipitation',
            'rain',
            'weather_code',
            'cloud_cover',
            'pressure_msl',
            'surface_pressure',
            'wind_speed_10m',
            'wind_direction_10m',
            'wind_gusts_10m'
        ].join(','),
        hourly: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'precipitation_probability',
            'precipitation',
            'weather_code',
            'visibility',
            'wind_speed_10m',
            'uv_index'
        ].join(','),
        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'apparent_temperature_max',
            'apparent_temperature_min',
            'sunrise',
            'sunset',
            'uv_index_max',
            'precipitation_sum',
            'precipitation_probability_max',
            'wind_speed_10m_max'
        ].join(','),
        timezone: 'Asia/Bangkok',
        forecast_days: '7'
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    return response.json();
}

export async function searchProvinces(query: string) {
    // Use local provinces data
    const { provinces } = await import('@/data/provinces');

    const normalizedQuery = query.toLowerCase().trim();

    return provinces.filter(p =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.name_en?.toLowerCase().includes(normalizedQuery)
    ).slice(0, 10);
}

export function findNearestProvince(lat: number, lon: number) {
    // Import dynamically or directly? Since this runs on client, we can import provinces
    // Let's use standard import for provinces inside or dynamically
    // To avoid dependency cycles or heavy initial bundle, import dynamically is fine but since it is a client action, we can require/import
    // Let's define the provinces data import locally
    const { provinces } = require('@/data/provinces');
    
    let nearest = provinces[0];
    let minDistance = Infinity;

    for (const province of provinces) {
        const dLat = province.lat - lat;
        const dLon = province.lon - lon;
        const distance = dLat * dLat + dLon * dLon;
        if (distance < minDistance) {
            minDistance = distance;
            nearest = province;
        }
    }
    return nearest;
}
