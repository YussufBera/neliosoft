import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic'; // Ensure no caching

export async function GET() {
    try {
        const { rows } = await sql`SELECT * FROM messages ORDER BY date DESC`;
        return NextResponse.json(rows);
    } catch (error: any) {
        console.error('API Admin Error:', error);
        // If table doesn't exist yet, return empty array gracefully
        if (error.message.includes('relation "messages" does not exist')) {
            return NextResponse.json([]);
        }
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
