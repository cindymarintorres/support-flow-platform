import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailer: MailerService) { }

    async sendWelcome(to: string, name: string) {
        await this.mailer.sendMail({
            to,
            subject: 'Bienvenido a SupportFlow',
            html: `<h1>Hola ${name}!</h1><p>Tu cuenta fue creada.</p>`,
        });
    }

    async sendTicketCreated(to: string, ticketId: string) {
        await this.mailer.sendMail({
            to,
            subject: `Ticket #${ticketId} creado`,
            html: `<p>Tu ticket <strong>#${ticketId}</strong> fue recibido.</p>`,
        });
    }

    async sendPasswordReset(to: string, token: string) {
        const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

        await this.mailer.sendMail({
            to,
            subject: 'Restablecer contraseña - SupportFlow',
            html: `
            <h1>Restablecer contraseña</h1>
            <p>Recibimos una solicitud para restablecer tu contraseña.</p>
            <p>
                <a href="${url}">
                    Haz clic aquí para restablecer tu contraseña
                </a>
            </p>
            <p>Este enlace expira en <strong>15 minutos</strong>.</p>
            <p>Si no solicitaste esto, ignora este correo.</p>
        `,
        });
    }
}