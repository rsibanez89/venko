import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { S3Service } from './s3service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [() => config], isGlobal: true }),
    HttpModule,
    CacheModule.register({
      ttl: 300, // seconds
      max: 1000, // maximum number of items in cache
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
