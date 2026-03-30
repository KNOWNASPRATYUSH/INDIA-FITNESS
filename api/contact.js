import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Test mode when Vercel env variables are not yet configured
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log('--- NEW CONTACT SUBMISSION (DEV LOG) ---');
            console.log(`Name: ${name}`);
            console.log(`Email: ${email}`);
            console.log(`Phone: ${phone}`);
            console.log(`Message: ${message}`);
            console.log('----------------------------------------');
            return res.status(200).json({ 
                success: true, 
                message: 'Your message has been successfully logged! (SMTP not configured)' 
            });
        }

        // Production mode
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: process.env.SMTP_PORT || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"India Fitness Website" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            replyTo: email,
            subject: `New India Fitness Contact from ${name}`,
            text: `
You have received a new contact submission from your website.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
            `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Email API Error:', error);
        return res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
}
