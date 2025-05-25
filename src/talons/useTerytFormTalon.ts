'use client';

import { useState, useEffect } from 'react';
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
    const [formState, setFormState] = useState<FormState>({ values: {} });

    const updateSchema = async (newFormState: FormState) => {
        const { values } = newFormState;
        console.log('Form state changed:', values);

        // Update form state
        setFormState(newFormState);
        setIsLoading(true);
        setError(null);

        try {
            // If wojewodztwo changed, clear powiat, gmina, and miejscowosc
            if (values.wojewodztwo && values.wojewodztwo !== formState.values.wojewodztwo) {
                console.log('Fetching powiaty for:', values.wojewodztwo);
                const powiaty = await terytService.getPowiaty(values.wojewodztwo);
                console.log('Received powiaty:', powiaty);

                setSchema((prev: Schema) => ({
                    ...prev,
                    properties: {
                        ...prev.properties,
                        powiat: {
                            ...prev.properties.powiat,
                            enum: powiaty,
                            value: '' // Clear selected value
                        },
                        gmina: {
                            ...prev.properties.gmina,
                            enum: [],
                            value: '' // Clear selected value
                        },
                        miejscowosc: {
                            ...prev.properties.miejscowosc,
                            enum: [],
                            value: '' // Clear selected value
                        }
                    }
                }));
            }

            // If powiat changed, clear gmina and miejscowosc
            if (values.powiat && values.powiat !== formState.values.powiat) {
                console.log('Fetching gminy for:', values.powiat);
                const gminy = await terytService.getGminy(values.powiat);
                console.log('Received gminy:', gminy);

                setSchema((prev: Schema) => ({
                    ...prev,
                    properties: {
                        ...prev.properties,
                        gmina: {
                            ...prev.properties.gmina,
                            enum: gminy,
                            value: '' // Clear selected value
                        },
                        miejscowosc: {
                            ...prev.properties.miejscowosc,
                            enum: [],
                            value: '' // Clear selected value
                        }
                    }
                }));
            }

            // If gmina changed, clear miejscowosc
            if (values.gmina && values.gmina !== formState.values.gmina) {
                console.log('Fetching miejscowosci for:', values.gmina);
                const miejscowosci = await terytService.getMiejscowosci(values.gmina);
                console.log('Received miejscowosci:', miejscowosci);

                setSchema((prev: Schema) => ({
                    ...prev,
                    properties: {
                        ...prev.properties,
                        miejscowosc: {
                            ...prev.properties.miejscowosc,
                            enum: miejscowosci,
                            value: '' // Clear selected value
                        }
                    }
                }));
            }
        } catch (err) {
            console.error('Error updating schema:', err);
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