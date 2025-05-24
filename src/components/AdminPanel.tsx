'use client';

import React, { useState } from 'react';
import useAdminPanelTalon from '@/talons/useAdminPanelTalon';

const AdminPanel = () => {
    const { locations, collections, loading, error, addLocation, addCollection } = useAdminPanelTalon();
    const [newLocation, setNewLocation] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [form, setForm] = useState({
        indeks: 1,
        lokalizacjaId: '',
        miesiac: '',
        dzien: '',
        typ: ''
    });

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    const handleLocationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newLocation.trim()) {
            await addLocation(newLocation.trim());
            setNewLocation('');
            showNotification('Lokalizacja została dodana pomyślnie!', 'success');
        }
    };

    const handleCollectionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addCollection(form);
        setForm({
            indeks: 1,
            lokalizacjaId: '',
            miesiac: '',
            dzien: '',
            typ: ''
        });
        showNotification('Termin wywozu został dodany pomyślnie!', 'success');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <div className="p-4 text-center">Ładowanie...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-600">{error}</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white z-50 transition-opacity duration-300`}>
                    {notification.message}
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4 text-gray-800">Panel administracyjny</h2>
            
            {/* Add Location Form */}
            <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Dodaj lokalizację</h3>
                <form onSubmit={handleLocationSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nazwa lokalizacji
                            <input
                                type="text"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Dodaj lokalizację
                    </button>
                </form>
            </div>

            {/* Add Collection Form */}
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Dodaj termin wywozu</h3>
                <form onSubmit={handleCollectionSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Lokalizacja
                            <select
                                name="lokalizacjaId"
                                value={form.lokalizacjaId}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Wybierz...</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.id}>{loc.nazwa}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Miesiąc
                            <select
                                name="miesiac"
                                value={form.miesiac}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Wybierz...</option>
                                <option value="Styczeń">Styczeń</option>
                                <option value="Luty">Luty</option>
                                <option value="Marzec">Marzec</option>
                                <option value="Kwiecień">Kwiecień</option>
                                <option value="Maj">Maj</option>
                                <option value="Czerwiec">Czerwiec</option>
                                <option value="Lipiec">Lipiec</option>
                                <option value="Sierpień">Sierpień</option>
                                <option value="Wrzesień">Wrzesień</option>
                                <option value="Październik">Październik</option>
                                <option value="Listopad">Listopad</option>
                                <option value="Grudzień">Grudzień</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Dzień miesiąca
                            <input
                                type="number"
                                name="dzien"
                                value={form.dzien}
                                onChange={handleChange}
                                min="1"
                                max="31"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Typ śmieci
                            <select
                                name="typ"
                                value={form.typ}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Wybierz...</option>
                                <option value="Segregowane">Segregowane</option>
                                <option value="Zmieszane">Zmieszane</option>
                            </select>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Dodaj termin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminPanel; 