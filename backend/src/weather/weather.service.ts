import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class WeatherService {
    private readonly OPEN_METEO_API = 'https://api.open-meteo.com/v1/forecast';

    async getWeather(latitude: number, longitude: number) {
        const params = new URLSearchParams({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
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
                'wind_gusts_10m',
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
                'uv_index',
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
                'wind_speed_10m_max',
            ].join(','),
            timezone: 'Asia/Bangkok',
            forecast_days: '7',
        });

        try {
            const response = await fetch(`${this.OPEN_METEO_API}?${params}`);

            if (!response.ok) {
                throw new HttpException(
                    'Failed to fetch weather data from Open-Meteo',
                    HttpStatus.BAD_GATEWAY,
                );
            }

            return response.json();
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Weather service is temporarily unavailable',
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
}
