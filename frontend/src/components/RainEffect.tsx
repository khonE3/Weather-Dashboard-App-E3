'use client';

import React, { useEffect, useState } from 'react';

export default function RainEffect() {
    const [raindrops, setRaindrops] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        // Generate random raindrops
        const drops = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 0.5 + Math.random() * 0.5,
        }));
        setRaindrops(drops);
    }, []);

    return (
        <div className="rain-container">
            {raindrops.map((drop) => (
                <div
                    key={drop.id}
                    className="rain-drop"
                    style={{
                        left: `${drop.left}%`,
                        animationDelay: `${drop.delay}s`,
                        animationDuration: `${drop.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}
