import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/shared/services/hash/hash.service';
import { MailerService } from 'src/shared/services/mailer/mailer.service';
import { HtmlService } from './services/html/html.service';

@Module({
  imports: [],
  providers: [
    HashService,
    MailerService,
    ConfigService,
    HtmlService,
    JwtService,
  ],
  exports: [HashService, MailerService, ConfigService, HtmlService, JwtService],
})
export class SharedModule {}
