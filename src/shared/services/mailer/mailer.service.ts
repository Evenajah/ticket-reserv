// email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { HtmlService } from '../html/html.service';

@Injectable()
export class MailerService {
  private readonly transporter;

  constructor(
    private configService: ConfigService,
    private htmlService: HtmlService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_SERVER'),
      port: this.configService.get<string>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USERNAME'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  sendVerificationEmail(email: string, verifyToken: string): Promise<void> {
    const verificationUri = this.configService.get<string>('VERIFICATION_URI');
    const verificationLink = `${verificationUri}/${verifyToken}`;
    return this.transporter.sendMail({
      from: 'ticket_reserv@test.com',
      to: email,
      subject: 'Email Verification',
      html: this.htmlService.getVerifyEmailTemplate(verificationLink),
    });
  }

  sendForgotPasswordEmail(email: string, verifyToken: string): Promise<void> {
    const verificationUri = this.configService.get<string>(
      'FOTGOT_PASSWORD_URI',
    );
    const verificationLink = `${verificationUri}/${verifyToken}`;

    return this.transporter.sendMail({
      from: 'ticket_reserv@test.com',
      to: email,
      subject: 'Email Verification',
      html: this.htmlService.getFotgotPasswordEmailTemplate(verificationLink),
    });
  }
}
