'use client';

import React from 'react';
import { Form, SchemaFields } from 'informed';
import { FormattedMessage } from 'react-intl';
import { useTerytFormTalon } from '@/talons/useTerytFormTalon';
import classes from './styles.module.css';

const TerytForm = () => {
    const { schema, isLoading, error, updateSchema, handleSubmit } = useTerytFormTalon();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={classes.formContainer}>
            <h2>
                <FormattedMessage
                    id="teryt.form.title"
                    defaultMessage="Wybierz lokalizację"
                />
            </h2>
            <Form schema={schema} onSubmit={handleSubmit} onChange={updateSchema}>
                <SchemaFields />
                <button type="submit" className={classes.submitButton}>
                    <FormattedMessage
                        id="teryt.form.submit"
                        defaultMessage="Zapisz"
                    />
                </button>
            </Form>
        </div>
    );
};

export default TerytForm; 