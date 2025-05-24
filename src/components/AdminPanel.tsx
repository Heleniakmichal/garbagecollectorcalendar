"use client";

import React from 'react';
import { FormattedMessage } from 'react-intl';
import useAdminPanelTalon from '@/talons/useAdminPanelTalon';
import classes from './styles.module.css';

const AdminPanel = () => {
    const { locations, collections, loading, error, form, handleChange, handleSubmit } = useAdminPanelTalon();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={classes.root}>
            <h1>
                <FormattedMessage id="admin.title" defaultMessage="Admin Panel" />
            </h1>
            
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formGroup}>
                    <label>
                        <FormattedMessage id="admin.location" defaultMessage="Location" />
                        <select 
                            name="locationId" 
                            value={form.locationId} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">
                                <FormattedMessage id="admin.selectLocation" defaultMessage="Select..." />
                            </option>
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className={classes.formGroup}>
                    <label>
                        <FormattedMessage id="admin.date" defaultMessage="Date" />
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div className={classes.formGroup}>
                    <label>
                        <FormattedMessage id="admin.type" defaultMessage="Type" />
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                <FormattedMessage id="admin.selectType" defaultMessage="Select..." />
                            </option>
                            <option value="mixed">
                                <FormattedMessage id="admin.type.mixed" defaultMessage="Mixed" />
                            </option>
                            <option value="recyclable">
                                <FormattedMessage id="admin.type.recyclable" defaultMessage="Recyclable" />
                            </option>
                        </select>
                    </label>
                </div>

                <button type="submit" className={classes.submitButton}>
                    <FormattedMessage id="admin.add" defaultMessage="Add Collection" />
                </button>
            </form>

            <div className={classes.collections}>
                <h2>
                    <FormattedMessage id="admin.collections" defaultMessage="Collections" />
                </h2>
                {collections.map(collection => (
                    <div key={collection.id} className={classes.collection}>
                        <div className={classes.date}>{collection.date}</div>
                        <div className={classes.type}>{collection.type}</div>
                        <div className={classes.location}>
                            {locations.find(loc => loc.id === collection.locationId)?.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel; 