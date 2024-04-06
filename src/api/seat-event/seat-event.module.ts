import { Module } from '@nestjs/common';
import { SeatEventService } from './seat-event.service';
import { SeatEventController } from './seat-event.controller';

@Module({
  controllers: [SeatEventController],
  providers: [SeatEventService],
})
export class SeatEventModule {}
