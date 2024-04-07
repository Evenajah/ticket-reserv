import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateSeatDto } from './dto/create-seat.dto';
import { SeatService } from './seat.service';

//TODO implement only admin Role
@ApiTags('Seat')
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateSeatDto })
  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.createSeat(createSeatDto);
  }
}
