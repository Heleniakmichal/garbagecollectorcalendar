'use client';

import { useEffect, useState } from 'react';

export type Location = {
    id: string;
    nazwa: string;
};

export type GarbageCollection = {
    id: string;
    indeks: number;
    lokalizacjaId: string;
    miesiac: string;
    dzien: string;
    typ: string;
};

const useAdminPanelTalon = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [collections, setCollections] = useState<GarbageCollection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [locationsRes, collectionsRes] = await Promise.all([
                    fetch('/api/locations'),
                    fetch('/api/garbage-collections')
                ]);

                if (!locationsRes.ok || !collectionsRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [locationsData, collectionsData] = await Promise.all([
                    locationsRes.json(),
                    collectionsRes.json()
                ]);

                setLocations(locationsData);
                setCollections(collectionsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addLocation = async (nazwa: string) => {
        try {
            const response = await fetch('/api/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nazwa }),
            });

            if (!response.ok) {
                throw new Error('Failed to add location');
            }

            const newLocation = await response.json();
            setLocations(prev => [...prev, newLocation]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        }
    };

    const addCollection = async (collection: Omit<GarbageCollection, 'id'>) => {
        try {
            const response = await fetch('/api/garbage-collections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(collection),
            });

            if (!response.ok) {
                throw new Error('Failed to add collection');
            }

            const newCollection = await response.json();
            setCollections(prev => [...prev, newCollection]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        }
    };

    return {
        locations,
        collections,
        loading,
        error,
        addLocation,
        addCollection,
    };
};

export default useAdminPanelTalon; 