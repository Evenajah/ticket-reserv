import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from 'src/schemas/event.schema';
import { Location } from 'src/schemas/location.schema';
import { CACHE_KEY, EVENT_STATUS } from 'src/shared/enums';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const locationId = new Types.ObjectId(createEventDto.locationId);

    const findLocation = await this.locationModel.findById(locationId);

    if (!findLocation) {
      throw new BadRequestException('Location Not Found');
    }

    const newEvent = new this.eventModel({
      ...createEventDto,
      locationId,
      status: EVENT_STATUS.INACTIVE,
    });

    await this.cacheService.del(CACHE_KEY.EVENTS);

    return await newEvent.save();
  }

  async findEvents(limit: number, offset: number): Promise<Event[]> {
    const cacheEvents = await this.cacheService.get<any>(CACHE_KEY.EVENTS);

    if (cacheEvents) {
      return cacheEvents;
    }

    const events = await this.eventModel.aggregate([
      {
        $lookup: {
          from: 'locations',
          localField: 'locationId',
          foreignField: '_id',
          as: 'locationData',
        },
      },
      {
        $addFields: {
          locationData: {
            $arrayElemAt: ['$locationData', 0],
          },
        },
      },
      {
        $lookup: {
          from: 'eventdates',
          localField: '_id',
          foreignField: 'eventId',
          as: 'dateData',
        },
      },
    ]);

    await this.cacheService.set(CACHE_KEY.EVENTS, events);

    return events;
  }

  updateEventStatus(id: string, status: EVENT_STATUS) {
    return this.eventModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { status } },
    );
  }

  removeEvent(id: number) {
    return `This action removes a #${id} event`;
  }
}
