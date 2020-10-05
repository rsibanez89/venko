import { Test, TestingModule } from '@nestjs/testing';
import { TrainingHistoryController } from './training-history.controller';

describe('TrainingHistory Controller', () => {
  let controller: TrainingHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingHistoryController],
    }).compile();

    controller = module.get<TrainingHistoryController>(TrainingHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
