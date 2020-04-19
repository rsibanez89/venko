import { Controller, Get, Param, CacheKey, CacheTTL, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { AppService } from './app.service';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  Health(): string {
    return 'Ok';
  }

  @CacheTTL(300)
  @Get(':userId/routines')
  GetRoutines(@Param('userId') userId: string): Promise<Routines[]> {
    return this.appService.getRoutines(userId);
  }

  @CacheTTL(3600)
  @Get('routines/:routineId')
  GetRoutine(@Param('routineId') routineId: string): Promise<Routine[]> {
    return this.appService.getRoutine(routineId);
  }
}
