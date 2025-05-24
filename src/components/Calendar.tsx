"use client";

import React from 'react';
import { FormattedMessage } from 'react-intl';
import useCalendarTalon from '@/talons/useCalendarTalon';
import classes from './styles.module.css';

const Calendar = () => {
    const { collections, loading, error } = useCalendarTalon();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={classes.root}>
            <h1>
                <FormattedMessage id="calendar.title" defaultMessage="Garbage Collection Calendar" />
            </h1>
            <div className={classes.calendar}>
                {collections.map(collection => (
                    <div key={collection.id} className={classes.collection}>
                        <div className={classes.date}>{collection.date}</div>
                        <div className={classes.type}>{collection.type}</div>
                        <div className={classes.location}>{collection.location.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar; 