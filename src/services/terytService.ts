const TERYT_API_BASE = 'https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/uzytkownicy_indywidualni/pobieranie/pobieranie.aspx';

export const terytService = {
    async getPowiaty(wojewodztwo: string): Promise<string[]> {
        try {
            const response = await fetch(`${TERYT_API_BASE}/powiaty/${wojewodztwo}`);
            if (!response.ok) throw new Error('Failed to fetch powiaty');
            const data = await response.json();
            return data.map((item: any) => item.nazwa);
        } catch (error) {
            console.error('Error fetching powiaty:', error);
            return [];
        }
    },

    async getGminy(powiat: string): Promise<string[]> {
        try {
            const response = await fetch(`${TERYT_API_BASE}/gminy/${powiat}`);
            if (!response.ok) throw new Error('Failed to fetch gminy');
            const data = await response.json();
            return data.map((item: any) => item.nazwa);
        } catch (error) {
            console.error('Error fetching gminy:', error);
            return [];
        }
    },

    async getMiejscowosci(gmina: string): Promise<string[]> {
        try {
            const response = await fetch(`${TERYT_API_BASE}/miejscowosci/${gmina}`);
            if (!response.ok) throw new Error('Failed to fetch miejscowosci');
            const data = await response.json();
            return data.map((item: any) => item.nazwa);
        } catch (error) {
            console.error('Error fetching miejscowosci:', error);
            return [];
        }
    }
}; 