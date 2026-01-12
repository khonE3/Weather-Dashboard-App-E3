# 🌤️ Weather Dashboard App - หนองบัวลำภู

แอปพยากรณ์อากาศประเทศไทย ธีมอีสาน หนองบัวลำภู พร้อมมาสคอตหมาน้อย 🐕

![Isan Theme](https://img.shields.io/badge/Theme-Isan%20อีสาน-green)
![NextJS](https://img.shields.io/badge/Frontend-NextJS%2014-black)
![NestJS](https://img.shields.io/badge/Backend-NestJS-red)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-blue)

## ✨ Features

- 📍 **GPS Geolocation** - ใช้ตำแหน่งปัจจุบันของคุณ
- 🔍 **ค้นหาจังหวัด** - รองรับทั้ง 77 จังหวัดในประเทศไทย
- 🌡️ **สภาพอากาศแบบ Real-time** - ข้อมูลจาก Open-Meteo API
- 📱 **Responsive Design** - รองรับทุกขนาดหน้าจอ
- 🎨 **ธีมอีสาน** - สีสันและอนิเมชั่นสไตล์หนองบัวลำภู

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | NextJS 14 + Tailwind CSS |
| Backend | NestJS |
| Weather API | [Open-Meteo](https://open-meteo.com/) (ฟรี) |
| Package Manager | Bun |

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Weather-Dashboard-App-E3

# Install Frontend dependencies
cd frontend
bun install

# Install Backend dependencies
cd ../backend
bun install
```

### Running the App

**Terminal 1 - Backend:**
```bash
cd backend
bun run dev
# API runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
bun run dev
# App runs on http://localhost:3000
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather?lat=&lon=` | ข้อมูลสภาพอากาศ |
| GET | `/api/provinces` | รายชื่อจังหวัดทั้งหมด |
| GET | `/api/provinces/search?q=` | ค้นหาจังหวัด |

## 🌡️ Weather Data

ข้อมูลที่แสดง:
- อุณหภูมิปัจจุบัน + รู้สึกเหมือน
- พยากรณ์รายชั่วโมง (24 ชม.)
- พยากรณ์รายวัน (7 วัน)
- ความชื้น, ลม, UV Index
- ความกดอากาศ, ทัศนวิสัย
- พระอาทิตย์ขึ้น/ตก

## 🎨 Isan Theme

สีหลัก:
- 🌲 เขียวป่า `#2D5016`
- 🏺 น้ำตาลดิน `#8B4513`
- ✨ ทอง `#DAA520`
- 🧱 ส้มอิฐ `#CD5C5C`

อนิเมชั่น:
- ☁️ เมฆลอย
- 🌧️ ฝนตก (เมื่อฝนตก)
- 🌾 ทุ่งนาไหว
- 🐕 มาสคอตหมา

## 📁 Project Structure

```
Weather-Dashboard-App-E3/
├── frontend/                 # NextJS Frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── data/            # Thai provinces data
│   │   ├── lib/             # API utilities
│   │   └── types/           # TypeScript types
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                  # NestJS Backend
│   ├── src/
│   │   ├── weather/         # Weather module
│   │   ├── provinces/       # Provinces module
│   │   └── main.ts
│   └── package.json
│
└── README.md
```

## 📝 License

MIT License

---

🐕 Made with ❤️ from หนองบัวลำภู, อีสาน
