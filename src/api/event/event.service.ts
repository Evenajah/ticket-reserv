import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/schemas/event.schema';
import { EVENT_STATUS } from 'src/shared/enums';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel({
      ...createEventDto,
      status: EVENT_STATUS.ACTIVE,
    });

    return await newEvent.save();
  }

  async findEvents(limit: number, offset: number): Promise<Event[]> {
    return this.eventModel.find().skip(offset).limit(limit).exec();
  }

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
