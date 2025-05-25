'use client';

import React from 'react';
import { Form, SchemaFields } from 'informed';
import { FormattedMessage } from 'react-intl';
import { useTerytFormTalon } from '@/talons/useTerytFormTalon';
import classes from './styles.module.css';

const TerytForm = () => {
    const { schema, isLoading, error, updateSchema, handleSubmit } = useTerytFormTalon();

    const content = isLoading ? (
        <div className={classes.loading}>
            <FormattedMessage
                id="teryt.form.loading"
                defaultMessage="Ładowanie..."
            />
        </div>
    ) : error ? (
        <div className={classes.error}>
            <FormattedMessage
                id="teryt.form.error"
                defaultMessage="Błąd: {error}"
                values={{ error }}
            />
        </div>
    ) : (
        <Form schema={schema} onSubmit={handleSubmit} onChange={updateSchema}>
            <SchemaFields />
            <button type="submit" className={classes.submitButton}>
                <FormattedMessage
                    id="teryt.form.submit"
                    defaultMessage="Zapisz"
                />
            </button>
        </Form>
    );

    return (
        <div className={classes.formContainer}>
            <h2>
                <FormattedMessage
                    id="teryt.form.title"
                    defaultMessage="Wybierz lokalizację"
                />
            </h2>
            {content}
        </div>
    );
};

export default TerytForm; 