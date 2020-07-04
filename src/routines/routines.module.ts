import { Module, CacheModule } from '@nestjs/common';
import { RoutinesController } from './routines.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CommonModule,
    CacheModule.register({
      ttl: 300, // seconds
      max: 1000, // maximum number of items in cache
    }),
  ],
  controllers: [RoutinesController],
})
export class RoutinesModule {}
