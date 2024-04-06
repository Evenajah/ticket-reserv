import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventDate, EventDateSchema } from 'src/schemas/event-date.schema';
import { Event } from 'src/schemas/event.schema';
import { Session, SessionSchema } from 'src/schemas/session.schema';
import { SharedModule } from 'src/shared/shared.module';
import { EventDateController } from './event-date.controller';
import { EventDateService } from './event-date.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: EventDate.name, schema: EventDateSchema },
      { name: Event.name, schema: EventDateSchema },
    ]),
    SharedModule,
  ],
  controllers: [EventDateController],
  providers: [EventDateService],
})
export class EventDateModule {}
