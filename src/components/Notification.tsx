'use client';

import React, { useEffect, useState, useRef } from 'react';
import useCalendarTalon from '@/talons/useCalendarTalon';

const Notification = () => {
    const { collections } = useCalendarTalon();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Request notification permission
        if ('Notification' in window) {
            window.Notification.requestPermission().then((perm: NotificationPermission) => {
                setPermission(perm);
            });
        }

        // Create audio element
        audioRef.current = new Audio('/notification.mp3');
        
        const checkUpcomingCollections = () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];

            const upcomingCollections = collections.filter(collection => {
                const collectionDate = `${new Date().getFullYear()}-${getMonthNumber(collection.miesiac)}-${collection.dzien}`;
                return collectionDate === tomorrowStr;
            });

            if (upcomingCollections.length > 0) {
                const locations = upcomingCollections.map(c => c.lokalizacja.nazwa).join(', ');
                const message = `Jutro (${formatDate(tomorrow)}) wystaw śmieci w lokalizacjach: ${locations}`;
                setNotificationMessage(message);
                setShowNotification(true);
                
                // Play notification sound
                if (audioRef.current) {
                    audioRef.current.play().catch(err => console.log('Audio play failed:', err));
                }

                // Vibrate if supported
                if ('vibrate' in navigator) {
                    navigator.vibrate([200, 100, 200]);
                }

                // Show browser notification if permitted
                if (permission === 'granted' && 'Notification' in window) {
                    new window.Notification('Przypomnienie o wywozie śmieci', {
                        body: message,
                        icon: '/icon-192x192.png',
                        badge: '/icon-192x192.png',
                        requireInteraction: true
                    });
                }
            } else {
                setShowNotification(false);
            }
        };

        // Check immediately when component mounts
        checkUpcomingCollections();

        // Then check every hour
        const interval = setInterval(checkUpcomingCollections, 3600000);

        return () => {
            clearInterval(interval);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [collections, permission]);

    if (!showNotification) return null;

    return (
        <div className="fixed bottom-0 right-0 left-0 sm:left-auto sm:right-4 sm:bottom-4 bg-blue-600 text-white p-4 sm:p-6 rounded-t-lg sm:rounded-lg shadow-xl z-50 max-w-full sm:max-w-md animate-bounce">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="font-bold text-base sm:text-lg mb-1 sm:mb-2">⚠️ Przypomnienie!</p>
                    <p className="text-sm sm:text-lg break-words">{notificationMessage}</p>
                </div>
                <button
                    onClick={() => setShowNotification(false)}
                    className="ml-4 text-white hover:text-gray-200 text-xl p-2"
                    aria-label="Zamknij powiadomienie"
                >
                    ✕
                </button>
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

// Helper function to format date in Polish format
function formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}.${month}`;
}

export default Notification; 