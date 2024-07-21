import nodemailer from 'nodemailer';

interface IEmailOptions {
    to: string | string[];
    from: string;
    subject: string;
    html: string;
    attachments?: IAttachement[]
}

interface IAttachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'user@pruebas.com',
            pass: 'jdjdjdjdjk'
        }
    });

    async sendEmail(options: IEmailOptions): Promise<boolean>{
        const { to, from, subject, html, attachments } = options;
        try {
            await this.transporter.sendMail({
                to,
                from,
                subject,
                html,
                attachments
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithLogsFiles(to: string | string[]): Promise<boolean>{
        const attachments: IAttachement[] = [
            { filename: 'logs-high.log', path: '/logs/logs-high.log' },
            { filename: 'logs-medium.log', path: '/logs/logs-medium.log' },
            { filename: 'logs-low.log', path: '/logs/logs-low.log' }
        ]
        return this.sendEmail({ 
            to, 
            from: 'mio@mio.com', 
            subject: 'files', 
            html: '<p>archivos</p>',
            attachments
        });
    }
}