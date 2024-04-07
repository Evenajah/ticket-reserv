import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateSeatDto {
  @ApiProperty()
  @IsMongoId()
  locationId: string;

  @ApiProperty({ type: () => Seat, isArray: true })
  @ValidateNested()
  @Type(() => Seat)
  seats: Seat[];
}

export class Seat {
  @ApiProperty()
  @IsString()
  zone: string;

  @ApiProperty()
  @IsString()
  row: string;

  @ApiProperty()
  @IsNumber()
  seatNumber: number;
}
