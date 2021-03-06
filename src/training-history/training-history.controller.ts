import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VenkoAuthGuard } from 'src/common/auth/venko-auth.guard';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';

import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import {
  TrainingHistory,
  TrainingHistoryForPeriod,
} from './dto/training-history.dto';
import {
  DeleteTrainingHistoryByEmailRequest,
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

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Post('')
  async create(
    @Body(new JoiValidationPipe(TrainingHistoryRequestSchema))
    request: TrainingHistoryRequest,
  ): Promise<TrainingHistory> {
    return this.trainingHistoryService.createTrainingHistory(request);
  }

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Post('add')
  async add(
    @Body(new JoiValidationPipe(TrainingHistoryRequestSchema))
    request: TrainingHistoryRequest,
  ): Promise<TrainingHistory> {
    return this.trainingHistoryService.addTrainingHistory(request);
  }

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Post('email')
  async getByEmail(
    @Body() request: TrainingHistoryByEmailRequest,
  ): Promise<TrainingHistory> {
    const trainingHistory = await this.trainingHistoryService.getTrainingHistoryByEmail(
      request,
    );
    if (trainingHistory == null) {
      throw new NotFoundException();
    }
    return trainingHistory;
  }

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Get()
  async getForPeriod(@Query() query): Promise<TrainingHistoryForPeriod> {
    const trainingHistory = await this.trainingHistoryService.getTrainingHistoryForPeriod(
      query.period,
    );
    if (trainingHistory == null) {
      throw new NotFoundException();
    }
    return trainingHistory;
  }

  @UseGuards(JwtAuthGuard, VenkoAuthGuard)
  @Delete('email')
  async deleteByEmail(
    @Body() request: DeleteTrainingHistoryByEmailRequest,
  ): Promise<TrainingHistory> {
    const trainingHistory = await this.trainingHistoryService.deleteTrainingHistory(
      request,
    );
    if (trainingHistory == null) {
      throw new NotFoundException();
    }
    return trainingHistory;
  }
}
