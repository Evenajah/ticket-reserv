import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import { REGEX } from 'src/shared/regex';

export class AuthenDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(REGEX.STRONG_PASSWORD_REGEX, {
    message:
      'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number',
  })
  credential: string;
}
