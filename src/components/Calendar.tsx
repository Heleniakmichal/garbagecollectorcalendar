'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import useCalendarTalon from '@/talons/useCalendarTalon';

const Calendar = () => {
    const { collections, loading, error } = useCalendarTalon();

    const events = collections.map(collection => ({
        title: `${collection.lokalizacja.nazwa} - ${collection.typ}`,
        date: `${new Date().getFullYear()}-${getMonthNumber(collection.miesiac)}-${collection.dzien}`,
        backgroundColor: collection.typ === 'Segregowane' ? '#22c55e' : '#ef4444',
        borderColor: collection.typ === 'Segregowane' ? '#22c55e' : '#ef4444',
    }));

    if (loading) {
        return <div className="p-4 text-center">Ładowanie...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-600">Błąd ładowania</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Terminy wywozu śmieci</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    locale="pl"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth'
                    }}
                    events={events}
                    height="auto"
                />
            </div>
        </div>
    );
};

// Helper function to convert Polish month names to numbers
function getMonthNumber(month: string): string {
    const months: { [key: string]: string } = {
        'Styczeń': '01', 'Luty': '02', 'Marzec': '03', 'Kwiecień': '04',
        'Maj': '05', 'Czerwiec': '06', 'Lipiec': '07', 'Sierpień': '08',
        'Wrzesień': '09', 'Październik': '10', 'Listopad': '11', 'Grudzień': '12'
    };
    return months[month] || '01';
}

export default Calendar; 