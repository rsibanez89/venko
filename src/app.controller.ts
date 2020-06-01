import { Controller, Get, Param, CacheTTL, UseInterceptors, CacheInterceptor, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  Health(): string {
    Logger.log('GET health');
    return 'Ok';
  }

  @Get('update')
  async Update(): Promise<string> {
    Logger.log('GET update');
    for(let routineId = 5; routineId < 1000; routineId++) {
      try {
        await this.appService.getRoutine(routineId.toString()); 
      } catch (error) {
        Logger.log(`Routine ${routineId} not found!`);
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

  @CacheTTL(3600)
  @Get('routines/:routineId')
  GetRoutine(@Param('routineId') routineId: string): Promise<Routine[]> {
    Logger.log(`GET routines/${routineId}`);
    return this.appService.getRoutine(routineId);
  }
}
