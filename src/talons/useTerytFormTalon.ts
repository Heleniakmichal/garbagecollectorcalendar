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

    const updateSchema = async (newFormState: FormState) => {
        const { values } = newFormState;
        setIsLoading(true);
        setError(null);

        try {
            if (values.wojewodztwo) {
                const powiaty = await terytService.getPowiaty(values.wojewodztwo);
                setSchema((prev: Schema) => ({
                    ...prev,
                    properties: {
                        ...prev.properties,
                        powiat: {
                            ...prev.properties.powiat,
                            enum: powiaty,
                            value: ''
                        },
                        gmina: {
                            ...prev.properties.gmina,
                            enum: [],
                            value: ''
                        },
                        miejscowosc: {
                            ...prev.properties.miejscowosc,
                            enum: [],
                            value: ''
                        }
                    }
                }));
            }

            if (values.powiat) {
                const gminy = await terytService.getGminy(values.powiat);
                setSchema((prev: Schema) => ({
                    ...prev,
                    properties: {
                        ...prev.properties,
                        gmina: {
                            ...prev.properties.gmina,
                            enum: gminy,
                            value: ''
                        },
                        miejscowosc: {
                            ...prev.properties.miejscowosc,
                            enum: [],
                            value: ''
                        }
                    }
                }));
            }

            if (values.gmina) {
                const miejscowosci = await terytService.getMiejscowosci(values.gmina);
                setSchema((prev: Schema) => ({
                    ...prev,
                    properties: {
                        ...prev.properties,
                        miejscowosc: {
                            ...prev.properties.miejscowosc,
                            enum: miejscowosci,
                            value: ''
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