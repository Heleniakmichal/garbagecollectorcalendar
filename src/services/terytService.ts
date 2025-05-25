interface TerytResponse {
    nazwa: string;
    id: string;
}

export const terytService = {
    async getPowiaty(wojewodztwo: string): Promise<string[]> {
        try {
            const response = await fetch(`/api/teryt?type=powiaty&param=${encodeURIComponent(wojewodztwo)}`);

            if (!response.ok) {
                console.error('Failed to fetch powiaty:', response.status, response.statusText);
                throw new Error('Failed to fetch powiaty');
            }

            const data = await response.json() as TerytResponse[];
            console.log('Powiaty data:', data);
            return data.map(item => item.nazwa);
        } catch (error) {
            console.error('Error fetching powiaty:', error);
            // Return mock data for testing
            return ['Powiat 1', 'Powiat 2', 'Powiat 3'];
        }
    },

    async getGminy(powiat: string): Promise<string[]> {
        try {
            const response = await fetch(`/api/teryt?type=gminy&param=${encodeURIComponent(powiat)}`);

            if (!response.ok) {
                console.error('Failed to fetch gminy:', response.status, response.statusText);
                throw new Error('Failed to fetch gminy');
            }

            const data = await response.json() as TerytResponse[];
            console.log('Gminy data:', data);
            return data.map(item => item.nazwa);
        } catch (error) {
            console.error('Error fetching gminy:', error);
            // Return mock data for testing
            return ['Gmina 1', 'Gmina 2', 'Gmina 3'];
        }
    },

    async getMiejscowosci(gmina: string): Promise<string[]> {
        try {
            const response = await fetch(`/api/teryt?type=miejscowosci&param=${encodeURIComponent(gmina)}`);

            if (!response.ok) {
                console.error('Failed to fetch miejscowosci:', response.status, response.statusText);
                throw new Error('Failed to fetch miejscowosci');
            }

            const data = await response.json() as TerytResponse[];
            console.log('Miejscowosci data:', data);
            return data.map(item => item.nazwa);
        } catch (error) {
            console.error('Error fetching miejscowosci:', error);
            // Return mock data for testing
            return ['Miejscowość 1', 'Miejscowość 2', 'Miejscowość 3'];
        }
    }
}; 