import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        // 1. Validate Input
        if (!name || !email || !message) {
            console.error('Missing fields:', { name, email, message });
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // 2. Validate Env Vars
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            console.error('Missing GMAIL_USER or GMAIL_PASS env vars');
            return NextResponse.json({ error: 'Server misconfiguration: Missing credentials' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS?.replace(/\s+/g, ''), // Fix spaces
            },
        });

        // 3. Verify Connection *Before* Sending
        try {
            await transporter.verify();
            console.log('Nodemailer connection verified.');
        } catch (verifyError) {
            console.error('Nodemailer verification failed:', verifyError);
            return NextResponse.json({ error: 'Failed to connect to Gmail', details: verifyError }, { status: 500 });
        }

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'infoneliosoft@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message:
${message}
            `,
            html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to infoneliosoft@gmail.com`);

        return NextResponse.json({ success: true, message: 'Email sent successfully!' });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({
            error: 'Failed to send email',
            details: error.message || error.toString()
        }, { status: 500 });
    }
}
