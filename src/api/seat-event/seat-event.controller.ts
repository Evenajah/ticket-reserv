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
import { CreateSeatEventDto } from './dto/create-seat-event.dto';
import { UpdateSeatEventDto } from './dto/update-seat-event.dto';
import { SeatEventService } from './seat-event.service';
//TODO implement only admin Role
@ApiTags('Seat Event')
@Controller('seat-event')
export class SeatEventController {
  constructor(private readonly seatEventService: SeatEventService) {}

  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateSeatEventDto })
  @Post()
  create(@Body() createSeatEventDto: CreateSeatEventDto) {
    return this.seatEventService.createSeatEvent(createSeatEventDto);
  }

  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateSeatEventDto })
  @Patch()
  update(@Body() updateSeatEventDto: UpdateSeatEventDto) {
    return this.seatEventService.updateSeatEvent(updateSeatEventDto);
  }

  @UseGuards(AuthGuard)
  @Get(':eventId')
  get(@Param('eventId') eventId: string) {
    return this.seatEventService.getSeatEventByEventId(eventId);
  }

  @UseGuards(AuthGuard)
  @Delete(':seatEventId')
  delete(@Param('seatEventId') seatEventId: string) {
    return this.seatEventService.getSeatEventByEventId(seatEventId);
  }
}
