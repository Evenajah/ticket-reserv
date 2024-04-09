import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from 'src/schemas/location.schema';
import { SharedModule } from 'src/shared/shared.module';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
    SharedModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
