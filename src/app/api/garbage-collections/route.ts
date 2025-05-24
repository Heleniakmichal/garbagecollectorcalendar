import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/edgedb';

export async function GET() {
    const collections = await client.query(
        `select GarbageCollection {
            id,
            indeks,
            miesiac,
            dzien,
            typ,
            data_utworzenia,
            lokalizacja: {
                id,
                nazwa
            }
        }` 
    );
    return NextResponse.json(collections);
}

export async function POST(req: NextRequest) {
    const { indeks, lokalizacjaId, miesiac, dzien, typ } = await req.json();
    if (!indeks || !lokalizacjaId || !miesiac || !dzien || !typ) {
        return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 });
    }
    const result = await client.querySingle(
        `insert GarbageCollection {
            indeks := <int64>$indeks,
            miesiac := <str>$miesiac,
            dzien := <str>$dzien,
            typ := <str>$typ,
            data_utworzenia := datetime_current(),
            lokalizacja := (select detached Location filter .id = <uuid>$lokalizacjaId)
        }`,
        { indeks, lokalizacjaId, miesiac, dzien, typ }
    );
    return NextResponse.json(result);
} 