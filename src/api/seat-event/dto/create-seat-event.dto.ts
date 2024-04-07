import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, ValidateNested } from 'class-validator';

export class CreateSeatEventDto {
  @ApiProperty()
  @IsMongoId()
  eventId: string;

  @ApiProperty()
  @IsMongoId()
  eventDateId: string;

  @ApiProperty({ type: () => SeatEvent, isArray: true })
  @ValidateNested()
  @Type(() => SeatEvent)
  seatEvents: SeatEvent[];
}

export class SeatEvent {
  @ApiProperty()
  @IsMongoId()
  seatId: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
