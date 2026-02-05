import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const { name, email, phone, countryCode, message, business_type, team_size, budget } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const fullPhone = countryCode && phone ? `${countryCode} ${phone}` : (phone || 'N/A');

        await pool.query(
            'INSERT INTO messages (name, email, phone, message, business_type, team_size, budget, date) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())',
            [name, email, fullPhone, message || "Lead Form Submission", business_type || null, team_size || null, budget || null]
        );

        return NextResponse.json({ success: true, message: 'Message saved successfully' });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({
            error: 'Database Error',
            details: error.message
        }, { status: 500 });
    }
}
