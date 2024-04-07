import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventDate } from 'src/schemas/event-date.schema';
import { Event } from 'src/schemas/event.schema';
import { SeatEvent } from 'src/schemas/seat-event-schema';
import { SEAT_STATUS } from 'src/shared/enums';
import { CreateSeatEventDto } from './dto/create-seat-event.dto';
import { UpdateSeatEventDto } from './dto/update-seat-event.dto';

@Injectable()
export class SeatEventService {
  constructor(
    @InjectModel(SeatEvent.name)
    private readonly seatEventModel: Model<SeatEvent>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(EventDate.name)
    private readonly eventDateModel: Model<EventDate>,
  ) {}

  async createSeatEvent(createSeatEventDto: CreateSeatEventDto) {
    const eventId = new Types.ObjectId(createSeatEventDto.eventId);

    await this.checkExistEvent(eventId);

    const eventDateId = new Types.ObjectId(createSeatEventDto.eventDateId);

    await this.checkExistEventDate(eventDateId);

    const seatDocuments = createSeatEventDto.seatEvents.map((dto) => {
      const seatId = new Types.ObjectId(dto.seatId);

      return new this.seatEventModel({
        ...dto,
        seatId,
        eventId,
        eventDateId,
        status: SEAT_STATUS.AVAILABLE,
      });
    });

    return await this.seatEventModel.create(seatDocuments);
  }

  async updateSeatEvent(updateSeatEventDto: UpdateSeatEventDto) {
    const updatedSeatEvents = updateSeatEventDto.seatEvents.map(
      (updateValue) => {
        const seatId = new Types.ObjectId(updateValue._id);
        return this.seatEventModel.updateOne({ _id: seatId }, updateValue);
      },
    );

    return await Promise.all(updatedSeatEvents);
  }

  async getSeatEventByEventId(eventId: string) {
    const eId = new Types.ObjectId(eventId);

    await this.checkExistEvent(eId);

    const findSeatsOnEvent = await this.seatEventModel.aggregate([
      {
        $match: {
          eventId: eId,
        },
      },
      {
        $group: {
          _id: '$eventDateId',
          seatData: {
            $addToSet: {
              seatId: '$seatId',
              status: '$status',
              price: '$price',
            },
          },
        },
      },
      {
        $unwind: {
          path: '$seatData',
        },
      },
      {
        $lookup: {
          from: 'seats',
          localField: 'seatData.seatId',
          foreignField: '_id',
          as: 'seatDetail',
        },
      },
      {
        $addFields: {
          'seatData.seatDetail': {
            $arrayElemAt: ['$seatDetail', 0],
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          seatData: {
            $push: '$seatData',
          },
        },
      },
      {
        $lookup: {
          from: 'eventdates',
          localField: '_id',
          foreignField: '_id',
          as: 'dateDetail',
        },
      },
      {
        $addFields: {
          dateDetail: {
            $arrayElemAt: ['$dateDetail', 0],
          },
        },
      },
    ]);

    return findSeatsOnEvent;
  }

  async deleteSeatEvent(id: string) {
    const seatEventId = new Types.ObjectId(id);

    return await this.seatEventModel.deleteOne({ _id: seatEventId });
  }

  private async checkExistEventDate(eventDateId: Types.ObjectId) {
    const findEventDate = await this.eventDateModel.findById(eventDateId);
    if (!findEventDate) {
      throw new BadRequestException('Event Date Not Found');
    }
  }

  private async checkExistEvent(eventId: Types.ObjectId) {
    const findEventDate = await this.eventModel.findById(eventId);
    if (!findEventDate) {
      throw new BadRequestException('Event Date Not Found');
    }
  }
}
