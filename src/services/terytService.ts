interface TerytResponse {
    nazwa: string;
    id: string;
}

const TERYT_API_BASE = 'https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/uzytkownicy_indywidualni/pobieranie/pobieranie.aspx';

export const terytService = {
    async getPowiaty(wojewodztwo: string): Promise<string[]> {
        try {
            const response = await fetch(`${TERYT_API_BASE}/powiaty?wojewodztwo=${encodeURIComponent(wojewodztwo)}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch powiaty');
            const data = await response.json() as TerytResponse[];
            return data.map(item => item.nazwa);
        } catch (error) {
            console.error('Error fetching powiaty:', error);
            return [];
        }
    },

    async getGminy(powiat: string): Promise<string[]> {
        try {
            const response = await fetch(`${TERYT_API_BASE}/gminy?powiat=${encodeURIComponent(powiat)}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch gminy');
            const data = await response.json() as TerytResponse[];
            return data.map(item => item.nazwa);
        } catch (error) {
            console.error('Error fetching gminy:', error);
            return [];
        }
    },

    async getMiejscowosci(gmina: string): Promise<string[]> {
        try {
            const response = await fetch(`${TERYT_API_BASE}/miejscowosci?gmina=${encodeURIComponent(gmina)}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch miejscowosci');
            const data = await response.json() as TerytResponse[];
            return data.map(item => item.nazwa);
        } catch (error) {
            console.error('Error fetching miejscowosci:', error);
            return [];
        }
    }
}; 