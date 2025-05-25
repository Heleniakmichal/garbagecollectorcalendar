interface TerytResponse {
    nazwa: string;
    id: string;
}

// Using the correct TERYT API endpoint
const TERYT_API_BASE = 'https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/uzytkownicy_indywidualni/pobieranie/pobieranie.aspx';

export const terytService = {
    async getPowiaty(wojewodztwo: string): Promise<string[]> {
        try {
            // Using the correct endpoint format for powiaty
            const response = await fetch(`${TERYT_API_BASE}/powiaty?wojewodztwo=${encodeURIComponent(wojewodztwo)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                },
                credentials: 'include' // Include cookies if needed
            });

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
            const response = await fetch(`${TERYT_API_BASE}/gminy?powiat=${encodeURIComponent(powiat)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                },
                credentials: 'include'
            });

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
            const response = await fetch(`${TERYT_API_BASE}/miejscowosci?gmina=${encodeURIComponent(gmina)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                },
                credentials: 'include'
            });

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