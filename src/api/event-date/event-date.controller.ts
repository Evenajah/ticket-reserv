import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateEventDateDto } from './dto/create-event-date.dto';
import { EventDateService } from './event-date.service';

//TODO implement only admin Role
@ApiTags('Event Date')
@Controller('event-date')
export class EventDateController {
  constructor(private readonly eventDateService: EventDateService) {}

  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateEventDateDto })
  @Post()
  create(@Body() createEventDateDto: CreateEventDateDto) {
    return this.eventDateService.createEventDate(createEventDateDto);
  }
}
