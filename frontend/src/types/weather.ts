export interface Province {
    name: string;
    lat: number;
    lon: number;
    name_en?: string;
}

export interface CurrentWeatherData {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    weather_code: number;
    cloud_cover: number;
    pressure_msl: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
}

export interface HourlyData {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    precipitation: number[];
    weather_code: number[];
    visibility: number[];
    wind_speed_10m: number[];
    uv_index: number[];
}

export interface DailyData {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
}

export interface WeatherData {
    latitude: number;
    longitude: number;
    timezone: string;
    current: CurrentWeatherData;
    hourly: HourlyData;
    daily: DailyData;
}

// Weather code descriptions in Thai
export const weatherCodeDescriptions: Record<number, { description: string; icon: string }> = {
    0: { description: 'ท้องฟ้าใส', icon: '☀️' },
    1: { description: 'ส่วนใหญ่ใส', icon: '🌤️' },
    2: { description: 'มีเมฆบางส่วน', icon: '⛅' },
    3: { description: 'มีเมฆมาก', icon: '☁️' },
    45: { description: 'มีหมอก', icon: '🌫️' },
    48: { description: 'หมอกลงน้ำค้าง', icon: '🌫️' },
    51: { description: 'ฝนปรอยเบา', icon: '🌧️' },
    53: { description: 'ฝนปรอยปานกลาง', icon: '🌧️' },
    55: { description: 'ฝนปรอยหนัก', icon: '🌧️' },
    56: { description: 'ฝนเยือกแข็งเบา', icon: '🌧️' },
    57: { description: 'ฝนเยือกแข็งหนัก', icon: '🌧️' },
    61: { description: 'ฝนเบา', icon: '🌧️' },
    63: { description: 'ฝนปานกลาง', icon: '🌧️' },
    65: { description: 'ฝนหนัก', icon: '🌧️' },
    66: { description: 'ฝนเยือกแข็งเบา', icon: '🌧️' },
    67: { description: 'ฝนเยือกแข็งหนัก', icon: '🌧️' },
    71: { description: 'หิมะเบา', icon: '🌨️' },
    73: { description: 'หิมะปานกลาง', icon: '🌨️' },
    75: { description: 'หิมะหนัก', icon: '🌨️' },
    77: { description: 'ลูกเห็บ', icon: '🌨️' },
    80: { description: 'ฝนตกเป็นพักๆ เบา', icon: '🌦️' },
    81: { description: 'ฝนตกเป็นพักๆ ปานกลาง', icon: '🌦️' },
    82: { description: 'ฝนตกเป็นพักๆ หนัก', icon: '🌦️' },
    85: { description: 'หิมะเบา', icon: '🌨️' },
    86: { description: 'หิมะหนัก', icon: '🌨️' },
    95: { description: 'พายุฝนฟ้าคะนอง', icon: '⛈️' },
    96: { description: 'พายุฝนฟ้าคะนองกับลูกเห็บเบา', icon: '⛈️' },
    99: { description: 'พายุฝนฟ้าคะนองกับลูกเห็บหนัก', icon: '⛈️' },
};

export const getWeatherInfo = (code: number) => {
    return weatherCodeDescriptions[code] || { description: 'ไม่ทราบ', icon: '❓' };
};
