import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from 'src/schemas/location.schema';
import { Seat, SeatSchema } from 'src/schemas/seat.schema';
import { SharedModule } from 'src/shared/shared.module';
import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seat.name, schema: SeatSchema },
      { name: Location.name, schema: LocationSchema },
    ]),
    SharedModule,
  ],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
