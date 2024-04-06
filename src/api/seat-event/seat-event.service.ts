import { Injectable } from '@nestjs/common';
import { CreateSeatEventDto } from './dto/create-seat-event.dto';
import { UpdateSeatEventDto } from './dto/update-seat-event.dto';

@Injectable()
export class SeatEventService {
  create(createSeatEventDto: CreateSeatEventDto) {
    return 'This action adds a new seatEvent';
  }

  findAll() {
    return `This action returns all seatEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seatEvent`;
  }

  update(id: number, updateSeatEventDto: UpdateSeatEventDto) {
    return `This action updates a #${id} seatEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} seatEvent`;
  }
}
