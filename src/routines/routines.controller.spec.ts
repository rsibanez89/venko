import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesController } from './routines.controller';
import { VenkoService } from '../common/service/app.service';
import { HttpModule, CacheModule } from '@nestjs/common';
import { S3Service } from '../common/service/s3.service';

describe('RoutinesController', () => {
  let routinesController: RoutinesController;
  let appService: VenkoService;
  let routine: Routine[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutinesController],
      providers: [VenkoService, S3Service],
      imports: [HttpModule, CacheModule.register()],
    }).compile();

    routinesController = module.get<RoutinesController>(RoutinesController);
    appService = module.get<VenkoService>(VenkoService);

    routine = [
      {
        fields: {
          tags: 'tags',
          youtubeUrl: 'youtubeUrl',
          video: 'video',
          group: 'group',
          subgroup: 'subgroup',
          name: 'name',
          difficulty: 'difficulty',
        },
        model: 'model',
        pk: 1,
      },
    ];

    jest
      .spyOn(appService, 'getRoutine')
      .mockImplementation((routineId: string) => Promise.resolve(routine));
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const response = await routinesController.GetRoutine('1');
      expect(response[0].fields.name).toBe('name');
    });
  });
});
