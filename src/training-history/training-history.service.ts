import { Injectable } from '@nestjs/common';
import config from '../config';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import {
  TrainingHistory,
  TrainingHistoryForPeriod,
  TrainingHistoryForPeriodItem,
} from './dto/training-history.dto';
import { UtilsService } from '../common/service/utils.service';
import {
  DeleteTrainingHistoryByEmailRequest,
  TrainingHistoryByEmailRequest,
  TrainingHistoryRequest,
} from './dto/training-history.request.dto';

@Injectable()
export class TrainingHistoryService {
  constructor(private utilsService: UtilsService) {}

  get tableName(): string {
    return config.usersTrainingHistoryTableName;
  }

  get dynamodbClient(): DynamoDB.DocumentClient {
    return new DynamoDB.DocumentClient({
      region: config.awsRegion,
    });
  }

  async getTrainingHistoryByEmail(
    request: TrainingHistoryByEmailRequest,
  ): Promise<TrainingHistory | null> {
    const response = await this.dynamodbClient
      .get({
        TableName: this.tableName,
        Key: {
          email: request.email,
          period: request.period,
        },
      })
      .promise();

    return response.Item as TrainingHistory;
  }

  async getTrainingHistoryForPeriod(
    period: string,
  ): Promise<TrainingHistoryForPeriod | null> {
    const response = await this.dynamodbClient
      .scan({
        TableName: this.tableName,
        FilterExpression: '#period = :p',
        ExpressionAttributeNames: { '#period': 'period' },
        ExpressionAttributeValues: { ':p': period },
      })
      .promise();

    if (!response.Items || response.Items.length == 0) {
      return null;
    }

    const allGroupsByDate = response.Items.map(item =>
      this.toTrainingHistorySlice(item),
    );

    const flatGroups = allGroupsByDate.reduce(
      (flat, next) => flat.concat(next),
      [],
    );

    return {
      period: period,
      items: flatGroups.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    };
  }

  private toTrainingHistorySlice(item): TrainingHistoryForPeriodItem[] {
    const itemValue = item as TrainingHistory;

    return itemValue.items.map(item => ({
      email: itemValue.email,
      date: item.date,
      routineId: item.routineId,
      routineType: item.routineType,
      lapsCount: item.lapsCount,
      dificulty: item.dificulty,
      duration: item.duration,
      weight: item.weight,
      comments: item.comments,
      energyLevel: item.energyLevel,
      mood: item.mood,
    }));
  }

  async createTrainingHistory(
    trainingHistory: TrainingHistoryRequest,
  ): Promise<TrainingHistory> {
    const request = {
      TableName: this.tableName,
      Item: {
        email: trainingHistory.email,
        period: trainingHistory.period,
        items: trainingHistory.items,
        createdDateTime: this.utilsService.getISODateTime(new Date()),
      },
    };

    await this.dynamodbClient.put(request).promise();

    return request.Item as TrainingHistory;
  }

  async addTrainingHistory(
    trainingHistory: TrainingHistoryRequest,
  ): Promise<TrainingHistory> {
    const request = {
      TableName: this.tableName,
      Key: {
        email: trainingHistory.email,
        period: trainingHistory.period,
      },
      UpdateExpression: 'SET #items = list_append(#items, :i)',
      ExpressionAttributeValues: {
        ':i': trainingHistory.items,
      },
      ExpressionAttributeNames: { '#items': 'items' },
      ReturnValues: 'UPDATED_NEW',
    };

    const output = await this.dynamodbClient.update(request).promise();

    return output.Attributes?.items as TrainingHistory;
  }

  async deleteTrainingHistory(
    deleteTrainingHistory: DeleteTrainingHistoryByEmailRequest,
  ): Promise<TrainingHistory> {
    const request = {
      TableName: this.tableName,
      Key: {
        email: deleteTrainingHistory.email,
        period: deleteTrainingHistory.period,
      },
      UpdateExpression: `REMOVE #items[${deleteTrainingHistory.index}]`,
      ExpressionAttributeNames: { '#items': 'items' },
      ReturnValues: 'ALL_NEW',
    };

    const output = await this.dynamodbClient.update(request).promise();

    return output.Attributes?.items as TrainingHistory;
  }
}
