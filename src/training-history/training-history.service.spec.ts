import { Test, TestingModule } from '@nestjs/testing';
import { TrainingHistoryService } from './training-history.service';

describe('TrainingHistoryService', () => {
  let service: TrainingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingHistoryService],
    }).compile();

    service = module.get<TrainingHistoryService>(TrainingHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
