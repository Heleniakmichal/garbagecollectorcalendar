'use client';

import { useState } from 'react';
import { terytSchema, type Schema } from '@/schemas/terytSchema';
import { terytService } from '@/services/terytService';

interface FormState {
    values: {
        wojewodztwo?: string;
        powiat?: string;
        gmina?: string;
        miejscowosc?: string;
    };
}

export const useTerytFormTalon = () => {
    const [schema, setSchema] = useState<Schema>(terytSchema);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateSchema = async (formState: FormState) => {
        const { values } = formState;
        setIsLoading(true);
        setError(null);

        try {
            if (values.wojewodztwo && !values.powiat) {
                const powiaty = await terytService.getPowiaty(values.wojewodztwo);
                setSchema((prev: Schema) => ({
                    ...prev,
                    properties: {
                        ...prev.properties,
                        powiat: {
                            ...prev.properties.powiat,
                            enum: powiaty
                        }
                    }
                }));
            }

            if (values.powiat && !values.gmina) {
                const gminy = await terytService.getGminy(values.powiat);
                setSchema((prev: Schema) => ({
                    ...prev,
                    properties: {
                        ...prev.properties,
                        gmina: {
                            ...prev.properties.gmina,
                            enum: gminy
                        }
                    }
                }));
            }

            if (values.gmina && !values.miejscowosc) {
                const miejscowosci = await terytService.getMiejscowosci(values.gmina);
                setSchema((prev: Schema) => ({
                    ...prev,
                    properties: {
                        ...prev.properties,
                        miejscowosc: {
                            ...prev.properties.miejscowosc,
                            enum: miejscowosci
                        }
                    }
                }));
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (formState: FormState) => {
        console.log('Form submitted:', formState.values);
    };

    return {
        schema,
        isLoading,
        error,
        updateSchema,
        handleSubmit
    };
}; 