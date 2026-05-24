'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
            <Loader2 className="w-8 h-8 text-[#4f8ef7] animate-spin" />
            <p className="text-sm text-[#4a5068] font-medium">กำลังโหลดข้อมูลสภาพอากาศ...</p>
        </div>
    );
}
