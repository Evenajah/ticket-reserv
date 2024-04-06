import { Test, TestingModule } from '@nestjs/testing';
import { SeatEventService } from './seat-event.service';

describe('SeatEventService', () => {
  let service: SeatEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatEventService],
    }).compile();

    service = module.get<SeatEventService>(SeatEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
