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
