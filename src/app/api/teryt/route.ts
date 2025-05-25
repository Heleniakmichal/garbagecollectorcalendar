import { NextResponse } from 'next/server';

// Based on TERYT documentation - TERC structure
// WOJ (2 chars) - województwo symbol
// POW (2 chars) - powiat symbol  
// GMI (2 chars) - gmina symbol
// NAZWA - name of the unit

interface TerytUnit {
    kod: string;
    nazwa: string;
}

interface TerytData {
    wojewodztwa: TerytUnit[];
    powiaty: Record<string, TerytUnit[]>;
    gminy: Record<string, TerytUnit[]>;
    miejscowosci: Record<string, TerytUnit[]>;
}

const terytData: TerytData = {
    wojewodztwa: [
        { kod: '02', nazwa: 'dolnośląskie' },
        { kod: '04', nazwa: 'kujawsko-pomorskie' },
        { kod: '06', nazwa: 'lubelskie' },
        { kod: '08', nazwa: 'lubuskie' },
        { kod: '10', nazwa: 'łódzkie' },
        { kod: '12', nazwa: 'małopolskie' },
        { kod: '14', nazwa: 'mazowieckie' },
        { kod: '16', nazwa: 'opolskie' },
        { kod: '18', nazwa: 'podkarpackie' },
        { kod: '20', nazwa: 'podlaskie' },
        { kod: '22', nazwa: 'pomorskie' },
        { kod: '24', nazwa: 'śląskie' },
        { kod: '26', nazwa: 'świętokrzyskie' },
        { kod: '28', nazwa: 'warmińsko-mazurskie' },
        { kod: '30', nazwa: 'wielkopolskie' },
        { kod: '32', nazwa: 'zachodniopomorskie' }
    ],
    powiaty: {
        '12': [ // małopolskie
            { kod: '01', nazwa: 'Kraków' },
            { kod: '02', nazwa: 'powiat bocheński' },
            { kod: '03', nazwa: 'powiat brzeski' },
            { kod: '04', nazwa: 'powiat chrzanowski' },
            { kod: '05', nazwa: 'powiat dąbrowski' },
            { kod: '06', nazwa: 'powiat gorlicki' },
            { kod: '07', nazwa: 'powiat krakowski' },
            { kod: '08', nazwa: 'powiat limanowski' },
            { kod: '09', nazwa: 'powiat miechowski' },
            { kod: '10', nazwa: 'powiat myślenicki' },
            { kod: '11', nazwa: 'powiat nowosądecki' },
            { kod: '12', nazwa: 'powiat nowotarski' },
            { kod: '13', nazwa: 'powiat olkuski' },
            { kod: '14', nazwa: 'powiat oświęcimski' },
            { kod: '15', nazwa: 'powiat proszowicki' },
            { kod: '16', nazwa: 'powiat suski' },
            { kod: '17', nazwa: 'powiat tarnowski' },
            { kod: '18', nazwa: 'powiat tatrzański' },
            { kod: '19', nazwa: 'powiat wadowicki' },
            { kod: '20', nazwa: 'powiat wielicki' },
            { kod: '61', nazwa: 'Nowy Sącz' },
            { kod: '62', nazwa: 'Tarnów' }
        ],
        '14': [ // mazowieckie
            { kod: '01', nazwa: 'Warszawa' },
            { kod: '02', nazwa: 'powiat białobrzeski' },
            { kod: '03', nazwa: 'powiat ciechanowski' },
            { kod: '04', nazwa: 'powiat garwoliński' },
            { kod: '05', nazwa: 'powiat gostyniński' },
            { kod: '06', nazwa: 'powiat grodziski' },
            { kod: '07', nazwa: 'powiat grójecki' },
            { kod: '08', nazwa: 'powiat kozienicki' },
            { kod: '09', nazwa: 'powiat legionowski' },
            { kod: '10', nazwa: 'powiat lipski' },
            { kod: '11', nazwa: 'powiat łosicki' },
            { kod: '12', nazwa: 'powiat makowski' },
            { kod: '13', nazwa: 'powiat miński' },
            { kod: '14', nazwa: 'powiat mławski' },
            { kod: '15', nazwa: 'powiat nowodworski' },
            { kod: '16', nazwa: 'powiat ostrołęcki' },
            { kod: '17', nazwa: 'powiat ostrowski' },
            { kod: '18', nazwa: 'powiat otwocki' },
            { kod: '19', nazwa: 'powiat piaseczyński' },
            { kod: '20', nazwa: 'powiat płocki' },
            { kod: '21', nazwa: 'powiat płoński' },
            { kod: '22', nazwa: 'powiat pruszkowski' },
            { kod: '23', nazwa: 'powiat przasnyski' },
            { kod: '24', nazwa: 'powiat pułtuski' },
            { kod: '25', nazwa: 'powiat radomski' },
            { kod: '26', nazwa: 'powiat siedlecki' },
            { kod: '27', nazwa: 'powiat sierpecki' },
            { kod: '28', nazwa: 'powiat sochaczewski' },
            { kod: '29', nazwa: 'powiat sokołowski' },
            { kod: '30', nazwa: 'powiat szydłowiecki' },
            { kod: '31', nazwa: 'powiat warszawski zachodni' },
            { kod: '32', nazwa: 'powiat węgrowski' },
            { kod: '33', nazwa: 'powiat wołomiński' },
            { kod: '34', nazwa: 'powiat wyszkowski' },
            { kod: '35', nazwa: 'powiat żuromiński' },
            { kod: '36', nazwa: 'powiat żyrardowski' },
            { kod: '61', nazwa: 'Płock' },
            { kod: '62', nazwa: 'Radom' },
            { kod: '63', nazwa: 'Siedlce' }
        ]
    },
    gminy: {
        '1207': [ // powiat krakowski
            { kod: '01', nazwa: 'Gmina Kraków' },
            { kod: '02', nazwa: 'Gmina Wieliczka' },
            { kod: '03', nazwa: 'Gmina Skawina' },
            { kod: '04', nazwa: 'Gmina Krzeszowice' },
            { kod: '05', nazwa: 'Gmina Zabierzów' }
        ],
        '1217': [ // powiat tarnowski
            { kod: '01', nazwa: 'Gmina Tarnów' },
            { kod: '02', nazwa: 'Gmina Żabno' },
            { kod: '03', nazwa: 'Gmina Radłów' },
            { kod: '04', nazwa: 'Gmina Wierzchosławice' }
        ],
        '1201': [ // Kraków
            { kod: '01', nazwa: 'Dzielnica I Stare Miasto' },
            { kod: '02', nazwa: 'Dzielnica II Grzegórzki' },
            { kod: '03', nazwa: 'Dzielnica III Prądnik Czerwony' }
        ],
        '1202': [ // powiat bocheński
            { kod: '01', nazwa: 'Gmina Bochnia' },
            { kod: '02', nazwa: 'Gmina Drwinia' },
            { kod: '03', nazwa: 'Gmina Łapanów' }
        ]
    },
    miejscowosci: {
        '120701': [ // Gmina Kraków
            { kod: '0001', nazwa: 'Kraków' },
            { kod: '0002', nazwa: 'Nowa Huta' },
            { kod: '0003', nazwa: 'Bronowice' }
        ],
        '120702': [ // Gmina Wieliczka
            { kod: '0001', nazwa: 'Wieliczka' },
            { kod: '0002', nazwa: 'Lednica Górna' },
            { kod: '0003', nazwa: 'Lednica Dolna' }
        ],
        '120703': [ // Gmina Skawina
            { kod: '0001', nazwa: 'Skawina' },
            { kod: '0002', nazwa: 'Rzozów' },
            { kod: '0003', nazwa: 'Korabniki' }
        ],
        '121701': [ // Gmina Tarnów
            { kod: '0001', nazwa: 'Tarnów' },
            { kod: '0002', nazwa: 'Zbylitowska Góra' },
            { kod: '0003', nazwa: 'Nowodąbie' }
        ]
    }
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const param = searchParams.get('param');

    if (!type) {
        return NextResponse.json({ error: 'Missing type parameter' }, { status: 400 });
    }

    try {
        let data: TerytUnit[] = [];

        switch (type) {
            case 'powiaty':
                if (!param) {
                    return NextResponse.json({ error: 'Missing wojewodztwo parameter' }, { status: 400 });
                }
                // Find wojewodztwo code by name
                const wojewodztwo = terytData.wojewodztwa.find(w => w.nazwa === param);
                if (wojewodztwo && terytData.powiaty[wojewodztwo.kod]) {
                    data = terytData.powiaty[wojewodztwo.kod];
                }
                break;
            case 'gminy':
                if (!param) {
                    return NextResponse.json({ error: 'Missing powiat parameter' }, { status: 400 });
                }
                // Find gminy by powiat name
                for (const [wojKod, powiaty] of Object.entries(terytData.powiaty)) {
                    const powiat = powiaty.find(p => p.nazwa === param);
                    if (powiat) {
                        const gminaKey = wojKod + powiat.kod;
                        if (terytData.gminy[gminaKey]) {
                            data = terytData.gminy[gminaKey];
                        }
                        break;
                    }
                }
                break;
            case 'miejscowosci':
                if (!param) {
                    return NextResponse.json({ error: 'Missing gmina parameter' }, { status: 400 });
                }
                // Find miejscowosci by gmina name
                // First find the gmina and its key
                for (const [gminaKey, gminy] of Object.entries(terytData.gminy)) {
                    const gmina = gminy.find(g => g.nazwa === param);
                    if (gmina) {
                        // Construct miejscowosci key: gminaKey + gmina.kod
                        const miejscowosciKey = gminaKey + gmina.kod;
                        if (terytData.miejscowosci[miejscowosciKey]) {
                            data = terytData.miejscowosci[miejscowosciKey];
                        }
                        break;
                    }
                }
                break;
            default:
                return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
        }

        // Transform data to match expected format
        const formattedData = data.map(item => ({
            nazwa: item.nazwa,
            id: item.kod
        }));

        console.log(`Returning ${type} for ${param}:`, formattedData);
        return NextResponse.json(formattedData);
    } catch (error) {
        console.error('TERYT API error:', error);
        return NextResponse.json({ error: 'Failed to fetch data from TERYT API' }, { status: 500 });
    }
} 