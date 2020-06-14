import { Injectable } from '@nestjs/common';
import config from '../config';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { User } from './dto/users.dto';
import { UserRequest } from './dto/users.request.dto';

@Injectable()
export class UsersService {
  get tableName(): string {
    return config.usersTableName;
  }

  get dynamodbClient(): DynamoDB {
    return new DynamoDB({
      region: config.awsRegion,
    });
  }

  async getUserById(userId: string): Promise<User | null> {
    const response = await this.dynamodbClient
      .getItem({
        TableName: this.tableName,
        Key: {
          userId: {
            S: userId,
          },
        },
      })
      .promise();

    if (!response.Item) {
      return null;
    }
    return this.toUser(response.Item);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const response = await this.dynamodbClient
      .query({
        TableName: this.tableName,
        IndexName: 'IX_email',
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
          '#email': 'email',
        },
        ExpressionAttributeValues: {
          ':email': { S: email },
        },
      })
      .promise();

    if (!response.Items) {
      return null;
    }
    return this.toUser(response.Items[0]);
  }

  private toUser(item: DynamoDB.AttributeMap): User {
    return {
      userId: item.userId.S || '',
      fullName: item.fullName.S || '',
      firstName: item.firstName.S || '',
      lastName: item.lastName.S || '',
      avatarUrl: item.avatarUrl.S || '',
      nickName: item.nickName.S || '',
      userType: item.userType.S || '',
      email: item.email.S || '',
    };
  }

  async addUser(user: UserRequest): Promise<boolean> {
    const request: DynamoDB.PutItemInput = {
      TableName: this.tableName,
      Item: {
        userId: {
          S: user.userId,
        },
        fullName: {
          S: user.fullName,
        },
        firstName: {
          S: user.firstName,
        },
        lastName: {
          S: user.lastName,
        },
        avatarUrl: {
          S: user.avatarUrl,
        },
        nickName: {
          S: user.nickName,
        },
        userType: {
          S: user.userType,
        },
        email: {
          S: user.email,
        },
        createdDateTime: {
          N: Date.now().toString(),
        },
      },
    };
    const response = await this.dynamodbClient.putItem(request).promise();

    if (!response.$response) return false;
    if (response.$response.error) return false;

    return true;
  }
}
