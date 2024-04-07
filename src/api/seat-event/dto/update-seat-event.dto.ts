import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsNumber, ValidateNested } from 'class-validator';
import { SEAT_STATUS } from 'src/shared/enums';

export class UpdateSeatEventDto {
  @ApiProperty({ type: () => SeatEvent, isArray: true })
  @ValidateNested()
  @Type(() => SeatEvent)
  seatEvents: SeatEvent[];
}

export class SeatEvent {
  @ApiProperty()
  @IsMongoId()
  _id: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsEnum(SEAT_STATUS)
  status: SEAT_STATUS;
}
