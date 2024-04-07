import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { HostGuard, ParamsTrack } from 'src/guards/host/host.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateReservationDto })
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @UseGuards(AuthGuard, HostGuard)
  @Get(':userId')
  @ParamsTrack('userId')
  findOne(@Param('userId') userId: string) {
    return this.reservationService.findReservationByUserId(userId);
  }
}
