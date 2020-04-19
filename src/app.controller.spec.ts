import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, CacheModule } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { S3Service } from './s3service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let routine: Routine[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, S3Service],
      imports: [HttpModule, CacheModule.register()]
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);

    routine = [{
      fields: {
        tags: "tags",
        youtubeUrl: "youtubeUrl",
        video: "video",
        group: "group",
        subgroup: "subgroup",
        name: "name",
        difficulty: "difficulty"
      },
      model: "model",
      pk: 1,
    }];

    jest.spyOn(appService, 'getRoutine').mockImplementation((routineId: string) => Promise.resolve(routine));

  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const response = await appController.GetRoutine("1");
      expect(response[0].fields.name).toBe("name");
    });
  });
});
