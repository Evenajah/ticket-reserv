import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { EVENT_STATUS } from 'src/shared/enums';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

//TODO implement only admin Role
@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.eventService.findEvents();
  }

  @UseGuards(AuthGuard)
  @Patch(':eventId')
  update(@Param('eventId') id: string, @Body() status: EVENT_STATUS) {
    return this.eventService.updateEventStatus(id, status);
  }

  //TODO implement delete event
  // @UseGuards(AuthGuard)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventService.removeEvent(+id);
  // }
}
