import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from 'src/schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}
  async createLocation(createLocationDto: CreateLocationDto) {
    const newLocation = new this.locationModel({
      name: createLocationDto.name,
      totalSeats: createLocationDto.totalSeats,
    });
    return await newLocation.save();
  }
}
