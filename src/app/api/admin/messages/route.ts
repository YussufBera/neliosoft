import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'data/messages.json');

        if (!fs.existsSync(filePath)) {
            return NextResponse.json([]);
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const messages = JSON.parse(fileContent);

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Admin API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
