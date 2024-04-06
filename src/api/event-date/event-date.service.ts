import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventDate } from 'src/schemas/event-date.schema';
import { Event } from 'src/schemas/event.schema';
import { CreateEventDateDto } from './dto/create-event-date.dto';
import { UpdateEventDateDto } from './dto/update-event-date.dto';

@Injectable()
export class EventDateService {
  constructor(
    @InjectModel(EventDate.name)
    private readonly eventDateModel: Model<EventDate>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async createEventDate(createEventDateDto: CreateEventDateDto) {
    const eventId = new Types.ObjectId(createEventDateDto.eventId);

    const findEvent = await this.eventModel.findById(eventId);

    if (!findEvent) {
      throw new NotFoundException('Event Not Found');
    }

    const seatDocuments = createEventDateDto.dates.map(
      (dto) => new this.eventDateModel({ ...dto, eventId }),
    );

    return await this.eventDateModel.create(seatDocuments);
  }

  findAll() {
    return `This action returns all eventDate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventDate`;
  }

  update(id: number, updateEventDateDto: UpdateEventDateDto) {
    return `This action updates a #${id} eventDate`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventDate`;
  }
}
