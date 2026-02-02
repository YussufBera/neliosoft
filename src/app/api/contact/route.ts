import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
    try {
        const { name, email, phone, countryCode, message } = await req.json();

        // Validate basic fields
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const fullPhone = countryCode && phone ? `${countryCode} ${phone}` : (phone || 'N/A');

        // Insert into Postgres
        await sql`
            INSERT INTO messages (name, email, phone, message, date)
            VALUES (${name}, ${email}, ${fullPhone}, ${message}, NOW());
        `;

        return NextResponse.json({ success: true, message: 'Message saved successfully' });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({
            error: 'Database Error',
            details: error.message
        }, { status: 500 });
    }
}
