interface TerytResponse {
    nazwa: string;
    id: string;
}

// Using the official TERYT API endpoint
const TERYT_API_BASE = 'https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/uzytkownicy_indywidualni/pobieranie/pobieranie.aspx';

export const terytService = {
    async getPowiaty(wojewodztwo: string): Promise<string[]> {
        try {
            // Using the correct endpoint for powiaty
            const response = await fetch(`${TERYT_API_BASE}/powiaty?wojewodztwo=${encodeURIComponent(wojewodztwo)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0' // Some APIs require a user agent
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch powiaty:', response.status, response.statusText);
                throw new Error('Failed to fetch powiaty');
            }

            const data = await response.json() as TerytResponse[];
            console.log('Powiaty data:', data); // Debug log
            return data.map(item => item.nazwa);
        } catch (error) {
            console.error('Error fetching powiaty:', error);
            return [];
        }
    },

    async getGminy(powiat: string): Promise<string[]> {
        try {
            // Using the correct endpoint for gminy
            const response = await fetch(`${TERYT_API_BASE}/gminy?powiat=${encodeURIComponent(powiat)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch gminy:', response.status, response.statusText);
                throw new Error('Failed to fetch gminy');
            }

            const data = await response.json() as TerytResponse[];
            console.log('Gminy data:', data); // Debug log
            return data.map(item => item.nazwa);
        } catch (error) {
            console.error('Error fetching gminy:', error);
            return [];
        }
    },

    async getMiejscowosci(gmina: string): Promise<string[]> {
        try {
            // Using the correct endpoint for miejscowosci
            const response = await fetch(`${TERYT_API_BASE}/miejscowosci?gmina=${encodeURIComponent(gmina)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch miejscowosci:', response.status, response.statusText);
                throw new Error('Failed to fetch miejscowosci');
            }

            const data = await response.json() as TerytResponse[];
            console.log('Miejscowosci data:', data); // Debug log
            return data.map(item => item.nazwa);
        } catch (error) {
            console.error('Error fetching miejscowosci:', error);
            return [];
        }
    }
}; 