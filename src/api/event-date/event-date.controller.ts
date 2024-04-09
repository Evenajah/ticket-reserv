import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard, Roles } from 'src/guards/role/role.guard';
import { USER_ROLE } from 'src/shared/enums';
import { CreateEventDateDto } from './dto/create-event-date.dto';
import { EventDateService } from './event-date.service';

@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Event Date')
@Controller('event-date')
export class EventDateController {
  constructor(private readonly eventDateService: EventDateService) {}

  @Roles([USER_ROLE.ADMIN])
  @ApiBody({ type: CreateEventDateDto })
  @Post()
  create(@Body() createEventDateDto: CreateEventDateDto) {
    return this.eventDateService.createEventDate(createEventDateDto);
  }
}
