import { Controller, CacheInterceptor, UseInterceptors, CacheTTL, Get, Logger, Param } from '@nestjs/common';
import { VenkoService } from '../common/service/app.service';

@Controller('routines')
@UseInterceptors(CacheInterceptor)
export class RoutinesController {
  constructor(private readonly appService: VenkoService) {}
  @CacheTTL(3600)
  @Get(':routineId')
  GetRoutine(@Param('routineId') routineId: string): Promise<Routine[]> {
    Logger.log(`GET routines/${routineId}`);
    return this.appService.getRoutine(routineId);
  }
}
