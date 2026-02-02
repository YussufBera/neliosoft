import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY date DESC');
        return NextResponse.json(result.rows);
    } catch (error: any) {
        console.error('API Admin Error:', error);
        if (error?.code === '42P01' || error.message.includes('does not exist')) {
            return NextResponse.json([]);
        }
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
