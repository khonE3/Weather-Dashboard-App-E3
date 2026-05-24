'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Province } from '@/types/weather';
import { searchProvinces } from '@/lib/api';
import { Search, X, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps { onSelect: (province: Province) => void; }

export default function SearchBar({ onSelect }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Province[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && !inputRef.current?.contains(e.target as Node))
                setIsOpen(false);
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length < 1) { setResults([]); return; }
            setLoading(true);
            try {
                const data = await searchProvinces(query);
                setResults(data);
                setIsOpen(true);
            } catch { /* ignore */ } finally { setLoading(false); }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (p: Province) => { setQuery(p.name); setIsOpen(false); onSelect(p); };
    const handleClear = () => { setQuery(''); setResults([]); setIsOpen(false); inputRef.current?.focus(); };

    return (
        <div className="relative">
            <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-[#4a5068] pointer-events-none" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim().length > 0 && setIsOpen(true)}
                    placeholder="ค้นหาจังหวัด..."
                    className="input-clean w-full pl-10 pr-9 py-2.5 text-sm"
                />
                {loading && (
                    <div className="absolute right-3 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-[#4f8ef7] animate-spin" />
                    </div>
                )}
                {!loading && query.length > 0 && (
                    <button onClick={handleClear} className="absolute right-3 w-5 h-5 flex items-center justify-center rounded-full text-[#4a5068] hover:text-[#f0f2f5] transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {isOpen && results.length > 0 && (
                <div ref={dropdownRef} className="dropdown absolute z-50 w-full mt-2 p-1.5 max-h-64 overflow-y-auto animate-fade-in">
                    {results.map((p, i) => (
                        <button key={i} onClick={() => handleSelect(p)}
                            className="w-full px-3 py-2.5 text-left rounded-xl hover:bg-[#22263a] transition-colors flex items-center gap-3 group">
                            <span className="text-[#4a5068] group-hover:text-[#4f8ef7] transition-colors">
                                <MapPin className="w-4 h-4" />
                            </span>
                            <div>
                                <div className="text-sm font-medium text-[#f0f2f5]">{p.name}</div>
                                {p.name_en && <div className="text-xs text-[#4a5068]">{p.name_en}</div>}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {isOpen && query.trim().length > 0 && results.length === 0 && !loading && (
                <div className="dropdown absolute z-50 w-full mt-2 px-4 py-5 text-center text-sm text-[#4a5068] animate-fade-in">
                    ไม่พบจังหวัดที่ค้นหา
                </div>
            )}
        </div>
    );
}
