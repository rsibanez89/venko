import {
  Controller,
  Get,
  Param,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
  Logger,
} from '@nestjs/common';
import { VenkoService } from './common/service/app.service';
import { KnownMissingRoutines } from './missing-routines.model';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: VenkoService) {}

  @Get('health')
  Health(): string {
    Logger.log('GET health');
    return 'Ok';
  }

  @Get('update')
  async Update(): Promise<string> {
    // Update 100 Routines each hour -> 2400 routines a day.
    const hour = new Date().getHours();
    const start = 100 * hour;
    Logger.log(`Updating [${start} - ${start + 100}`);
    for (let routineId = start; routineId < start + 100; routineId++) {
      if (!KnownMissingRoutines.find(r => r == routineId)) {
        try {
          await this.appService.getRoutine(routineId.toString());
        } catch (error) {
          Logger.log(`Routine ${routineId} not found!`);
        }
      }
    }
    return 'Ok';
  }

  @CacheTTL(300)
  @Get(':userId/routines')
  GetRoutines(@Param('userId') userId: string): Promise<Routines[]> {
    Logger.log(`GET ${userId}/routines`);
    return this.appService.getRoutines(userId);
  }
}
