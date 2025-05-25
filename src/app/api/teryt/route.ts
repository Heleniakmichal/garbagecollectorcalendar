import { NextResponse } from 'next/server';

const TERYT_API_BASE = 'https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/uzytkownicy_indywidualni/pobieranie/pobieranie.aspx';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const param = searchParams.get('param');

    if (!type || !param) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    try {
        // Construct the correct API URL based on the type
        let apiUrl = '';
        switch (type) {
            case 'powiaty':
                apiUrl = `${TERYT_API_BASE}/powiaty?wojewodztwo=${encodeURIComponent(param)}`;
                break;
            case 'gminy':
                apiUrl = `${TERYT_API_BASE}/gminy?powiat=${encodeURIComponent(param)}`;
                break;
            case 'miejscowosci':
                apiUrl = `${TERYT_API_BASE}/miejscowosci?gmina=${encodeURIComponent(param)}`;
                break;
            default:
                return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
        }

        console.log('Fetching from:', apiUrl); // Debug log

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('API response not OK:', response.status, response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data); // Debug log
        return NextResponse.json(data);
    } catch (error) {
        console.error('TERYT API error:', error);
        return NextResponse.json({ error: 'Failed to fetch data from TERYT API' }, { status: 500 });
    }
} 