'use client';

import React from 'react';
import Calendar from '@/components/Calendar';
import Notification from '@/components/Notification';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Harmonogram wywozu śmieci</h1>
                <Calendar />
                <Notification />
            </div>
        </main>
    );
}
