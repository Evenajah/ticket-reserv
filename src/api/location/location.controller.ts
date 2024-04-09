import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard, Roles } from 'src/guards/role/role.guard';
import { USER_ROLE } from 'src/shared/enums';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';

@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Roles([USER_ROLE.ADMIN])
  @ApiBody({ type: CreateLocationDto })
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }
}
