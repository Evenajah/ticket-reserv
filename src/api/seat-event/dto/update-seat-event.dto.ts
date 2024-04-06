import { PartialType } from '@nestjs/mapped-types';
import { CreateSeatEventDto } from './create-seat-event.dto';

export class UpdateSeatEventDto extends PartialType(CreateSeatEventDto) {}
