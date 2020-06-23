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

  async getUserByEmail(email: string): Promise<User | null> {
    const response = await this.dynamodbClient
      .getItem({
        TableName: this.tableName,
        Key: {
          email: {
            S: email,
          },
        },
      })
      .promise();

    if (!response.Item) {
      return null;
    }
    return this.toUser(response.Item);
  }

  async getUserByUserId(userId: string): Promise<User | null> {
    const response = await this.dynamodbClient
      .query({
        TableName: this.tableName,
        IndexName: 'ix_userId',
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeNames: {
          '#userId': 'userId',
        },
        ExpressionAttributeValues: {
          ':userId': { S: userId },
        },
      })
      .promise();

    if (!response.Items || response.Items.length == 0) {
      return null;
    }
    return this.toUser(response.Items[0]);
  }

  async getUsers(): Promise<User[] | null> {
    const response = await this.dynamodbClient
      .scan({
        TableName: this.tableName
      })
      .promise();

    if (!response.Items || response.Items.length == 0) {
      return null;
    }
    return response.Items.map(item => this.toUser(item));
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

  async addUser(user: UserRequest): Promise<User> {
    const request: DynamoDB.PutItemInput = {
      TableName: this.tableName,
      Item: {
        email: {
          S: user.email,
        },
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
        createdDateTime: {
          N: Date.now().toString(),
        },
      },
      //ConditionExpression:"attribute_not_exists(userId)" UserId = 10 is Test.
    };
    await this.dynamodbClient.putItem(request).promise();
    
    return user;
  }

  async deleteUser(email: string): Promise<boolean> {
    const response = await this.dynamodbClient
      .deleteItem({
        TableName: this.tableName,
        Key: {
          email: {
            S: email,
          },
        },
      })
      .promise();

    if (response.$response.error) {
      return false;
    }
    return true;
  }
}
