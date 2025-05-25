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
        console.log('Form state changed:', values); // Debug log

        setIsLoading(true);
        setError(null);

        try {
            // If wojewodztwo changed, clear powiat, gmina, and miejscowosc
            if (values.wojewodztwo) {
                console.log('Fetching powiaty for:', values.wojewodztwo); // Debug log
                const powiaty = await terytService.getPowiaty(values.wojewodztwo);
                console.log('Received powiaty:', powiaty); // Debug log

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
            if (values.powiat) {
                console.log('Fetching gminy for:', values.powiat); // Debug log
                const gminy = await terytService.getGminy(values.powiat);
                console.log('Received gminy:', gminy); // Debug log

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
            if (values.gmina) {
                console.log('Fetching miejscowosci for:', values.gmina); // Debug log
                const miejscowosci = await terytService.getMiejscowosci(values.gmina);
                console.log('Received miejscowosci:', miejscowosci); // Debug log

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
            console.error('Error updating schema:', err); // Debug log
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