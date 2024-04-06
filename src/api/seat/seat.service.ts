import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Location } from 'src/schemas/location.schema';
import { Seat } from 'src/schemas/seat.schema';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    @InjectModel(Seat.name) private readonly seatModel: Model<Seat>,
  ) {}
  async createSeat(createSeatDto: CreateSeatDto) {
    const locationId = new Types.ObjectId(createSeatDto.locationId);
    const findAllSeat = await this.seatModel.find({ locationId });

    const findLocation = await this.locationModel.findById(locationId);

    if (!findLocation) {
      throw new NotFoundException('Location Not Found');
    }

    const isOverSeat =
      findAllSeat.length + createSeatDto.seats.length > findLocation.totalSeats;

    if (isOverSeat) {
      throw new BadRequestException('Overflow seat to add');
    }

    const seatDocuments = createSeatDto.seats.map(
      (dto) => new this.seatModel({ ...dto, locationId }),
    );

    return await this.seatModel.create(seatDocuments);
  }

  findAll() {
    return `This action returns all seat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seat`;
  }

  update(id: number, updateSeatDto: UpdateSeatDto) {
    return `This action updates a #${id} seat`;
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}
