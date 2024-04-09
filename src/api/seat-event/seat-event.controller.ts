import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard, Roles } from 'src/guards/role/role.guard';
import { USER_ROLE } from 'src/shared/enums';
import { CreateSeatEventDto } from './dto/create-seat-event.dto';
import { UpdateSeatEventDto } from './dto/update-seat-event.dto';
import { SeatEventService } from './seat-event.service';

@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Seat Event')
@Controller('seat-event')
export class SeatEventController {
  constructor(private readonly seatEventService: SeatEventService) {}

  @Roles([USER_ROLE.ADMIN])
  @ApiBody({ type: CreateSeatEventDto })
  @Post()
  create(@Body() createSeatEventDto: CreateSeatEventDto) {
    return this.seatEventService.createSeatEvent(createSeatEventDto);
  }

  @Roles([USER_ROLE.ADMIN])
  @Get(':eventId')
  get(@Param('eventId') eventId: string) {
    return this.seatEventService.getSeatEventByEventId(eventId);
  }

  @Roles([USER_ROLE.ADMIN])
  @ApiBody({ type: UpdateSeatEventDto })
  @Patch()
  update(@Body() updateSeatEventDto: UpdateSeatEventDto) {
    return this.seatEventService.updateSeatEvent(updateSeatEventDto);
  }

  @Roles([USER_ROLE.ADMIN])
  @Delete(':seatEventId')
  delete(@Param('seatEventId') seatEventId: string) {
    return this.seatEventService.getSeatEventByEventId(seatEventId);
  }
}
