import { Test, TestingModule } from '@nestjs/testing';
import { SeatEventController } from './seat-event.controller';
import { SeatEventService } from './seat-event.service';

describe('SeatEventController', () => {
  let controller: SeatEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatEventController],
      providers: [SeatEventService],
    }).compile();

    controller = module.get<SeatEventController>(SeatEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
