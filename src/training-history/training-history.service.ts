import { Injectable } from '@nestjs/common';
import config from '../config';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import {
  TrainingHistory,
} from './dto/training-history.dto';
import { UtilsService } from '../common/service/utils.service';
import { TrainingHistoryRequest } from './dto/training-history.request.dto';

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
    email: string,
  ): Promise<TrainingHistory | null> {
    const response = await this.dynamodbClient
      .get({
        TableName: this.tableName,
        Key: {
          email: email,
        },
      })
      .promise();

    return response.Item as TrainingHistory;
  }

  async addTrainingHistory(
    trainingHistory: TrainingHistoryRequest,
  ): Promise<TrainingHistory> {
    const request = {
      TableName: this.tableName,
      Item: {
        email: trainingHistory.email,
        items: trainingHistory.items,
        createdDateTime: this.utilsService.formatDate(new Date()),
      },
    };

    await this.dynamodbClient.put(request).promise();

    return request.Item as TrainingHistory;
  }
}
