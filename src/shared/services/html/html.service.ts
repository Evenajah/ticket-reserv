import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HtmlService {
  constructor(private configService: ConfigService) {}

  getVerifiedUserTemplate() {
    const verificationUri = this.configService.get<string>('APPLICATION_URI');
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Email Verified</title>
      </head>
      <body>
        <h1>Email Verified Successfully</h1>
        <p>Your email has been successfully verified.</p>
       <a href="${verificationUri}">Go to sign in </a>
      </body>
    </html>
  `;

    return htmlTemplate;
  }

  getVerifyEmailTemplate(verificationLink: string) {
    const htmlTemplate = `
    <div style="font-family: Arial, sans-serif;">
      <h1 style="text-align:center;background:#336699;padding:20px;color:white;border-radius:10px">Verify Email</h1>
      <p>Welcome to join ticket reservation test!</p>
      <img width="300" style="margin:0 auto;display:block;border-radius:10px" src="https://cdn.pixabay.com/photo/2017/11/17/09/37/finger-2956974_1280.jpg"/>
      <p>Please click <a href="${verificationLink}" style="color: #007bff;">hear</a> to verify your email address.</p>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>Best regards,<br/>Ticket reserv Group</p>
      </div>
  `;

    return htmlTemplate;
  }

  getFotgotPasswordEmailTemplate(verificationLink: string) {
    const htmlTemplate = `
    <div style="font-family: Arial, sans-serif;">
      <h1 style="text-align:center;background:#336699;padding:20px;color:white;border-radius:10px">Forgot Password</h1>
      <img width="300" style="margin:0 auto;display:block;border-radius:10px" src="https://cdn.pixabay.com/photo/2017/11/17/09/37/finger-2956974_1280.jpg"/>
      <p>Please click <a href="${verificationLink}" style="color: #007bff;">hear</a> to create new password</p>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>Best regards,<br/>Ticket reserv Group</p>
      </div>
  `;

    return htmlTemplate;
  }
}
