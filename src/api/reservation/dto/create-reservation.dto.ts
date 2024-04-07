import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { IsArrayOfMongoIds } from 'src/shared/custom-validators';

export class CreateReservationDto {
  @ApiProperty()
  @IsMongoId()
  userId: string;

  @ApiProperty()
  @IsMongoId()
  eventId: string;

  @ApiProperty()
  @IsMongoId()
  eventDateId: string;

  @ApiProperty()
  @IsArrayOfMongoIds()
  seatEventIds: string[];
}
