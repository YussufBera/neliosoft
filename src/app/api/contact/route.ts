import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
                details: `User: ${!!user}, Pass: ${!!pass}`
            }, { status: 500 });
        }

        // Clean credentials
        const cleanUser = user.trim();
        const cleanPass = pass.replace(/[^a-zA-Z0-9]/g, ''); // Keep only alphanumeric, remove spaces/symbols

        stage = 'TransporterCreate';
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: cleanUser,
                pass: cleanPass,
            },
        });

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
        console.error('Error:', error);
        return NextResponse.json({
            error: 'Failed',
            details: `Stage: ${stage} | Error: ${error.message} | Name: ${error.name}`
        }, { status: 500 });
    }
}
