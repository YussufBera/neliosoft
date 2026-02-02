import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// FORCE NODEJS RUNTIME (Essential for Nodemailer on Vercel)
export const runtime = 'nodejs';

export async function POST(req: Request) {
    let stage = 'Init';
    try {
        const { name, email, message } = await req.json();

        stage = 'EnvCheck';
        const user = process.env.GMAIL_USER;
        const pass = process.env.GMAIL_PASS;

        if (!user || !pass) {
            return NextResponse.json({
                error: 'Missing credentials',
                details: `User: ${!!user ? 'Set' : 'Missing'}, Pass: ${!!pass ? 'Set' : 'Missing'}`
            }, { status: 500 });
        }

        // Clean credentials (only remove whitespaces)
        const cleanUser = user.trim();
        const cleanPass = pass.replace(/\s+/g, '');

        stage = 'TransporterCreate';
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: cleanUser,
                pass: cleanPass,
            },
        });

        // Verify connection (can be slow, but useful for debug)
        stage = 'Verify';
        await transporter.verify();

        stage = 'Send';
        const mailOptions = {
            from: cleanUser,
            to: 'infoneliosoft@gmail.com',
            subject: `Contact: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>${message}</p>`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent' });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({
            error: 'Server Error',
            details: `[Server] Stage: ${stage} | ${error.message}`
        }, { status: 500 });
    }
}
