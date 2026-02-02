import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force usage of Node.js APIs for file system access
export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const { name, email, phone, countryCode, message } = await req.json();

        // Validate basic fields
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newMessage = {
            id: Date.now().toString(), // Simple unique ID
            date: new Date().toISOString(),
            name,
            email,
            phone: countryCode && phone ? `${countryCode} ${phone}` : (phone || 'N/A'),
            message,
            status: 'unread' // New messages are unread by default
        };

        // Define path to data file
        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, 'messages.json');

        // Ensure directory exists
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Read existing messages
        let messages = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            try {
                messages = JSON.parse(fileContent);
            } catch (error) {
                console.error("Error parsing messages file, resetting to empty array:", error);
                messages = [];
            }
        }

        // Add new message
        messages.unshift(newMessage); // Add to beginning of array

        // Save back to file
        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

        return NextResponse.json({ success: true, message: 'Message saved successfully' });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({
            error: 'Server Error',
            details: error.message
        }, { status: 500 });
    }
}
