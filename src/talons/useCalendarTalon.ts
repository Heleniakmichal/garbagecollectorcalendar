'use client';

import { useEffect, useState } from 'react';

export type GarbageCollection = {
    id: string;
    lokalizacjaId: string;
    lokalizacja: {
        id: string;
        nazwa: string;
    };
    miesiac: string;
    dzien: string;
    typ: string;
};

const useCalendarTalon = () => {
    const [collections, setCollections] = useState<GarbageCollection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await fetch('/api/garbage-collections');
                if (!response.ok) {
                    throw new Error('Failed to fetch collections');
                }
                const data = await response.json();
                setCollections(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

    return {
        collections,
        loading,
        error
    };
};

export default useCalendarTalon; 