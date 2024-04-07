import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from 'src/schemas/location.schema';
import { Reservation, ReservationSchema } from 'src/schemas/reservation.schema';
import { SeatEvent, SeatEventSchema } from 'src/schemas/seat-event-schema';
import { Seat, SeatSchema } from 'src/schemas/seat.schema';
import { Session, SessionSchema } from 'src/schemas/session.schema';
import { SharedModule } from 'src/shared/shared.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seat.name, schema: SeatSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Location.name, schema: LocationSchema },
      { name: SeatEvent.name, schema: SeatEventSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    SharedModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
