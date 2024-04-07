import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventDate, EventDateSchema } from 'src/schemas/event-date.schema';
import { EventSchema } from 'src/schemas/event.schema';
import { Reservation, ReservationSchema } from 'src/schemas/reservation.schema';
import { SeatEvent, SeatEventSchema } from 'src/schemas/seat-event-schema';
import { Seat, SeatSchema } from 'src/schemas/seat.schema';
import { Session, SessionSchema } from 'src/schemas/session.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { SharedModule } from 'src/shared/shared.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seat.name, schema: SeatSchema },
      { name: Session.name, schema: SessionSchema },
      { name: SeatEvent.name, schema: SeatEventSchema },
      { name: Reservation.name, schema: ReservationSchema },
      { name: Event.name, schema: EventSchema },
      { name: EventDate.name, schema: EventDateSchema },
      { name: User.name, schema: UserSchema },
    ]),
    SharedModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
