'use client';

import React from 'react';

export default function MountainBackground() {
    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMax slice"
                className="w-full h-full"
            >
                <defs>
                    {/* Sky gradient – deep night, subtle teal at horizon */}
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#05070d" />
                        <stop offset="45%"  stopColor="#080e1a" />
                        <stop offset="78%"  stopColor="#0c1524" />
                        <stop offset="100%" stopColor="#0e1c2e" />
                    </linearGradient>

                    {/* Moonlight glow at ridge */}
                    <radialGradient id="moonGlow" cx="72%" cy="38%" r="22%">
                        <stop offset="0%"   stopColor="rgba(180,210,255,0.13)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>

                    {/* Horizon atmospheric glow */}
                    <radialGradient id="horizonGlow" cx="50%" cy="0%" r="100%">
                        <stop offset="0%"   stopColor="rgba(56,120,200,0.09)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>

                    {/* Mountain gradients – each slightly lighter/different hue */}
                    <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#0e1e32" />
                        <stop offset="100%" stopColor="#0a1622" />
                    </linearGradient>
                    <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#0b1828" />
                        <stop offset="100%" stopColor="#08111c" />
                    </linearGradient>
                    <linearGradient id="mtn3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#091220" />
                        <stop offset="100%" stopColor="#060c14" />
                    </linearGradient>
                    <linearGradient id="mtn4" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#070d18" />
                        <stop offset="100%" stopColor="#040810" />
                    </linearGradient>
                    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#050910" />
                        <stop offset="100%" stopColor="#030609" />
                    </linearGradient>

                    {/* Moon glow circle */}
                    <radialGradient id="moonBody" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor="rgba(220,235,255,0.92)" />
                        <stop offset="60%"  stopColor="rgba(190,215,255,0.70)" />
                        <stop offset="100%" stopColor="rgba(150,190,255,0)" />
                    </radialGradient>

                    {/* Subtle fog/mist between layers */}
                    <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="rgba(18,40,75,0)" />
                        <stop offset="50%"  stopColor="rgba(18,40,75,0.06)" />
                        <stop offset="100%" stopColor="rgba(18,40,75,0)" />
                    </linearGradient>
                </defs>

                {/* ── Sky ──────────────────────────────────────────── */}
                <rect width="1440" height="900" fill="url(#skyGrad)" />

                {/* ── Stars (scattered dots) ───────────────────────── */}
                {[
                    [72,38],[130,55],[210,28],[310,70],[415,42],[520,19],[630,60],[720,33],
                    [810,50],[920,25],[1040,65],[1150,35],[1260,52],[1370,22],[1420,68],
                    [160,110],[290,95],[450,115],[600,88],[760,120],[900,100],[1050,80],
                    [1200,105],[1380,90],[85,150],[350,130],[550,145],[750,160],[950,135],
                    [1100,150],[1300,140],[200,175],[500,185],[850,170],[1180,180],
                ].map(([cx, cy], i) => (
                    <circle
                        key={i}
                        cx={cx} cy={cy}
                        r={i % 5 === 0 ? 1.2 : i % 3 === 0 ? 0.9 : 0.6}
                        fill={`rgba(200,220,255,${i % 4 === 0 ? 0.7 : 0.45})`}
                    />
                ))}

                {/* ── Moon ─────────────────────────────────────────── */}
                {/* Soft halo */}
                <circle cx="1038" cy="118" r="42" fill="url(#moonBody)" opacity="0.35" />
                {/* Moon disc */}
                <circle cx="1038" cy="118" r="20" fill="rgba(220,235,255,0.82)" />
                {/* Crescent shadow */}
                <circle cx="1044" cy="115" r="16" fill="rgba(10,18,32,0.55)" />

                {/* ── Moonlight glow ───────────────────────────────── */}
                <rect width="1440" height="900" fill="url(#moonGlow)" />

                {/* ── Horizon atmospheric glow ─────────────────────── */}
                <rect width="1440" height="900" fill="url(#horizonGlow)" />

                {/* ── Mountain Layer 1 – Farthest high peaks ───────── */}
                {/* Phu Ko / Phu Pha Yon style — tall rounded peaks */}
                <path
                    d="M0 590
                       C 40 560, 90 530, 140 505
                       C 200 475, 240 490, 280 510
                       C 310 478, 355 440, 400 420
                       C 445 400, 480 430, 510 455
                       C 535 430, 570 395, 610 375
                       C 650 355, 690 385, 720 410
                       C 748 385, 780 350, 820 330
                       C 860 310, 900 345, 935 370
                       C 960 345, 995 305, 1040 285
                       C 1085 265, 1120 300, 1155 325
                       C 1180 298, 1215 265, 1255 250
                       C 1295 235, 1335 268, 1370 295
                       C 1400 268, 1425 255, 1440 248
                       L1440 900 L0 900 Z"
                    fill="url(#mtn1)"
                />

                {/* ── Mountain Layer 2 ──────────────────────────────── */}
                <path
                    d="M0 660
                       C 50 630, 100 610, 150 625
                       C 190 638, 225 615, 265 595
                       C 300 575, 335 590, 370 610
                       C 400 585, 435 555, 475 540
                       C 515 525, 550 545, 585 565
                       C 615 542, 650 510, 695 495
                       C 740 480, 775 505, 810 525
                       C 838 502, 872 472, 918 458
                       C 965 444, 998 468, 1030 488
                       C 1058 462, 1095 430, 1140 415
                       C 1185 400, 1225 425, 1265 448
                       C 1295 425, 1335 400, 1380 418
                       C 1410 432, 1430 445, 1440 450
                       L1440 900 L0 900 Z"
                    fill="url(#mtn2)"
                />

                {/* ── Mist band between layer 2 and 3 ──────────────── */}
                <rect x="0" y="640" width="1440" height="80" fill="url(#mistGrad)" />

                {/* ── Mountain Layer 3 ──────────────────────────────── */}
                <path
                    d="M0 730
                       C 60 705, 110 695, 160 710
                       C 205 724, 240 700, 280 685
                       C 315 670, 355 682, 395 698
                       C 430 680, 468 660, 510 650
                       C 552 640, 588 658, 625 672
                       C 660 655, 700 632, 745 620
                       C 790 608, 828 628, 862 642
                       C 895 625, 935 602, 978 592
                       C 1022 582, 1060 600, 1095 616
                       C 1128 598, 1165 575, 1208 568
                       C 1252 561, 1288 582, 1325 598
                       C 1362 580, 1400 568, 1440 572
                       L1440 900 L0 900 Z"
                    fill="url(#mtn3)"
                />

                {/* ── Foreground hills ─────────────────────────────── */}
                <path
                    d="M0 810
                       C 70 790, 135 780, 195 795
                       C 255 810, 310 790, 370 778
                       C 430 766, 488 782, 548 795
                       C 600 780, 655 762, 720 755
                       C 785 748, 840 768, 900 782
                       C 955 768, 1010 750, 1075 745
                       C 1140 740, 1195 758, 1258 772
                       C 1318 756, 1375 760, 1440 768
                       L1440 900 L0 900 Z"
                    fill="url(#mtn4)"
                />

                {/* ── Ground base ──────────────────────────────────── */}
                <rect x="0" y="870" width="1440" height="30" fill="url(#ground)" />

                {/* ── Subtle city light glow at base of mountains ──── */}
                <ellipse cx="720" cy="870" rx="400" ry="30"
                    fill="rgba(79,120,200,0.04)" />
                <ellipse cx="300" cy="875" rx="180" ry="20"
                    fill="rgba(100,140,220,0.03)" />
                <ellipse cx="1150" cy="875" rx="220" ry="22"
                    fill="rgba(100,140,220,0.03)" />
            </svg>
        </div>
    );
}
