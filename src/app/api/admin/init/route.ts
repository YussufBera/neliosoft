import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // Create table if not exists
    await pool.query(`
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
    `);

    // Add columns individually to ensure they exist
    const columns = [
      'business_type VARCHAR(100)',
      'team_size VARCHAR(50)',
      'budget VARCHAR(100)',
      'business_name VARCHAR(255)',
      'daily_visitors VARCHAR(50)'
    ];

    for (const col of columns) {
      try {
        // Ensure schema is updated
        await pool.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS ${col}`);
      } catch (e) {
        console.error(`Failed to update schema for column ${col}:`, e);
      }
    }

    return NextResponse.json({ result: 'Schema updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Init Error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
