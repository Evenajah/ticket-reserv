import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthenService } from './authen.service';
import { AuthenDto } from './dto/authen.dto';
import { ForgotDto } from './dto/forgot.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetCredentialDto } from './dto/reset-credential.dto';

@Controller('auth')
export class AuthenController {
  constructor(private readonly usersService: AuthenService) {}

  @Post('register')
  @ApiBody({ type: AuthenDto })
  create(@Body() body: AuthenDto) {
    return this.usersService.register(body);
  }

  @Get('verification-user/:verifyToken')
  verifyEmail(@Param('verifyToken') verifyToken: string) {
    return this.usersService.verifyEmail(verifyToken);
  }

  @Post('sign-in')
  @ApiBody({ type: AuthenDto })
  signIn(@Body() body: AuthenDto) {
    return this.usersService.signIn(body);
  }

  @Get('sign-out')
  @UseGuards(AuthGuard)
  signOut(@Headers('authorization') authorization: string) {
    const token = authorization.replace('Bearer ', '');
    return this.usersService.signOut(token);
  }

  @Post('forgot-credential')
  @ApiBody({ type: ForgotDto })
  forgotPassword(@Body() body: ForgotDto) {
    return this.usersService.fotgotCredential(body);
  }

  @Post('reset-credential')
  @HttpCode(200)
  @ApiBody({ type: ResetCredentialDto })
  resetPassword(@Body() body: ResetCredentialDto) {
    return this.usersService.resetCredential(body);
  }

  @Post('refresh-token')
  @HttpCode(200)
  @ApiBody({ type: RefreshTokenDto })
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.usersService.refreshToken(body.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  test() {
    return { test: 'test' };
  }
}
