import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { TrainingHistoryController } from './training-history.controller';
import { TrainingHistoryService } from './training-history.service';

@Module({
  imports: [CommonModule],
  controllers: [TrainingHistoryController],
  providers: [TrainingHistoryService],
})
export class TrainingHistoryModule {}
