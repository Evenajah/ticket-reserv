import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';
import { Session, SessionSchema } from './schema/session.schema';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Session.name, schema: SessionSchema },
    ]),
    SharedModule,
  ],
  controllers: [AuthenController],
  providers: [AuthenService],
})
export class AuthenModule {}
