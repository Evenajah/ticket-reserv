import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';

@Module({
  imports: [SharedModule],
  controllers: [AuthenController],
  providers: [AuthenService],
})
export class AuthenModule {}
