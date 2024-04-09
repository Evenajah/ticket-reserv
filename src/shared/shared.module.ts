import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from 'src/schemas/session.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { HashService } from 'src/shared/services/hash/hash.service';
import { MailerService } from 'src/shared/services/mailer/mailer.service';
import { HtmlService } from './services/html/html.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Session.name, schema: SessionSchema },
    ]),
  ],
  providers: [
    HashService,
    MailerService,
    ConfigService,
    HtmlService,
    JwtService,
  ],
  exports: [
    HashService,
    MailerService,
    ConfigService,
    HtmlService,
    JwtService,
    MongooseModule,
  ],
})
export class SharedModule {}
