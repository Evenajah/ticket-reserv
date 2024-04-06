import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatEventService } from './seat-event.service';
import { CreateSeatEventDto } from './dto/create-seat-event.dto';
import { UpdateSeatEventDto } from './dto/update-seat-event.dto';

@Controller('seat-event')
export class SeatEventController {
  constructor(private readonly seatEventService: SeatEventService) {}

  @Post()
  create(@Body() createSeatEventDto: CreateSeatEventDto) {
    return this.seatEventService.create(createSeatEventDto);
  }

  @Get()
  findAll() {
    return this.seatEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatEventDto: UpdateSeatEventDto) {
    return this.seatEventService.update(+id, updateSeatEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatEventService.remove(+id);
  }
}
