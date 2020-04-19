import { Injectable, HttpService } from '@nestjs/common';
import { S3  } from 'aws-sdk';

@Injectable()
export class S3Service { 
  private bucketName = 'venko';
  private Host = "http://64.225.9.210";

  constructor(private readonly httpService: HttpService) {}

  get s3Client(): S3 {
    return new S3({
      region: 'sa-east-1'
    });
  }

  async listBuckets(): Promise<string[]> {
    let res = await this.s3Client.listBuckets().promise();
    return res.Buckets.map(b=> b.Name);
  }

  async ensureObjectExists(fileNameOrigin: string, fileNameDestiny: string): Promise<boolean> {
    if(!await this.objectExist(fileNameDestiny))
    {
      const url = `${this.Host}/${fileNameOrigin}`;
      await this.uploadFileFromUrl(url, fileNameDestiny);
    }
    return true;
  }

  async objectExist(fileName: string): Promise<boolean> {
    const params = {
      Bucket: this.bucketName,
      Key: fileName
    }
    try {
      await this.s3Client.headObject(params).promise()
      return true;
    } catch (err) {
        return false;
    }
  }

  async uploadFileFromUrl(url: string, fileName: string): Promise<boolean> {
    const image = (await this.httpService.axiosRef({
      url: url,
      method: 'GET',
      responseType: 'arraybuffer',
    })).data as Buffer;

    await this.s3Client.upload({
      Bucket: this.bucketName,
      Key: fileName,
      ACL: 'public-read',
      Body: image,
    }).promise();

    return true;
  }
}