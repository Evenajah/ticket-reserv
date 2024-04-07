import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventDate, EventDateSchema } from 'src/schemas/event-date.schema';
import { Event, EventSchema } from 'src/schemas/event.schema';
import { SeatEvent, SeatEventSchema } from 'src/schemas/seat-event-schema';
import { Session, SessionSchema } from 'src/schemas/session.schema';
import { SharedModule } from 'src/shared/shared.module';
import { SeatEventController } from './seat-event.controller';
import { SeatEventService } from './seat-event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: EventDate.name, schema: EventDateSchema },
      { name: SeatEvent.name, schema: SeatEventSchema },
      { name: Session.name, schema: SessionSchema },
    ]),
    SharedModule,
  ],
  controllers: [SeatEventController],
  providers: [SeatEventService],
})
export class SeatEventModule {}
