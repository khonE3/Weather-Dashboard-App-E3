'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Province } from '@/types/weather';
import { searchProvinces } from '@/lib/api';

interface SearchBarProps {
    onSelect: (province: Province) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Province[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !inputRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const searchDebounced = async () => {
            if (query.length < 1) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const data = await searchProvinces(query);
                setResults(data);
                setIsOpen(true);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(searchDebounced, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (province: Province) => {
        setQuery(province.name);
        setIsOpen(false);
        onSelect(province);
    };

    return (
        <div className="relative">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                    placeholder="🔍 ค้นหาจังหวัด..."
                    className="w-full px-4 py-3 pl-4 pr-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-isan-gold focus:border-transparent transition-all"
                />
                {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && results.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-2 py-2 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-white/30 max-h-60 overflow-y-auto"
                >
                    {results.map((province, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(province)}
                            className="w-full px-4 py-2 text-left text-isan-night hover:bg-isan-gold/20 transition-colors flex items-center gap-2"
                        >
                            <span className="text-lg">📍</span>
                            <div>
                                <div className="font-medium">{province.name}</div>
                                {province.name_en && (
                                    <div className="text-sm text-gray-500">{province.name_en}</div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* No Results */}
            {isOpen && query.length > 0 && results.length === 0 && !loading && (
                <div className="absolute z-50 w-full mt-2 py-4 px-4 rounded-xl bg-white/95 backdrop-blur-md shadow-xl text-center text-gray-500">
                    ไม่พบจังหวัดที่ค้นหา
                </div>
            )}
        </div>
    );
}
