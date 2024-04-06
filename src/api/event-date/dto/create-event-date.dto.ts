import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Matches, ValidateNested } from 'class-validator';
import { REGEX } from 'src/shared/regex';

export class CreateEventDateDto {
  @ApiProperty()
  @IsString()
  eventId: string;

  @ApiProperty({ type: () => EventDate, isArray: true })
  @ValidateNested()
  @Type(() => EventDate)
  dates: EventDate[];
}

export class EventDate {
  @ApiProperty()
  @IsString()
  @Matches(REGEX.TIME_FORMAT, { message: 'Time must be in XX:XX format' })
  startTime: string;

  @ApiProperty()
  @IsString()
  @Matches(REGEX.TIME_FORMAT, { message: 'Time must be in XX:XX format' })
  endTime: string;

  @ApiProperty()
  @Matches(REGEX.DATE_FORMAT, { message: 'Date must be in dd/MM/YYYY format' })
  @IsString()
  date: string;
}
