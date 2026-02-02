import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// FORCE NODEJS RUNTIME (Essential for Nodemailer on Vercel)
export const runtime = 'nodejs';

export async function POST(req: Request) {
    let stage = 'Init';
    try {
        const { name, email, phone, domain, message } = await req.json();

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
            subject: `New Lead: ${name}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Domain: ${domain || 'N/A'}

Message:
${message}
            `,
            html: `
<h3>New Lead Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || 'N/A'}</p>
<p><strong>Domain:</strong> ${domain || 'N/A'}</p>
<hr/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `,
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
