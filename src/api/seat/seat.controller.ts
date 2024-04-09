import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard, Roles } from 'src/guards/role/role.guard';
import { USER_ROLE } from 'src/shared/enums';
import { CreateSeatDto } from './dto/create-seat.dto';
import { SeatService } from './seat.service';

@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Seat')
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Roles([USER_ROLE.ADMIN])
  @ApiBody({ type: CreateSeatDto })
  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.createSeat(createSeatDto);
  }
}
