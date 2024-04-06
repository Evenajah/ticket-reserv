import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/schemas/event.schema';
import { Session, SessionSchema } from 'src/schemas/session.schema';
import { SharedModule } from 'src/shared/shared.module';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Session.name, schema: SessionSchema },
    ]),
    SharedModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
