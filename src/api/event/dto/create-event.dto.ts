import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Matches, ValidateNested } from 'class-validator';
import { REGEX } from 'src/shared/regex';

export class EventDetail {
  @ApiProperty()
  @Matches(REGEX.DATE_FORMAT, { message: 'Date must be in dd/MM/YYYY format' })
  date: string;

  @ApiProperty()
  @Matches(REGEX.TIME_FORMAT, { message: 'Time must be in XX:XX format' })
  startTime: string;

  @ApiProperty()
  @Matches(REGEX.TIME_FORMAT, { message: 'Time must be in XX:XX format' })
  endTime: string;

  @ApiProperty()
  @IsNumber()
  totalSeats: number;
}

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: () => EventDetail, isArray: true })
  @ValidateNested()
  @Type(() => EventDetail)
  eventDetail: EventDetail[];
}
