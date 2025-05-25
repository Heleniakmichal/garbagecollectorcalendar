'use client';

import { useEffect, useState } from 'react';
import { terytService } from '@/services/terytService';
import { terytSchema } from '@/schemas/terytSchema';

export const useTerytFormTalon = () => {
    const [schema, setSchema] = useState(terytSchema);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateSchema = async (formState: any) => {
        setLoading(true);
        try {
            const newSchema = { ...schema };
            
            if (formState.values.wojewodztwo) {
                const powiaty = await terytService.getPowiaty(formState.values.wojewodztwo);
                newSchema.properties.powiat.enum = powiaty;
            }

            if (formState.values.powiat) {
                const gminy = await terytService.getGminy(formState.values.powiat);
                newSchema.properties.gmina.enum = gminy;
            }

            if (formState.values.gmina) {
                const miejscowosci = await terytService.getMiejscowosci(formState.values.gmina);
                newSchema.properties.miejscowosc.enum = miejscowosci;
            }

            setSchema(newSchema);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formState: any) => {
        try {
            // Here you can handle the form submission
            console.log('Form submitted:', formState.values);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    return {
        schema,
        loading,
        error,
        updateSchema,
        handleSubmit
    };
}; 