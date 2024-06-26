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
import { RoleGuard, Roles } from 'src/guards/role/role.guard';
import { EVENT_STATUS, USER_ROLE } from 'src/shared/enums';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';

@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Roles([USER_ROLE.ADMIN])
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Roles([USER_ROLE.ADMIN])
  @Get()
  findAll() {
    return this.eventService.findEvents();
  }

  @Roles([USER_ROLE.ADMIN])
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
