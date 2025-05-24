import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/edgedb';

export async function GET() {
    const locations = await client.query(
        `select Location { id, nazwa }` 
    );
    return NextResponse.json(locations);
}

export async function POST(req: NextRequest) {
    const { nazwa } = await req.json();
    if (!nazwa) {
        return NextResponse.json({ error: 'Brak nazwy lokalizacji' }, { status: 400 });
    }
    const result = await client.querySingle(
        `insert Location { nazwa := <str>$nazwa }`,
        { nazwa }
    );
    return NextResponse.json(result);
} 