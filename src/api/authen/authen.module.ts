import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { Session, SessionSchema } from '../../schemas/session.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';

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
