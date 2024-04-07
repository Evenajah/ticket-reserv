import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit of results per page',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset of results for pagination',
  })
  findAll(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.eventService.findEvents(limit, offset);
  }

  @UseGuards(AuthGuard)
  @Patch(':eventId')
  update(@Param('eventId') id: string, @Body() status: EVENT_STATUS) {
    return this.eventService.updateEventStatus(id, status);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.removeEvent(+id);
  }
}
