import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventDate } from 'src/schemas/event-date.schema';
import { Reservation } from 'src/schemas/reservation.schema';
import { SeatEvent } from 'src/schemas/seat-event-schema';
import { SEAT_STATUS } from 'src/shared/enums';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(EventDate.name)
    private readonly eventDateModel: Model<EventDate>,
    @InjectModel(SeatEvent.name)
    private readonly seatEventModel: Model<SeatEvent>,
  ) {}

  async createReservation(createReservationDto: CreateReservationDto) {
    const eventId = new Types.ObjectId(createReservationDto.eventId);

    await this.checkExistEvent(eventId);

    const eventDateId = new Types.ObjectId(createReservationDto.eventDateId);

    await this.checkExistEventDate(eventDateId);

    const session = await this.reservationModel.db.startSession();

    session.startTransaction();

    try {
      const seatEventObjectIds = createReservationDto.seatEventIds.map(
        (id) => new Types.ObjectId(id),
      );

      const seatEventItems = await this.seatEventModel.find({
        _id: { $in: seatEventObjectIds },
      });

      const canReserv = seatEventItems.every((seatEventItem) => {
        return seatEventItem.status === SEAT_STATUS.AVAILABLE;
      });

      if (!canReserv) {
        throw new BadRequestException('Some seat not available now!');
      }

      const updateSeatEventArr = seatEventItems.map((seatEventItem) => {
        seatEventItem.status = SEAT_STATUS.RESERVED;
        return seatEventItem.save();
      });

      const newReservation = new this.reservationModel({
        eventId,
        eventDateId,
        userId: new Types.ObjectId(createReservationDto.userId),
        seatEventIds: seatEventObjectIds,
      });

      await Promise.all([newReservation.save(), updateSeatEventArr]);

      await session.commitTransaction();

      session.endSession();

      return {
        statusCode: 200,
        message: 'Reservation Completed.',
      };
    } catch (error) {
      console.log({ error });
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(error?.response?.message);
    }
  }

  async findReservationByUserId(userId: string) {
    const uId = new Types.ObjectId(userId);

    const findReservation = await this.reservationModel.aggregate([
      {
        $match: {
          userId: uId,
        },
      },
      {
        $lookup: {
          from: 'events',
          localField: 'eventId',
          foreignField: '_id',
          as: 'eventDetail',
        },
      },
      {
        $addFields: {
          eventDetail: {
            $arrayElemAt: ['$eventDetail', 0],
          },
        },
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'eventDetail.locationId',
          foreignField: '_id',
          as: 'eventDetail.locationDetail',
        },
      },
      {
        $addFields: {
          'eventDetail.locationDetail': {
            $arrayElemAt: ['$eventDetail.locationDetail', 0],
          },
        },
      },
      {
        $lookup: {
          from: 'eventdates',
          localField: 'eventDateId',
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
      {
        $unwind: {
          path: '$seatEventIds',
        },
      },
      {
        $lookup: {
          from: 'seatevents',
          localField: 'seatEventIds',
          foreignField: '_id',
          as: 'seatEventDetails',
        },
      },
      {
        $addFields: {
          seatEventDetails: {
            $arrayElemAt: ['$seatEventDetails', 0],
          },
        },
      },
      {
        $lookup: {
          from: 'seats',
          localField: 'seatEventDetails.seatId',
          foreignField: '_id',
          as: 'seatEventDetails.seatDetail',
        },
      },
      {
        $addFields: {
          'seatEventDetails.seatDetail': {
            $arrayElemAt: ['$seatEventDetails.seatDetail', 0],
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          userId: {
            $first: '$userId',
          },
          seatEventDetails: {
            $push: '$seatEventDetails',
          },
          eventDetail: {
            $first: '$eventDetail',
          },
          eventDateDetail: {
            $first: '$dateDetail',
          },
        },
      },
    ]);

    return findReservation;
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
