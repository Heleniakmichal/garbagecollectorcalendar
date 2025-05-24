"use client";

import { useEffect, useState } from 'react';

export type Location = {
    id: string;
    nazwa: string;
};

export type GarbageCollection = {
    id: string;
    date: string;
    type: string;
    lokalizacjaId: string;
};

const useAdminPanelTalon = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [collections, setCollections] = useState<GarbageCollection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        lokalizacjaId: '',
        date: '',
        type: ''
    });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/garbage-collections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Failed to create collection');
            }

            const newCollection = await response.json();
            setCollections(prev => [...prev, newCollection]);
            setForm({
                lokalizacjaId: '',
                date: '',
                type: ''
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    return {
        locations,
        collections,
        loading,
        error,
        form,
        handleChange,
        handleSubmit
    };
};

export default useAdminPanelTalon; 