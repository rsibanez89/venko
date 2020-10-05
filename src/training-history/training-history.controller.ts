import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { TrainingHistory } from './dto/training-history.dto';
import {
  TrainingHistoryByEmailRequest,
  TrainingHistoryRequest,
} from './dto/training-history.request.dto';
import { TrainingHistoryRequestSchema } from './dto/training-history.request.validator';
import { TrainingHistoryService } from './training-history.service';

@Controller('training-history')
export class TrainingHistoryController {
  constructor(
    private readonly trainingHistoryService: TrainingHistoryService,
  ) {}

  //@UseGuards(JwtAuthGuard)
  @Post('')
  async add(@Body(new JoiValidationPipe(TrainingHistoryRequestSchema)) request: TrainingHistoryRequest): Promise<TrainingHistory> {
    return this.trainingHistoryService.addTrainingHistory(request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('email')
  async getByEmail(
    @Body() request: TrainingHistoryByEmailRequest,
  ): Promise<TrainingHistory> {
    const trainingHistory = await this.trainingHistoryService.getTrainingHistoryByEmail(
      request.email,
    );
    if (trainingHistory == null) {
      throw new NotFoundException();
    }
    return trainingHistory;
  }
}
