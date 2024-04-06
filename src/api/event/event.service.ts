import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from 'src/schemas/event.schema';
import { Location } from 'src/schemas/location.schema';
import { EVENT_STATUS } from 'src/shared/enums';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const locationId = new Types.ObjectId(createEventDto.locationId);

    const findLocation = await this.locationModel.findById(locationId);

    if (!findLocation) {
      throw new NotFoundException('Location Not Found');
    }

    const newEvent = new this.eventModel({
      ...createEventDto,
      locationId,
      status: EVENT_STATUS.INACTIVE,
    });

    return await newEvent.save();
  }

  findEvents(limit: number, offset: number): Promise<Event[]> {
    return this.eventModel.find().skip(offset).limit(limit).exec();
  }

  //TODO update event status
  updateEventStatus(id: string, status: EVENT_STATUS) {}

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
