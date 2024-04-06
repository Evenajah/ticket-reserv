import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsNumber()
  totalSeats: number;
}
