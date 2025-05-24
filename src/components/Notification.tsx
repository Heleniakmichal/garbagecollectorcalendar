'use client';

import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useCalendarTalon from '@/talons/useCalendarTalon';
import classes from './styles.module.css';

const Notification = () => {
    const { collections } = useCalendarTalon();
    const [showNotification, setShowNotification] = useState(false);
    const [upcomingCollections, setUpcomingCollections] = useState<typeof collections>([]);

    useEffect(() => {
        const checkUpcomingCollections = () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];

            const upcoming = collections.filter(collection => {
                return collection.date === tomorrowStr;
            });

            setUpcomingCollections(upcoming);
            setShowNotification(upcoming.length > 0);
        };

        checkUpcomingCollections();
        const interval = setInterval(checkUpcomingCollections, 1000 * 60 * 60); // Check every hour

        return () => clearInterval(interval);
    }, [collections]);

    if (!showNotification) {
        return null;
    }

    return (
        <div className={classes.notification}>
            <h3>
                <FormattedMessage 
                    id="notification.title" 
                    defaultMessage="Upcoming Garbage Collection" 
                />
            </h3>
            {upcomingCollections.map(collection => (
                <div key={collection.id} className={classes.collection}>
                    <div className={classes.type}>
                        <FormattedMessage 
                            id={`notification.type.${collection.type}`}
                            defaultMessage={collection.type}
                        />
                    </div>
                    <div className={classes.location}>
                        {collection.location.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notification; 