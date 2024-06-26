import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { AuthenModule } from './api/authen/authen.module';
import { EventDateModule } from './api/event-date/event-date.module';
import { EventModule } from './api/event/event.module';
import { LocationModule } from './api/location/location.module';
import { ReservationModule } from './api/reservation/reservation.module';
import { SeatEventModule } from './api/seat-event/seat-event.module';
import { SeatModule } from './api/seat/seat.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get<string>('REDIS_STRING'),
      }),
      isGlobal: true,
      inject: [ConfigService],
    }),
    AuthenModule,
    EventModule,
    EventDateModule,
    LocationModule,
    ReservationModule,
    SeatEventModule,
    SeatModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
