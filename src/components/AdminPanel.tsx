"use client";

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import useAdminPanelTalon from '@/talons/useAdminPanelTalon';
import TerytForm from '@/components/TerytForm';
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
            <div className={classes.header}>
                <h1>
                    <FormattedMessage id="admin.title" defaultMessage="Admin Panel" />
                </h1>
                <Link href="/" className={classes.homeButton}>
                    <FormattedMessage id="admin.home" defaultMessage="Home" />
                </Link>
            </div>

            <div className={classes.sections}>
                <section className={classes.section}>
                    <h2>
                        <FormattedMessage id="admin.teryt.title" defaultMessage="Dodaj nową lokalizację" />
                    </h2>
                    <TerytForm />
                </section>

                <section className={classes.section}>
                    <h2>
                        <FormattedMessage id="admin.collections.title" defaultMessage="Dodaj odbiór odpadów" />
                    </h2>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <div className={classes.formGroup}>
                            <label>
                                <FormattedMessage id="admin.location" defaultMessage="Location" />
                                <select 
                                    name="lokalizacjaId" 
                                    value={form?.lokalizacjaId || ''} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">
                                        <FormattedMessage id="admin.selectLocation" defaultMessage="Select..." />
                                    </option>
                                    {locations.map(loc => (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.nazwa}
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
                                    value={form?.date || ''}
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
                                    value={form?.type || ''}
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
                </section>

                <section className={classes.section}>
                    <h2>
                        <FormattedMessage id="admin.collections" defaultMessage="Collections" />
                    </h2>
                    <div className={classes.collections}>
                        {collections.map(collection => (
                            <div key={collection.id} className={classes.collection}>
                                <div className={classes.date}>{collection.date}</div>
                                <div className={classes.type}>{collection.type}</div>
                                <div className={classes.location}>
                                    {locations.find(loc => loc.id === collection.lokalizacjaId)?.nazwa}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminPanel; 