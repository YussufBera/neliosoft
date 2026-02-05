import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const result = await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT NOT NULL,
        business_type VARCHAR(100),
        team_size VARCHAR(50),
        budget VARCHAR(100),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'unread'
      );

      ALTER TABLE messages ADD COLUMN IF NOT EXISTS business_type VARCHAR(100);
      ALTER TABLE messages ADD COLUMN IF NOT EXISTS team_size VARCHAR(50);
      ALTER TABLE messages ADD COLUMN IF NOT EXISTS budget VARCHAR(100);
    `);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
